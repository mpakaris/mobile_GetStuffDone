import * as React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const Transcript = ({ transcript }) => (
  <Card style={styles.card}>
    <Card.Title
      title="Your Transcript"
      subtitle="Our AI Analyzed the following ..."
      left={LeftContent}
    />
    <Card.Content>
      <Text variant="titleLarge">{transcript}</Text>
    </Card.Content>
    <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
    <Card.Actions>
      <Button>Delete</Button>
      <Button>Save</Button>
    </Card.Actions>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: "1%",
    marginVertical: "10%",
    width: "80%",
    padding: "3%",
  },
});

export default Transcript;
