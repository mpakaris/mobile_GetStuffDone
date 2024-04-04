import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";
import { useSelector } from "react-redux";
import { sendAudioToBackend } from "../api";
import { useAudioRecorder } from "../hooks/useAudioRecorder";

export default function Recorder() {
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
      {!recording ? (
        <View style={styles.container}>
          <IconButton
            icon="record-circle-outline"
            iconColor={MD3Colors.error40}
            size={100}
            onPress={handleStartRecording}
          />
          <Text>Start Recording</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <IconButton
            icon="stop-circle"
            iconColor={MD3Colors.error40}
            size={70}
            onPress={stopRecording}
          />
          <Text>Stop Recording</Text>
        </View>
      )}

      {transcript && <Text>{transcript}</Text>}
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
