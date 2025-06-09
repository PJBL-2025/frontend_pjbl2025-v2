import { Tabs } from "expo-router";
import { Home, ScrollText, Search, User } from "lucide-react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Layout = () => {
  return (
    <SafeAreaView className="flex-1 bg-blue-500">
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "Beranda",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Home
                color={focused ? "#3b82f6" : "#000"}
                size={20}
                strokeWidth={1.5}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Pencarian",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Search
                color={focused ? "#3b82f6" : "#000"}
                size={20}
                strokeWidth={1.5}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="transaction"
          options={{
            title: "Transaksi",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <ScrollText
                color={focused ? "#3b82f6" : "#000"}
                size={20}
                strokeWidth={1.5}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Akun",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <User
                color={focused ? "#3b82f6" : "#000"}
                size={20}
                strokeWidth={1.5}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default Layout;
