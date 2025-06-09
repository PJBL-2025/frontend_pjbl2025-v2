import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Layout = () => {
  return (
    <SafeAreaView className="flex-1 bg-blue-500">
      <Slot />
    </SafeAreaView>
  );
};

export default Layout;
