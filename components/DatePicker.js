import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { useSelector } from "react-redux";
import EntrySummary from "./EntrySummary";

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const user = useSelector((state) => state.user.userObject);
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

      {selectedDate && <EntrySummary item={selectedDate} />}
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
