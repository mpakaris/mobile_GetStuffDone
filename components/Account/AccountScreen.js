import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import FormLogin from "./FormLogin";
import Settings from "./Settings";

const AccountScreen = () => {
  const user = useSelector((state) => state.user.userObject);

  return (
    <View style={styles.container}>{user ? <Settings /> : <FormLogin />}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default AccountScreen;
