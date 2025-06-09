import { Slot, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="splash"
      >
        <Stack.Screen name="splash" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="product" />
        <Stack.Screen name="cart" />
        <Stack.Screen name="category/[slug]" />
        <Stack.Screen name="profile/profileEditPage"/>
      </Stack>

  );
}