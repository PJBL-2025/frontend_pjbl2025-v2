import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { dummyOrders } from "@/constant/dummy-order";
import { useRouter } from "expo-router";


export default function Processing() {
  const orders = dummyOrders.filter(order => order.status === "processing");
  const router = useRouter();

  return (
    <ScrollView className="space-y-4">
      {orders.map((order, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          className="bg-white rounded-xl p-4 shadow flex-row items-center border border-gray-200 mb-4"
        >
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
            <Text className="text-sm text-gray-700 mt-1">
              Rp {(order.price * order.quantity).toLocaleString("id-ID")}
            </Text>
            <Text className="text-xs text-gray-400">Jumlah: {order.quantity}</Text>
            <Text className="text-xs text-gray-400 capitalize">Type: {order.type}</Text>
            <Text className="text-sm text-yellow-500 mt-1">Status: Diproses</Text>
            <View className="flex-row justify-end mt-2">
              <TouchableOpacity
                onPress={() => router.push(`/orderStatus/${order.id}`)}
                className="px-3 py-1.5 border border-blue-500 rounded-md mr-2"
              >
                <Text className="text-blue-500 text-sm font-medium">Cek Pesanan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      {orders.length === 0 && (
        <View className="items-center justify-center mt-10">
          <Text className="text-gray-400 text-sm">Tidak ada pesanan yang diproses.</Text>
        </View>
      )}
    </ScrollView>
  );
}