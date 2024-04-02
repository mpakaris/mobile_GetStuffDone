import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import "../firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
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
      <Button
        style={styles.loginBtn}
        icon="login"
        mode="elevated"
        onPress={handleLogin}
      >
        Login{" "}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "30px",
  },
  inputContainer: {
    width: "80%",
    alignItems: "center",
  },
  input: {
    marginBottom: 10,
    width: "100%", // Set input width to 100%
  },
  title: {
    marginBottom: "25px",
  },
  loginBtn: {
    marginTop: "25px",
  },
});

export default Login;
