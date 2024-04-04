import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

const EntrySummary = ({ item }) => {
  const categoriesToString = (entryObject) => {
    if (entryObject) {
      return entryObject.join(", ");
    }
    return "";
  };

  return (
    <Card style={{ marginTop: 10, backgroundColor: "white" }}>
      <Card.Content>
        <Text
          variant="titleMedium"
          style={{ fontWeight: "bold", marginBottom: 10 }}
        >
          Transcript of {item.date}:
        </Text>
        {item.entry.map((e, index) => (
          <View key={index} style={styles.listItem}>
            <View variant="titleLarge" style={styles.bulletPoint} />
            <Text variant="titleMedium" style={styles.listItem}>
              {e}
            </Text>
          </View>
        ))}
        <Text
          variant="bodyLarge"
          style={{ fontWeight: "bold", marginBottom: 6, marginTop: 20 }}
        >
          Categories:{" "}
        </Text>
        <Text variant="bodyLarge">{categoriesToString(item.categories)}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  bulletPoint: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: "black",
    marginRight: 10,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    color: "black",
  },
});

export default EntrySummary;
