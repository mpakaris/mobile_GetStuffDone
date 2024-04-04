import * as React from "react";
import { BottomNavigation } from "react-native-paper";
import AccountScreen from "./AccountScreen";
import DatePicker from "./DatePicker";
import Home from "./Home";
import Recorder from "./Recorder";
import Statistics from "./Statistics";

const HomeRoute = () => <Home />;
const JournalRoute = () => <DatePicker />;
const RecordRoute = () => <Recorder />;
const StatisticsRoute = () => <Statistics />;
const ProfileRoute = () => <AccountScreen />;

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
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
