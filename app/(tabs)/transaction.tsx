import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

import Failed from "../orderStatus/failed";
import PendingContainer from "@/components/Order/pendingContainer"
import Pending from "../orderStatus/pending";
import Processing from "../orderStatus/processing";
import Success from "../orderStatus/success";

const TABS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "processing", label: "Processing" },
  { key: "success", label: "Success" },
  { key: "failed", label: "Cancel" },
];

export default function TransactionScreen() {
  const { orderStatus } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (
      orderStatus && typeof orderStatus === "string" && TABS.some((tab) => tab.key === orderStatus)
    ) {
      setActiveTab(orderStatus);
    }
  }, [orderStatus]);

const renderContent = () => {
  switch (activeTab) {
    case "pending":
      return <Pending />;
    case "processing":
      return <Processing />;
    case "success":
      return <Success />;
    case "failed":
      return <Failed />;
    case "all":
      return (
        <>
          <PendingContainer />
          <Processing />
          <Success />
          <Failed />
        </>
      );
    default:
      return <Pending />;
  }
};

  return (
  <SafeAreaView className="flex-1 bg-blue-500">
    <View className="flex-1">
      <View className="items-center mt-4 mb-2">
        <View className="flex-row gap-x-6">
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              className={`${activeTab === tab.key ? "border-b-2 border-white" : ""}`}
            >
              <Text
                className={`text-base font-medium ${
                  activeTab === tab.key
                    ? "text-white underline decoration-white decoration-2"
                    : "text-white"
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        className="bg-white rounded-t-2xl px-4 pt-4 pb-6"
      >
        {renderContent()}
      </ScrollView>
    </View>
  </SafeAreaView>
  );
}
