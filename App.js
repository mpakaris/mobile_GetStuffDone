import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import BottomNavigation from "./components/BottomNavigation";

export default function App() {
  return (
    <PaperProvider>
      <BottomNavigation />
    </PaperProvider>
  );
}
