import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { sendAudioToBackend } from "../api";
import { useAudioRecorder } from "../hooks/useAudioRecorder";

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

  return (
    <View style={styles.container}>
      {!recording ? (
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
            Press Button to Start Recording
          </Text>
        </View>
      ) : (
        <View>
          <TouchableOpacity onPress={stopRecording}>
            <Image
              source={require("../assets/StopMicrophone.png")}
              style={styles.loginPic}
            />
          </TouchableOpacity>
          <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
            Press Button to Stop Recording
          </Text>
          <Text style={styles.timer}>Recording Time: {formatTime()}</Text>
        </View>
      )}

      {transcript && (
        <Text>
          {transcript} | Duration {timer}
        </Text>
      )}
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
});
