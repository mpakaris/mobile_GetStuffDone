import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebaseConfig";
import { setUser } from "../store/slices/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState("login");

  const dispatch = useDispatch();
  const userObject = useSelector((state) => state.user.userObject);

  const switchForm = (targetForm) => {
    setForm(targetForm);
    setError("");
    setEmail("");
    setPassword("");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          accessToken: user.accessToken,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          accessToken: user.accessToken,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {form === "login" && (
        <>
          <Image
            source={require("../assets/Login.png")}
            style={styles.loginPic}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.title} variant="headlineSmall">
              Login
            </Text>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              right={<TextInput.Icon name="eye" />}
              style={styles.input}
            />
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Button
            style={styles.loginBtn}
            icon="login"
            mode="elevated"
            onPress={handleLogin}
          >
            Login
          </Button>
          <Button
            icon="account-plus"
            mode="text"
            onPress={() => switchForm("register")}
            style={styles.formSwitch}
          >
            No Account? Sign up!
          </Button>
        </>
      )}

      {form === "register" && (
        <>
          <View>
            <Image
              source={require("../assets/Register.png")}
              style={styles.loginPic}
            />
            <Text style={styles.title} variant="headlineSmall">
              Register
            </Text>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              right={<TextInput.Icon name="eye" />}
              style={styles.input}
            />
            <TextInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              right={<TextInput.Icon name="eye" />}
              style={styles.input}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Button
              style={styles.loginBtn}
              icon="account-plus"
              mode="elevated"
              onPress={handleRegister}
            >
              Sign Up!
            </Button>
            <Button
              icon="login"
              mode="text"
              onPress={() => switchForm("login")}
              style={styles.formSwitch}
            >
              Have an Account? Log in!
            </Button>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    marginBottom: 20,
  },
  loginBtn: {
    marginBottom: 10,
  },
  loginPic: {
    width: 250,
    height: 250,
    alignSelf: "center",
    marginBottom: 15,
  },
});

export default Login;
