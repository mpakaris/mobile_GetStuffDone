import * as React from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";

const motivationalQuote = {
  quote:
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  author: "Winston Churchill",
  message:
    "This quote inspires you to persevere regardless of setbacks or victories. It highlights that true success lies in the courage to persist, motivating you to keep pushing forward no matter the challenges.",
};

const Motivation = () => (
  <Card style={{ marginHorizontal: 20, marginTop: 15 }}>
    <Card.Content>
      <Text
        style={{
          fontWeight: 300,
          fontStyle: "italic",
          marginBottom: 0,
          alignSelf: "center",
        }}
      >
        "{motivationalQuote.quote}"
      </Text>
      <Text style={{ fontWeight: 700, marginTop: 0, alignSelf: "flex-end" }}>
        by {motivationalQuote.author}
      </Text>
      <Text style={{ fontWeight: 500, marginTop: 20 }}>
        {motivationalQuote.message}
      </Text>
      <View></View>
    </Card.Content>
  </Card>
);

export default Motivation;
