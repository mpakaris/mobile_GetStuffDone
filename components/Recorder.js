import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { sendAudioToBackend } from "../api";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import Transcript from "./Transcript";

export default function Recorder() {
  const {
    recording,
    recordingUri,
    startRecording,
    stopRecording,
    transcript,
    setTranscript,
  } = useAudioRecorder();

  const [submissionStatus, setSubmissionStatus] = useState("idle");

  useEffect(() => {
    (async () => {
      await Audio.requestPermissionsAsync();
    })();
  }, []);

  useEffect(() => {
    const submitRecording = async () => {
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
    };

    submitRecording();
  }, [recordingUri]);

  const handleStartRecording = () => {
    setSubmissionStatus("idle");
    setTranscript("");
    startRecording();
  };

  return (
    <View style={styles.container}>
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : handleStartRecording}
        disabled={submissionStatus === "submitting"}
      />
      {transcript && <Text>{transcript}</Text>}
      <Transcript transcript={transcript} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
  },
});
