import React, { useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Text } from "react-native-paper";
import { useSelector } from "react-redux";
import StructuredResultCard from "./Recorder/StructuredResultCard";

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const user = useSelector((state) => state.user.userObject);
  const entries = useSelector((state) => state.entries.userEntries);

  // Create marked dates based on entries
  const markedDates = entries.reduce((acc, entry) => {
    const date = entry.timestamp.split("T")[0]; // Extract just the date part from the timestamp
    acc[date] = {
      marked: true,
      dotColor: "black",
      activeOpacity: 0,
      selected: true,
      selectedColor: "#BC95C4",
    };
    return acc;
  }, {});

  // Handle day press
  const onDayPress = (day) => {
    const entry = entries.find(
      (e) => e.timestamp.split("T")[0] === day.dateString
    );
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

      {selectedDate && (
        <View style={styles.containerDailyEntry}>
          <Text
            variant="titleMedium"
            style={{
              textAlign: "start",
              textAlign: "left",
              marginBottom: 10,
            }}
          >
            Your Accomplishments on {selectedDate.id}:
          </Text>
          <SafeAreaView style={styles.listContainer}>
            <FlatList
              data={selectedDate.structuredResults}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <StructuredResultCard item={item} />}
            />
          </SafeAreaView>
        </View>
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
  containerDailyEntry: {
    alignContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  listContainer: {
    flexGrow: 0, // Prevents the FlatList container from growing
    width: "90%",
    paddingHorizontal: 5,
  },
  loginPic: {
    width: 250,
    height: 250,
    alignSelf: "center",
    marginBottom: 15,
  },
});

export default DatePicker;
