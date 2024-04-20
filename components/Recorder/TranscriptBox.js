import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button, Card } from "react-native-paper";
import { formatDuration } from "../../hooks/formatTimer";

const TranscriptBox = ({ transcript, duration, onDelete, onAnalyze }) => {
  return (
    <Card style={styles.transcriptBox}>
      <Card.Content>
        <Text style={styles.durationText}>
          Recording Duration: {formatDuration(duration)}
        </Text>
        <Text variant="titleMedium" style={styles.transcriptText}>
          {transcript}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={onDelete}>Delete</Button>
        <Button onPress={onAnalyze}>Analyze Content</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  transcriptBox: {
    width: "90%",
    marginVertical: 20,
    paddingHorizontal: 5,
  },
  durationText: {
    fontWeight: "bold",
    marginTop: 2,
  },
  transcriptText: {
    marginVertical: 15,
  },
});

export default TranscriptBox;
