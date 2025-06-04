import { Stack } from "expo-router";
import "./global.css";

export default function RootLayout() {
  return (
    <Stack initialRouteName="splash">
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
