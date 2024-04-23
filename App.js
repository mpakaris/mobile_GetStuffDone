import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import BottomNavigation from "./components/Basic/BottomNavigation";
import { store } from "./store";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoaded] = useFonts({
    lato: require("./assets/fonts/Lato/Lato-Regular.ttf"),
    "lato-bold": require("./assets/fonts/Lato/Lato-Bold.ttf"),
    "lato-light": require("./assets/fonts/Lato/Lato-Light.ttf"),
  });

  const handleOnLayout = useCallback(async () => {
    if (isLoaded) await SplashScreen.hideAsync();
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PaperProvider>
        <BottomNavigation onLayout={handleOnLayout} />
      </PaperProvider>
    </Provider>
  );
}
