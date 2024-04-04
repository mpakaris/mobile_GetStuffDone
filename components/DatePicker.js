import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
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
      dotColor: "black",
      activeOpacity: 0,
      selected: true,
      selectedColor: "#BC95C4",
    };
    return acc;
  }, {});

  const onDayPress = (day) => {
    const entry = entries.find((e) => e.date === day.dateString);
    setSelectedDate(entry ? entry : null);
  };

  return (
    <View style={styles.container}>
      {!selectedDate && (
        <Image
          source={require("../assets/Calendar.png")}
          style={styles.loginPic}
        />
      )}
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
  loginPic: {
    width: 250,
    height: 250,
    alignSelf: "center",
    marginBottom: 15,
  },
});

export default DatePicker;
