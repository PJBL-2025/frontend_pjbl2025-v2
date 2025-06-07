import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1 bg-blue-500">
      <Slot />
    </SafeAreaView>
  );
}
