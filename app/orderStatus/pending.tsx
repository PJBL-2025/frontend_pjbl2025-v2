import React, { useState } from "react";
import { Text, TouchableOpacity, View, ScrollView, Image } from "react-native";
import { dummyOrders } from "@/constant/dummy-order";
import { Ionicons } from "@expo/vector-icons";

interface PendingGroup {
  id: number;
  products: typeof dummyOrders;
  total_price: number;
}

export default function Pending() {
  const pendingItems = dummyOrders.filter((item) => item.status === "pending");

  const groupedPending: PendingGroup[] = [];
  for (let i = 0; i < pendingItems.length; i += 2) {
    const groupItems = pendingItems.slice(i, i + 2);
    const total = groupItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    groupedPending.push({ id: i / 2 + 1, products: groupItems, total_price: total });
  }

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectedGroups = groupedPending.filter((group) =>
    selectedIds.includes(group.id)
  );

  const totalSelectedItems = selectedGroups.reduce(
    (sum, group) => sum + group.products.reduce((a, b) => a + b.quantity, 0),
    0
  );

  const totalSelectedPrice = selectedGroups.reduce(
    (sum, group) => sum + group.total_price,
    0
  );

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-100 to-white">
      <ScrollView className="p-4 space-y-4">
        {groupedPending.map((group) => (
          <TouchableOpacity
            key={group.id}
            onPress={() => handleSelect(group.id)}
            className={`rounded-2xl px-4 py-3 border ${
              selectedIds.includes(group.id) ? "border-blue-500" : "border-gray-300"
            } bg-white shadow-sm`}
          >
            <View className="flex-row justify-between items-center mb-3">
              <Text className="font-bold text-base text-gray-800">#{group.id}</Text>
              <Ionicons
                name={
                  selectedIds.includes(group.id)
                    ? "checkmark-circle"
                    : "ellipse-outline"
                }
                size={22}
                color={selectedIds.includes(group.id) ? "#2563eb" : "#d1d5db"}
              />
            </View>

            {group.products.map((item, index) => (
              <View key={index} className="flex-row items-center mb-2">
                <Image
                  source={{ uri: item.image_path || "https://via.placeholder.com/64" }}
                  className="w-14 h-14 rounded-lg bg-gray-100 mr-3"
                />
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-gray-800">{item.name}</Text>
                  <Text className="text-xs text-gray-600">
                    Rp {item.price}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    {item.quantity}
                  </Text>
                </View>
              </View>
            ))}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Info */}
      <View className="bg-blue-100 rounded-t-2xl px-5 pt-4 pb-6 shadow-inner">

        <View className="flex-row justify-between items-center mb-4">
          <Text className="font-medium text-base text-gray-800">
            {selectedIds.length > 0
              ? `${totalSelectedItems} Produk Terpilih`
              : "Belum ada yang dipilih"}
          </Text>
          <Text className="font-semibold text-base text-gray-900">
            Rp {totalSelectedPrice.toLocaleString("id-ID")}
          </Text>
        </View>

        <TouchableOpacity
          disabled={selectedIds.length === 0}
          className={`py-3 rounded-xl items-center ${
            selectedIds.length > 0 ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          <Text className="text-white font-semibold text-base">
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
