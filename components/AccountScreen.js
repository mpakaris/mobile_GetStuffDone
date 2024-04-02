import React from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slices/userSlice";

const AccountScreen = () => {
  const userObject = useSelector((state) => state.user.userObject);

  return <View>{userObject === null && <FormLogin />}</View>;
};

export default AccountScreen;
