import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Button,
  Card,
  DataTable,
  Dialog,
  Portal,
  Text,
} from "react-native-paper";
import { useSelector } from "react-redux";
import { analyzeTranscript, sendAudioToBackend } from "../api";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import Spinner from "./Spinner";

export default function Recorder() {
  const user = useSelector((state) => state.user.userObject);
  const entries = useSelector((state) => state.entries.userEntries);

  const {
    recording,
    recordingUri,
    setRecordingUri,
    startRecording,
    stopRecording,
    transcript,
    setTranscript,
  } = useAudioRecorder();

  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const [timer, setTimer] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [test, setTest] = useState([]);
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(2);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, test.length);

  // useEffect(() => {
  //   (async () => {
  //     setTranscript(
  //       "War Spazieren mit dem Hund, bin ins Fitnessstudio gegangen, war einkaufen und habe mein Auto gewaschen"
  //     );
  //     await Audio.requestPermissionsAsync();
  //   })();
  // }, []);

  useEffect(() => {
    const submitRecording = async () => {
      setIsSending(true);
      if (recordingUri && submissionStatus === "idle") {
        setSubmissionStatus("submitting");
        try {
          const response = await sendAudioToBackend(recordingUri);
          setTranscript(response);
          setRecordingUri("");
          setSubmissionStatus("submitted");
        } catch (error) {
          if (submissionStatus !== "submitted") {
            console.error("Error sending audio to backend:", error);
            setSubmissionStatus("error");
          }
        }
      }
      setIsSending(false);
    };

    submitRecording();
  }, [recordingUri]);

  useEffect(() => {
    let interval = null;

    if (recording) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (!recording) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [recording]);

  const handleStartRecording = () => {
    setSubmissionStatus("idle");
    setTranscript("");
    startRecording();
    setTimer(0);
  };

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const resetValues = () => {
    setTranscript("");
    setTimer(0);
  };

  const analyzeWithAi = async () => {
    setIsVisible(false);
    setIsSending(true);

    try {
      const response = await analyzeTranscript(transcript);
      setTest(JSON.parse(response.message.content));
      setTranscript("");
    } catch (error) {
      console.log(error);
    }
    setIsSending(false);
  };

  return (
    <View style={styles.container}>
      {!recording && transcript === "" && !isSending && (
        <View>
          <TouchableOpacity onPress={handleStartRecording}>
            <Image
              source={require("../assets/Microphone.png")}
              style={styles.loginPic}
            />
          </TouchableOpacity>
          <Text
            style={{ alignSelf: "center", fontWeight: "bold" }}
            variant="titleMedium"
          >
            Press Microphone to Start Recording
          </Text>
        </View>
      )}

      {transcript && !recording && !isSending && (
        <Card style={styles.transcriptBox}>
          <Card.Content>
            <Text style={{ fontWeight: "bold", marginTop: 2 }}>
              Recording Duration: {formatTime().split(":")[0]}:
              {formatTime().split(":")[1]}
            </Text>
            <Text variant="titleMedium" style={{ marginVertical: 15 }}>
              {transcript}
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={resetValues}>Delete</Button>
            <Button onPress={() => setIsVisible(true)}>Analyze Content</Button>
          </Card.Actions>
        </Card>
      )}

      {recording && !isSending && (
        <View>
          <TouchableOpacity onPress={stopRecording}>
            <Image
              source={require("../assets/NotLoggedIn.png")}
              style={styles.loginPic}
            />
          </TouchableOpacity>
          <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
            Press Button to Stop Recording
          </Text>
          <View style={styles.timerContainer}>
            <View style={styles.timerCard}>
              <Text style={styles.timerText}>{formatTime().split(":")[0]}</Text>
            </View>
            <View style={styles.timerCard}>
              <Text style={styles.timerText}>{formatTime().split(":")[1]}</Text>
            </View>
          </View>
        </View>
      )}

      {test.length > 0 && (
        <View>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{ flex: 2 }}>Activity</DataTable.Title>
              <DataTable.Title>Category</DataTable.Title>
              <DataTable.Title numeric>Duration (min)</DataTable.Title>
            </DataTable.Header>

            {test.slice(from, to).map((activity) => (
              <DataTable.Row key={activity.key}>
                <DataTable.Cell style={{ flex: 2, paddingRight: 8 }}>
                  <Text>{activity.activity}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text>{activity.category}</Text>
                </DataTable.Cell>
                <DataTable.Cell numeric>{activity.duration}</DataTable.Cell>
              </DataTable.Row>
            ))}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(test.length / itemsPerPage)}
              onPageChange={(page) => setPage(page)}
              label={`${from + 1}-${to} of ${test.length}`}
              numberOfItemsPerPageList={[2, 3, 4]}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={setItemsPerPage}
              showFastPaginationControls
              selectPageDropdownLabel={"Rows per page"}
            />
          </DataTable>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Button
              mode="outlined"
              style={styles.tableBtn}
              onPress={() => setIsVisible(false)}
            >
              Delete
            </Button>
            <Button
              mode="contained"
              style={styles.tableBtn}
              onPress={analyzeWithAi}
            >
              Save in DB
            </Button>
          </View>
        </View>
      )}

      {isSending && <Spinner />}

      {/* Modal */}
      <View>
        <Portal>
          <Dialog visible={isVisible} onDismiss={() => setIsVisible(false)}>
            <Dialog.Title>
              Do you believe in the power of Artificial Intelligence?
            </Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
                Cause we'd like to use AI to analyze your transcript.
              </Text>
              <Text
                variant="bodyMedium"
                style={{ marginTop: 10, fontWeight: "bold" }}
              >
                Do you want to see how?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                mode="outlined"
                style={styles.modalBtn}
                onPress={() => setIsVisible(false)}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                style={styles.modalBtn}
                onPress={analyzeWithAi}
              >
                I am all AI
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginPic: {
    width: 350,
    height: 350,
    alignSelf: "center",
    marginBottom: -30,
  },
  timer: {
    marginTop: 20,
    fontSize: 18,
    alignSelf: "center",
  },
  timerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  timerCard: {
    backgroundColor: "#BC95C4",
    borderRadius: 5,
    margin: 2,
    shadowColor: "#FFF",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  timerText: {
    color: "#FFF",
    fontSize: 36,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  transcriptBox: {
    width: "90%",
    marginVertical: 20,
    paddingHorizontal: 5,
  },
  modalBtn: {
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  tableBtn: {
    paddingHorizontal: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});
