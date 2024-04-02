import React from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";

const AccountScreen = () => {
  return (
    <View>
      <FormLogin />
      <Divider />
      <FormRegister />
    </View>
  );
};

export default AccountScreen;
