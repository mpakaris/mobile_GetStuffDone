import { format } from "date-fns";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user.userObject);
  const currentDate = new Date();
  const formattedDate = format(currentDate, "dd-MM-yyyy");

  const entries = [
    "Ate a Hamburger",
    "Went to the Gym",
    "Finished big project",
    "Walked the Dog",
    "Shopping for the week",
  ];

  return (
    <View style={styles.container}>
      {!user && (
        <View style={styles.notLoggedInContainer}>
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

          <View style={styles.lastEntryContainer}>
            <Text variant="bodyLarge" style={styles.lastEntryContainerTitle}>
              Your Last Entry was on 02-04-2024
            </Text>
            {entries.map((entry, index) => (
              <View key={index} style={styles.listItem}>
                <View variant="titleLarge" style={styles.bulletPoint} />
                <Text variant="titleMedium" style={styles.listItem}>
                  {entry}
                </Text>
              </View>
            ))}
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
    backgroundColor: "orange",
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
  lastEntryContainer: {
    backgroundColor: "brown",
    marginTop: 20,
    borderRadius: 20,
    marginHorizontal: "4%",
    paddingHorizontal: "10%",
    paddingVertical: 20,
  },
  lastEntryContainerTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    color: "white",
  },
  bulletPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "white",
    marginRight: 10,
  },
  notLoggedInContainer: {
    flex: 1,
    justifyContent: "center",
  },
  notLoggedInInfoContainer: {
    backgroundColor: "brown",
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
});

export default Home;
