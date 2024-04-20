import { format } from "date-fns";
import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useSelector } from "react-redux";
// import EntrySummary from "./EntrySummary";

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
      {user && (
        <View>
          <View style={styles.loggedInContainer}>
            <Text variant="headlineMedium" style={styles.title}>
              Good Day, {user.email}!
            </Text>
            <Text variant="headlineSmall" style={styles.subTitle}>
              {formattedDate}
            </Text>
            <Text variant="headlineSmall" style={styles.subTitle}>
              Tell me all the amazing stuff you have accomplished today!
            </Text>
          </View>
          {entries.length !== 0 && (
            <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
              {/* <EntrySummary item={lastUserEntry()} /> */}
              <Text>{JSON.stringify(entries)}</Text>
            </View>
          )}
          {entries.length === 0 && (
            <Image
              source={require("../assets/Welcome.png")}
              style={styles.loginPic}
            />
          )}
        </View>
      )}

      {/* USER IS NOT LOGGED IN */}
      {!user && (
        <View style={styles.notLoggedInContainer}>
          <Image
            source={require("../assets/NotLoggedIn.png")}
            style={styles.loginPic}
          />
          <View style={styles.notLoggedInInfoContainer}>
            <Text variant="titleMedium" style={styles.notLoggedInText}>
              It appears as you are not logged in.
            </Text>
            <Text variant="titleMedium" style={styles.notLoggedInText}>
              You can still try our Journal AI, but you can't save your results.
            </Text>
            <Text variant="titleMedium" style={styles.notLoggedInText}>
              Please log in or create an account to use all features.
            </Text>
          </View>
        </View>
      )}
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
