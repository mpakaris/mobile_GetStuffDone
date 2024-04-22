import { StyleSheet, Text, View } from "react-native";

const DisplayTop = ({ pageName }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pageName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: "#BC95C4",
  },
  title: {
    position: "absolute",
    bottom: 10,
    marginHorizontal: "auto",
    fontWeight: "700",
    fontSize: 20,
    color: "white",
    alignSelf: "center",
  },
});

export default DisplayTop;
