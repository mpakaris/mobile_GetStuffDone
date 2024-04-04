import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const Settings = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);

  const recording = true;
  const [timer, setTimer] = useState(0);

  const startTimer = () => {
    let interval = null;

    interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(interval);
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
      <View style={styles.container}>
        <TouchableOpacity onPress={startTimer} style={styles.button}>
          <Text style={styles.buttonText}>
            {recording ? "Stop Recording" : "Start Recording"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.timer}>{formatTime()}</Text>
      </View>
      {/* <CountdownCircleTimer
        isPlaying
        duration={7}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[7, 5, 2, 0]}
      >
        {({ remainingTime }) => <Text>{remainingTime}</Text>}
      </CountdownCircleTimer> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: "10%",
  },
});

export default Settings;
