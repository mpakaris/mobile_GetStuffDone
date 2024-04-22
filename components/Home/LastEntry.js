import * as React from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";

const LastEntry = ({ item }) => (
  <Card style={{ marginHorizontal: 20, marginTop: 15 }}>
    <Card.Content>
      <Text style={{ fontWeight: 700, marginBottom: 7 }}>
        Your last {item.structuredResults.length} Accomplishments: {item.id}
      </Text>
      <View>
        {item?.structuredResults &&
          item.structuredResults.map((result, index) => (
            <>
              <Text key={index} style={{ marginTop: 3, fontWeight: 700 }}>
                {result.activity}
              </Text>
              <Text style={{ marginBottom: 5 }}>
                {result.category} ({result.duration} min.)
              </Text>
            </>
          ))}
      </View>
    </Card.Content>
  </Card>
);

export default LastEntry;
