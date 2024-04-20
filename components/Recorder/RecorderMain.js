import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import {
  analyzeTranscript,
  saveDailyEntry,
  sendAudioToBackend,
} from "../../api";
import { useAudioRecorder } from "../../hooks/useAudioRecorder";
import Spinner from "../Spinner.js";
import ModalDialog from "./ModalDialog";
import RecorderButton from "./RecorderButton";
import RecordingTimer from "./RecordingTimer";
import TranscriptBox from "./TranscriptBox";

export default function RecorderMain() {
  const user = useSelector((state) => state.user.userObject);
  const entries = useSelector((state) => state.entries.userEntries);

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
  const [test, setTest] = useState([]);
  const [timer, setTimer] = useState(0);

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
      setTest(JSON.parse(response.message.content));
      setTranscript("");
    } catch (error) {
      console.error("Error analyzing transcript:", error);
    }
    setIsSending(false);
  };

  const saveInDB = async () => {
    setIsSending(true);
    try {
      await saveDailyEntry(user.uid, transcript, test);
    } catch (error) {
      console.error("Error saving entry to DB:", error);
    }
    setIsSending(false);
  };

  if (isSending) {
    return <Spinner />;
  }

  const formatDuration = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  return (
    <View style={styles.container}>
      <RecorderButton
        isRecording={recording}
        onStartRecording={() => {
          setTranscript("");
          setTimer(0);
          startRecording();
        }}
        onStopRecording={stopRecording}
      />

      {recording && <RecordingTimer timer={timer} />}

      {transcript !== "" && (
        <TranscriptBox
          transcript={transcript}
          duration={timer}
          onDelete={() => setTranscript("")}
          onAnalyze={() => setIsVisible(true)}
        />
      )}

      <ModalDialog
        isVisible={isVisible}
        onDismiss={() => setIsVisible(false)}
        onAnalyze={analyzeWithAi}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
