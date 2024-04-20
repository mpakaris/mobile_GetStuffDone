import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { formatDuration } from "../../hooks/formatTimer";

const RecordingTimer = ({ timer }) => {
  return (
    <View style={styles.timerContainer}>
      <View style={styles.timerCard}>
        <Text style={styles.timerText}>
          {formatDuration(timer).split(":")[0]}
        </Text>
      </View>
      <View style={styles.timerCard}>
        <Text style={styles.timerText}>
          {formatDuration(timer).split(":")[1]}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default RecordingTimer;
