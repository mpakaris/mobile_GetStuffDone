import { Image, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

const NoUserScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/NotLoggedIn.png")}
        style={{ width: 300, height: 300, alignSelf: "center" }}
      />
      <Card style={{ marginHorizontal: 20, marginTop: 20 }}>
        <Card.Content>
          <Text
            variant="titleMedium"
            style={{
              marginTop: 0,
              alignSelf: "center",
              fontFamily: "lato",
            }}
          >
            It seems that you are not Logged in.{"\n"}
            But no worries, you can still try out the Recording function!
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default NoUserScreen;
