import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Card, Text } from "react-native-paper";
import { useSelector } from "react-redux";

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const entries = useSelector((state) => state.entries.userEntries);

  const markedDates = entries.reduce((acc, entry) => {
    acc[entry.date] = {
      marked: true,
      dotColor: "blue",
      activeOpacity: 0,
      selected: true,
      selectedColor: "lightblue",
    };
    return acc;
  }, {});

  const onDayPress = (day) => {
    const entry = entries.find((e) => e.date === day.dateString);
    setSelectedDate(entry ? entry : null);
  };

  const categoriesToString = (entryObject) => {
    if (entryObject) {
      return entryObject.join(", ");
    }
    return "";
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={markedDates}
        markingType={"custom"}
        theme={{
          selectedDayBackgroundColor: "#673AB7",
          arrowColor: "#673AB7",
        }}
      />

      {selectedDate && (
        <Card style={{ marginTop: 10, backgroundColor: "white" }}>
          <Card.Content>
            <Text
              variant="titleMedium"
              style={{ fontWeight: "bold", marginBottom: 10 }}
            >
              Transcript of {selectedDate.date}:
            </Text>
            {selectedDate.entry.map((e, index) => (
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
            <Text variant="bodyLarge">
              {categoriesToString(selectedDate.categories)}
            </Text>
          </Card.Content>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: "8%",
  },
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

export default DatePicker;
