import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { analyzeTranscript, sendAudioToBackend } from "../../api";
import { deleteUserEntryByDate, saveDailyEntry } from "../../api/firebase.js";
import { useAudioRecorder } from "../../hooks/useAudioRecorder";
import { fetchEntriesFromDB } from "../../store/slices/entriesSlice.js";
import DeleteEntryDialog from "../Calendar/DeleteEntryDialog.js";
import Spinner from "../General/Spinner.js";
import ModalDialog from "./ModalDialog";
import RecorderButton from "./RecorderButton";
import RecordingTimer from "./RecordingTimer";
import StructuredResultCard from "./StructuredResultCard.js";
import TranscriptBox from "./TranscriptBox";

export default function RecorderMain() {
  const user = useSelector((state) => state.user.userObject);
  const entries = useSelector((state) => state.entries.userEntries);
  const dispatch = useDispatch();

  const {
    recording,
    recordingUri,
    startRecording,
    stopRecording,
    transcript,
    setTranscript,
  } = useAudioRecorder();

  const [isSending, setIsSending] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [structuredResult, setStructuredResult] = useState([]);
  const [timer, setTimer] = useState(0);
  const [showDialog, setShowDialog] = useState(false);

  // Dashboard Controls:
  const [status, setStatus] = useState("");
  const [nextStep, setNextStep] = useState("canRecord"); // *canRecord* *canAnalyze* *canSaveInDB* *canDeleteFromDB*

  // Determine if the user has an entry for the current date
  const currentDate = new Date().toISOString().split("T")[0];
  const hasEntryToday = entries.some((entry) => {
    if (entry.timestamp) {
      // Split the timestamp at "T" to isolate the date part
      const entryDate = entry.timestamp.split("T")[0];
      return entryDate === currentDate;
    }
    return false;
  });

  const getTodaysEntry = () => {
    const currentDate = new Date().toISOString().split("T")[0];

    if (entries) {
      return entries.find((entry) => {
        return entry.timestamp && entry.timestamp.split("T")[0] === currentDate;
      });
    }
  };

  useEffect(() => {
    if (user) {
      setStatus("hasUser");
    }

    if (!user) {
      setStatus("hasNoUser");
    }

    if (user && hasEntryToday) {
      const todaysEntry = getTodaysEntry();

      if (todaysEntry) {
        setTranscript(todaysEntry.results || "");
        setStructuredResult(todaysEntry.structuredResults || []);
      }

      setStatus("hasUserAndHasEntryToday");
      setNextStep("canDeleteFromDB");
    }
  }, [user, hasEntryToday]);

  useEffect(() => {
    if (recordingUri) {
      submitRecording();
    }
  }, [recordingUri]);

  useEffect(() => {
    let interval = null;
    if (recording) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [recording]);

  const submitRecording = async () => {
    setIsSending(true);
    try {
      const response = await sendAudioToBackend(recordingUri);
      setTranscript(response);
      setNextStep("canAnalyze");
    } catch (error) {
      console.error("Error sending audio to backend:", error);
    }
    setIsSending(false);
  };

  const analyzeWithAi = async () => {
    setIsSending(true);
    setIsVisible(false);
    try {
      const response = await analyzeTranscript(transcript);
      setStructuredResult(JSON.parse(response.message.content));
      setNextStep("canSaveInDB");
    } catch (error) {
      console.error("Error analyzing transcript:", error);
    }
    setIsSending(false);
  };

  const onSaveToDB = async () => {
    setIsSending(true);

    // Make Sure that only loggedIn User can save:
    if (status === "hasNoUser") return;

    try {
      await saveDailyEntry(user.uid, transcript, structuredResult, timer);
      dispatch(fetchEntriesFromDB(user.uid));
    } catch (error) {
      console.error("Error saving entry to DB:", error);
    }
    setIsSending(false);
    setTranscript("");
    setStructuredResult([]);
    setNextStep("canDeleteFromDB");
  };

  const onDeleteStructuredResults = () => {
    setStructuredResult([]);
    setTranscript("");
    setNextStep("canRecord");
  };

  if (isSending) {
    return <Spinner />;
  }

  const deleteEntryFromDatabase = async () => {
    if (!user) return;

    try {
      setIsSending(true);
      const response = await deleteUserEntryByDate(
        user.uid,
        getTodaysEntry().id
      );
      setNextStep("canRecord");
    } catch (error) {
      console.log(error);
    }

    isSending(false);
    setShowDialog(false);
  };

  return (
    <View style={styles.container}>
      {nextStep === "canRecord" &&
        transcript == "" &&
        structuredResult.length === 0 && (
          <RecorderButton
            isRecording={recording}
            onStartRecording={() => {
              setTranscript("");
              setStructuredResult([]);
              setTimer(0);
              startRecording();
            }}
            onStopRecording={stopRecording}
          />
        )}

      {nextStep === "canRecord" && recording && (
        <RecordingTimer timer={timer} />
      )}

      {nextStep === "canAnalyze" && !recording && !hasEntryToday && (
        <TranscriptBox
          transcript={transcript}
          duration={timer}
          onDelete={() => {
            setTranscript(""), setNextStep("canRecord");
          }}
          onAnalyze={() => setIsVisible(true)}
        />
      )}

      <ModalDialog
        isVisible={isVisible}
        onDismiss={() => setIsVisible(false)}
        onAnalyze={analyzeWithAi}
      />

      {(nextStep === "canSaveInDB" || nextStep === "canDeleteFromDB") &&
        !recording && (
          <View style={styles.container}>
            <Text
              variant="titleLarge"
              style={{
                textAlign: "start",
                textAlign: "left",
                marginBottom: 10,
              }}
            >
              Your Accomplishments Today:
            </Text>
            <SafeAreaView style={styles.listContainer}>
              <FlatList
                data={structuredResult}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <StructuredResultCard item={item} />}
              />
              <View style={styles.buttonContainer}>
                {nextStep === "canSaveInDB" && (
                  <Button
                    mode="contained"
                    onPress={onDeleteStructuredResults}
                    style={styles.button}
                  >
                    Delete Entry
                  </Button>
                )}

                {nextStep === "canDeleteFromDB" && !recording && (
                  <>
                    <Button
                      mode="contained"
                      style={styles.button}
                      onPress={() => setShowDialog(true)}
                    >
                      Delete Entry from DB
                    </Button>
                    <DeleteEntryDialog
                      onDelete={deleteEntryFromDatabase}
                      onDismiss={() => setShowDialog(false)}
                      isVisible={showDialog}
                    />
                  </>
                )}

                {status === "hasUser" && (
                  <Button
                    mode="contained"
                    onPress={onSaveToDB}
                    style={styles.button}
                  >
                    Save Entry
                  </Button>
                )}
              </View>
            </SafeAreaView>

            {nextStep === "canDeleteFromDB" && !recording && (
              <Card style={{ marginHorizontal: 20, marginTop: 20 }}>
                <Card.Content>
                  <Text
                    variant="bodyMedium"
                    style={{
                      color: "darkred",
                      marginTop: 0,
                      fontWeight: "bold",
                      textAlign: "center",
                      marginBottom: 0,
                    }}
                  >
                    Info: {"\n"}
                    An Entry for today already exists. {"\n"}
                    If you want to change your Entry,{"\n"} first delete the
                    existing one.
                  </Text>
                </Card.Content>
              </Card>
            )}
          </View>
        )}

      {status === "hasNoUser" && (
        <Card style={{ marginHorizontal: 20, marginTop: 20 }}>
          <Card.Content>
            <Text
              variant="bodyMedium"
              style={{
                color: "darkred",
                marginTop: 0,
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 0,
              }}
            >
              It appears you are not logged in! {"\n"}
              You may record an entry and analyze it with AI. {"\n"}
              To save your Entry in the Database, please log in.{"\n"}
            </Text>
          </Card.Content>
        </Card>
      )}

      {/* <Text> {JSON.stringify(hasEntryToday)}</Text>
      <Text> {status}</Text>
      <Text> {nextStep}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    flexGrow: 0, // Prevents the FlatList container from growing
    width: "90%",
    paddingHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 30,
    width: "100%",
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
});
