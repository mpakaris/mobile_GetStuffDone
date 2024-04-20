import * as React from "react";
import { Card, Text } from "react-native-paper";

const StructuredResultCard = ({ item }) => (
  <Card style={{ marginHorizontal: 5, marginVertical: 5 }}>
    <Card.Content>
      <Text variant="titleLarge">{item.activity}</Text>
      <Text variant="bodyMedium">
        {item.category} | ({item.duration} min.)
      </Text>
    </Card.Content>
  </Card>
);

export default StructuredResultCard;
