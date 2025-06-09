import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { dummyOrders, OrderGroup } from "@/constant/dummy-order";

export default function PendingCheckoutContainer() {
  const fakeGroup: OrderGroup = {
    id: 1,
    order_id: "Contoh-Aja-sih",
    product: dummyOrders.filter((item) => item.status === "pending"),
    total_price: dummyOrders.reduce(
      (acc, item) =>
        item.status === "pending" ? acc + item.price * item.quantity : acc,
      0
    ),
  };

  const [orders, setOrders] = useState<OrderGroup[]>([fakeGroup]);

  const handleCancelOrder = (orderId: number) => {
    const updated = orders.filter((o) => o.id !== orderId);
    setOrders(updated);
  };

  return (
    <ScrollView className="p-4 space-y-4">
      {orders.map((order, index) => (
        <View
          key={order.id}
          className="bg-white rounded-xl p-4 shadow space-y-3 border border-gray-200"
        >
          <View className="flex-row justify-between mb-2">
            <Text className="font-semibold text-blue-500">
              Order #{order.order_id}
            </Text>
            <Text className="font-semibold text-gray-500">#{index + 1}</Text>
          </View>

          {order.product
            .filter((item) => item.status === "pending")
            .map((item, idx) => (
              <View key={idx} className="flex-row mb-3">
                <Image
                  source={{
                    uri:
                      item.image_path || "https://via.placeholder.com/64?text=No+Image",
                  }}
                  className="w-16 h-16 rounded-lg mr-3 bg-gray-200"
                />
                <View className="flex-1">
                  <Text className="font-semibold text-gray-800">
                    {item.name || "Custom Product"}
                  </Text>
                  <Text className="text-gray-600">
                    Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                  </Text>
                  <Text className="text-xs text-gray-400">
                    Jumlah: {item.quantity}
                  </Text>
                  <Text className="text-xs text-gray-400">
                    Type: {item.type}
                  </Text>
                  <Text className="text-sm text-blue-500 mt-1">Status: Pending</Text>
                </View>
              </View>
            ))}

          <TouchableOpacity
            onPress={() => handleCancelOrder(order.id)}
            className="mt-2 bg-red-100 rounded-lg py-2"
          >
            <Text className="text-center text-red-500 font-medium">
              Batalkan Pesanan
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}