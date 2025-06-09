import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { dummyOrders } from "@/constant/dummy-order";

export default function Failed() {
  const orders = dummyOrders.filter(order => order.status === "failed");

  const handleBuyAgain = (order: any) => {
    console.log("Buying again:", order.name);
  };

  return (
    <ScrollView className="">
      {orders.map((order, index) => (
        <View
          key={index}
          className="bg-white rounded-xl p-4 shadow border border-gray-200 mb-4"
        >
          <View className="flex-row items-center mb-3">
            <Image
              source={{
                uri: order.image_path || "https://via.placeholder.com/64?text=No+Image",
              }}
              className="w-16 h-16 rounded-lg mr-4 bg-gray-100"
            />

            <View className="flex-1">
              <Text className="text-base font-semibold text-gray-800">
                {order.name || "Produk Tidak Diketahui"}
              </Text>
              <Text className="text-sm text-gray-800 mt-1">
                Rp {(order.price * order.quantity).toLocaleString("id-ID")}
              </Text>
              <Text className="text-xs text-gray-400">Jumlah: {order.quantity}</Text>
              <Text className="text-xs text-gray-400 capitalize">Tipe: {order.type}</Text>
              <Text className="text-sm text-red-500 mt-1">Status: Dibatalkan</Text>
            </View>
          </View>

          <View className="flex-row justify-end mt-2">
            <TouchableOpacity
              onPress={() => handleBuyAgain(order)}
              className="px-3 py-1.5 border border-gray-300 rounded-md"
            >
              <Text className="text-gray-700 text-sm font-medium">Beli Lagi</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {orders.length === 0 && (
        <View className="items-center justify-center mt-10">
          <Text className="text-gray-400 text-sm">
            Tidak ada pesanan yang dibatalkan.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}