import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

const UserScreen = () => {
  return (
    <Card style={{ marginHorizontal: 20, marginVertical: 30 }}>
      <Card.Content>
        <Text variant="titleMedium"></Text>
        <Card.Cover
          source={require("../../assets/Welcome.png")}
          style={{ width: 300, height: 300, alignSelf: "center" }}
        />
        <Text variant="titleMedium" style={{ marginTop: 20 }}>
          Tell Us all about your Accomplishments today!
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default UserScreen;
