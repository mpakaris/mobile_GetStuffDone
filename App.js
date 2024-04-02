import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import BottomNavigation from "./components/BottomNavigation";
import { store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <BottomNavigation />
      </PaperProvider>
    </Provider>
  );
}
