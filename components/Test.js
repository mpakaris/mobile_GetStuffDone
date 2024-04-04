import { Platform, StyleSheet, Text, View } from "react-native";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";

const Settings = () => {
  let [fontsLoaded, fontError] = useFonts({
    Inter_900Black,
  });

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "Inter-Black", fontSize: 30 }}>
        Inter Black
      </Text>
      <Text
        style={{
          fontFamily: Platform.select({
            android: "Inter_100Thin",
            ios: "Inter-Thin",
          }),
        }}
      >
        Inter Black Referenz
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Settings;
