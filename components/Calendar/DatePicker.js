import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Button, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { deleteUserEntryByDate } from "../../api/firebase";
import { createMockEntries } from "../../hooks/DatePickerMockData";
import StructuredResultCard from "../Recorder/StructuredResultCard";
import Spinner from "../Spinner";
import DeleteEntryDialog from "./DeleteEntryDialog";

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const mockEntries = createMockEntries() || [];
  const [entries, setEntries] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const user = useSelector((state) => state.user.userObject);
  const userEntries = useSelector((state) => state.entries.userEntries);

  useEffect(() => {
    setEntries(user ? userEntries : mockEntries);
  }, [user, userEntries]);

  const screenHeight = Dimensions.get("window").height;
  const datePickerHeight = screenHeight * 0.3;
  const listHeight = screenHeight * 0.38;

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

  const onShowDeleteDialog = () => {
    setShowDialog(true);
  };

  const deleteFromDatabase = async () => {
    if (!user) return;

    try {
      setIsSending(true);
      const response = await deleteUserEntryByDate(user.uid, selectedDate.id);
    } catch (error) {
      console.log(error);
    }
    setShowDialog(false);
    setIsSending(false);
  };

  return (
    <View style={styles.container}>
      {!isSending ? (
        <View>
          <View style={{ height: datePickerHeight }}>
            <Calendar
              onDayPress={onDayPress}
              markedDates={markedDates}
              markingType={"custom"}
              theme={{
                selectedDayBackgroundColor: "#673AB7",
                arrowColor: "#673AB7",
              }}
            />
          </View>

          {selectedDate && (
            <View style={[styles.containerDailyEntry, { height: listHeight }]}>
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
                  renderItem={({ item }) => (
                    <StructuredResultCard item={item} />
                  )}
                  ListFooterComponent={
                    user ? (
                      <View style={styles.footerContainer}>
                        <Button
                          icon="delete"
                          mode="contained"
                          onPress={onShowDeleteDialog}
                          style={styles.deleteButton}
                        >
                          Delete Entry from Database
                        </Button>
                      </View>
                    ) : (
                      <></>
                    )
                  }
                />
              </SafeAreaView>

              <DeleteEntryDialog
                onDelete={deleteFromDatabase}
                onDismiss={() => setShowDialog(false)}
                isVisible={showDialog}
              />
            </View>
          )}

          {!user && !selectedDate && (
            <Text
              variant="bodyMedium"
              style={{
                color: "darkred",
                marginTop: 80,
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
      ) : (
        <Spinner />
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
    alignItems: "center",
    width: "100%",
    marginTop: 80,
  },
  listContainer: {
    width: "100%",
  },
  footerContainer: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    backgroundColor: "#E53935",
  },
  loginPic: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 15,
  },
});

export default DatePicker;
