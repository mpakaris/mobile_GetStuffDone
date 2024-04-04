import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Card, Text } from "react-native-paper";

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState("");

  const entries = [
    { DateOfEntry: "2024-04-03", text: "Entry 1 text..." },
    { DateOfEntry: "2024-04-15", text: "Entry 2 text..." },
    { DateOfEntry: "2024-04-10", text: "Entry 3 text..." },
    { DateOfEntry: "2024-04-08", text: "Entry 4 text..." },
    { DateOfEntry: "2024-04-01", text: "Entry 5 text..." },
  ];

  const markedDates = entries.reduce((acc, entry) => {
    acc[entry.DateOfEntry] = {
      marked: true,
      dotColor: "blue",
      activeOpacity: 0,
      selected: true,
      selectedColor: "lightblue",
    };
    return acc;
  }, {});

  const onDayPress = (day) => {
    const entry = entries.find((e) => e.DateOfEntry === day.dateString);
    setSelectedDate(entry ? entry.text : "No Entry made on this date");
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
              Transcript:
            </Text>
            <Text variant="bodyLarge">{selectedDate}</Text>
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
});

export default DatePicker;
