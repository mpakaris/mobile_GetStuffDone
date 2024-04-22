import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { createMockEntries } from "../hooks/DatePickerMockData";
import StructuredResultCard from "./Recorder/StructuredResultCard";

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const user = useSelector((state) => state.user.userObject);
  const userEntries = useSelector((state) => state.entries.userEntries);
  const mockEntries = createMockEntries() || [];
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    setEntries(user ? userEntries : mockEntries);
  }, [user]);

  // Create marked dates based on entries
  const markedDates = entries.reduce((acc, entry) => {
    const date = entry.timestamp.split("T")[0];
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

      {!user && !selectedDate && (
        <Text
          variant="bodyMedium"
          style={{
            color: "darkred",
            marginTop: 20,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Info: {"\n"}
          It seems you are not logged in. {"\n"}
          To show the functionality of our Journal,{"\n"}
          we created some fictional entries for you.
        </Text>
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
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 15,
  },
});

export default DatePicker;
