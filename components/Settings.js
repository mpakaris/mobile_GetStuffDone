import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card } from "react-native-paper";
import { useSelector } from "react-redux";

const Settings = () => {
  const user = useSelector((state) => state.user.userObject);

  return (
    <View>
      <Card>
        <Card.Title
          title="Profile Settings"
          subtitle={user.email}
          style={{ marginBottom: 20 }}
        />
        <Card.Content>
          <Button
            mode="contained"
            onPress={() => console.log("Pressed")}
            buttonColor=""
            style={{ marginBottom: 20 }}
          >
            Logout
          </Button>
          <Button
            mode="contained"
            onPress={() => console.log("Pressed")}
            buttonColor="orange"
            style={{ marginBottom: 20 }}
          >
            Change Password
          </Button>
          <Button
            mode="contained-tonal"
            onPress={() => console.log("Pressed")}
            style={{ marginBottom: 20 }}
          >
            Reset All Entries
          </Button>
          <Button
            mode="contained"
            onPress={() => console.log("Pressed")}
            buttonColor="darkred"
            style={{ marginBottom: 20 }}
          >
            Delete Account
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: "10%",
  },
});

export default Settings;
