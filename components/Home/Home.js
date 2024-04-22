import { format } from "date-fns";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import NoUserScreen from "./NoUserScreen";
import UserScreen from "./UserScreen";

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
      {user && <UserScreen entries={entries} />}

      {/* USER IS NOT LOGGED IN */}
      {!user && <NoUserScreen />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
