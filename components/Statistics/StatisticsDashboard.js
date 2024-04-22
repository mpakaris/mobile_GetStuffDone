// StatisticsDashboard.js
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

const StatisticsDashboard = () => {
  return (
    <View style={styles.container}>
      <Card style={{ marginHorizontal: 5, marginVertical: 5 }}>
        <Card.Content>
          <Text variant="titleMedium">New Feature to Come!</Text>
          <Text variant="bodyMedium" style={{ marginTop: 20 }}>
            Statistics are currently not available. {"\n"}
            This will be a Feature to come for the future.
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});

export default StatisticsDashboard;
