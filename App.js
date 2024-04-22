import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import BottomNavigation from "./components/Basic/BottomNavigation";
import { store } from "./store";
import DisplayTop from "./components/Basic/DisplayTop";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <DisplayTop />
        <BottomNavigation />
      </PaperProvider>
    </Provider>
  );
}
