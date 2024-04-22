import { format } from "date-fns";
import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import UserScreen from "./UserScreen";
import NoUserScreen from "./NoUserScreen";

const Home = () => {
  const user = useSelector((state) => state.user.userObject);
  const entries = useSelector((state) => state.entries.userEntries);
  const currentDate = new Date();
  const formattedDate = format(currentDate, "dd-MM-yyyy");

  const lastUserEntry = () => {
    if (!entries || entries.length === 0) return null;

    const sortedEntries = [...entries].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });

    return sortedEntries[0];
  };

  return (
    <View style={styles.container}>
      {/* USER IS LOGGED IN */}
      {user && <UserScreen />}

      {/* USER IS NOT LOGGED IN */}
      {!user && <NoUserScreen />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loggedInContainer: {
    backgroundColor: "#BC95C4",
    height: 300,
    marginTop: 0,
    borderRadius: 40,
  },
  title: {
    marginTop: 70,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  subTitle: {
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    paddingHorizontal: "10%",
  },
  notLoggedInContainer: {
    flex: 1,
    justifyContent: "center",
  },
  notLoggedInInfoContainer: {
    backgroundColor: "#BC95C4",
    borderRadius: 20,
    marginHorizontal: "4%",
    paddingHorizontal: "10%",
    paddingVertical: 50,
  },
  notLoggedInText: {
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  loginPic: {
    width: 250,
    height: 250,
    alignSelf: "center",
    marginBottom: 15,
    marginTop: 50,
  },
});

export default Home;
