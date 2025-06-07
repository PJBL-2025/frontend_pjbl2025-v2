// app/orderStatus/[id].tsx
import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { dummyOrders } from "@/constant/dummy-order";

export default function OrderDetail() {
  const { id } = useLocalSearchParams();
  const orderId = parseInt(id as string);

  const order = dummyOrders.find(item => item.id === orderId);

  if (!order) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500">Pesanan tidak ditemukan</Text>
      </View>
    );
  }

  return (
    <ScrollView className="p-4">
      <Image
        source={{ uri: order.image_path || "https://via.placeholder.com/150" }}
        className="w-full h-48 rounded-xl bg-gray-100"
        resizeMode="cover"
      />

      <View className="mt-4 space-y-2">
        <Text className="text-xl font-bold text-gray-800">{order.name}</Text>
        <Text className="text-gray-700">Harga: Rp {order.price.toLocaleString("id-ID")}</Text>
        <Text className="text-gray-700">Jumlah: {order.quantity}</Text>
        <Text className="text-gray-700">Tipe: {order.type}</Text>
        <Text className="text-yellow-500">Status: {order.status}</Text>
      </View>
    </ScrollView>
  );
}