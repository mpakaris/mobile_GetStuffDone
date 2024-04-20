import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

const RecorderButton = ({ isRecording, onStartRecording, onStopRecording }) => {
  const handlePress = isRecording ? onStopRecording : onStartRecording;
  const imageSource = isRecording
    ? require("../../assets/StopMicrophone.png") // You'll need to use the correct asset here
    : require("../../assets/Microphone.png"); // Same as above

  const userAction = isRecording
    ? "Press STOP to finish recording."
    : "Press MIC to start recording.";

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image source={imageSource} style={styles.buttonImage} />
      <Text style={{ textAlign: "center" }}>{userAction}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonImage: {
    width: 300, // Set the width as needed
    height: 300, // Set the height as needed
    alignSelf: "center",
  },
});

export default RecorderButton;
