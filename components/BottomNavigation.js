import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import AccountScreen from "./AccountScreen";
import Recorder from "./Recorder";

const HomeRoute = () => <Text>Home</Text>;
const JournalRoute = () => <Text>Journal</Text>;
const RecordRoute = () => <Recorder />;
const StatisticsRoute = () => <Text>Statistics</Text>;
const ProfileRoute = () => <AccountScreen />;

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "heart",
      unfocusedIcon: "heart-outline",
    },
    {
      key: "journal",
      title: "Journal",
      focusedIcon: "notebook",
      unfocusedIcon: "notebook-outline",
    },
    {
      key: "record",
      title: "Record",
      focusedIcon: "microphone",
      unfocusedIcon: "microphone-outline",
    },
    {
      key: "statistics",
      title: "Statistics",
      focusedIcon: "chart-bar",
      unfocusedIcon: "chart-bar-stacked",
    },
    {
      key: "profile",
      title: "Account",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    journal: JournalRoute,
    record: RecordRoute,
    statistics: StatisticsRoute,
    profile: ProfileRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default MyComponent;