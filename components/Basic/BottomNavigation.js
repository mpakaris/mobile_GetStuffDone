import React, { useEffect } from "react";
import { BottomNavigation } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntriesFromDB } from "../../store/slices/entriesSlice";
import AccountScreen from "../Account/AccountScreen";
import DatePicker from "../Calendar/DatePicker";
import Home from "../Home/Home";
import RecorderMain from "../Recorder/RecorderMain";
import StatisticsDashboard from "../Statistics/StatisticsDashboard";
import DisplayTop from "./DisplayTop";

const HomeRoute = () => <Home />;
const JournalRoute = () => <DatePicker />;
const RecordRoute = () => <RecorderMain />;
const StatisticsRoute = () => <StatisticsDashboard />;
const ProfileRoute = () => <AccountScreen />;

const MyComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userObject);
  const entriesStatus = useSelector((state) => state.entries.status);
  const entriesError = useSelector((state) => state.entries.error);

  //Fetch entries from DB
  useEffect(() => {
    // Check if the user object exists and has a uid before dispatching
    if (user && user.uid && entriesStatus === "idle") {
      dispatch(fetchEntriesFromDB(user.uid));
    }
  }, [user, dispatch, entriesStatus]);

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
    <>
      <DisplayTop pageName={routes[index].title} />
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
  );
};

export default MyComponent;
