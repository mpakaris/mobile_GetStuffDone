import { Image, ScrollView, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import LastEntry from "./LastEntry";
import Motivation from "./Motivation";

const UserScreen = ({ entries }) => {
  function findMostRecentEntry() {
    if (!entries || entries.length === 0) {
      console.log("No entries to process.");
      return null;
    }

    const sortedEntries = entries.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    console.log("Sorted Entries:", sortedEntries);
    return sortedEntries[0];
  }

  const mostRecentEntry = findMostRecentEntry();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Image
        source={require("../../assets/Welcome.png")}
        style={{ width: 300, height: 300, alignSelf: "center" }}
      />
      <Card style={{ marginHorizontal: 20, marginTop: 20 }}>
        <Card.Content>
          <Text
            variant="titleLarge"
            style={{ marginTop: 0, alignSelf: "center", fontWeight: 800 }}
          >
            Welcome Back!
          </Text>
          <Text
            variant="titleMedium"
            style={{ marginTop: 5, textAlign: "center" }}
          >
            Save your NEW Accomplishments {"\n"}
            and Celebrate Your Progress!
          </Text>
        </Card.Content>
      </Card>

      {/* Pass the most recent entry directly */}
      {mostRecentEntry ? (
        <LastEntry item={mostRecentEntry} />
      ) : (
        <Text>No recent entries available.</Text>
      )}

      <Motivation />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    justifyContent: "center",
  },
});

export default UserScreen;
