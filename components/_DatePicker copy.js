import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

const DatePicker_Copy = () => {
  const [selectedDate, setSelectedDate] = useState("");

  const entries = [
    { DateOfEntry: "2024-04-03", text: "Entry 1 text..." },
    { DateOfEntry: "2024-04-15", text: "Entry 2 text..." },
    { DateOfEntry: "2024-04-10", text: "Entry 3 text..." },
    { DateOfEntry: "2024-04-08", text: "Entry 4 text..." },
    { DateOfEntry: "2024-04-01", text: "Entry 5 text..." },
  ];

  const markedDates = entries.reduce((acc, entry) => {
    acc[entry.DateOfEntry] = { marked: true, selectedColor: "blue" };
    return acc;
  }, {});

  const onDayPress = (day) => {
    const entry = entries.find((e) => e.DateOfEntry === day.dateString);
    setSelectedDate(entry ? entry.text : "");
  };

  return (
    <View style={styles.container}>
      <Calendar
        // Initially visible month. Default = Date()
        current={Date()}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={onDayPress}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        // Marked dates
        markedDates={{
          ...markedDates,
          ...entries.reduce((acc, entry) => {
            acc[entry.DateOfEntry] = {
              disabled: true,
              disableTouchEvent: true,
            };
            return acc;
          }, {}),
        }}
      />
      {selectedDate && <Text>Text: {selectedDate}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DatePicker_copy;
