import { StyleSheet, Text, View } from "react-native";

const Failed = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30 }}>Failed</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Failed;
