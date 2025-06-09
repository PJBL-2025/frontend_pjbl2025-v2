import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert
} from "react-native";
import { dummyOrders } from "@/constant/dummy-order";
import { Ionicons } from "@expo/vector-icons";

export default function Success() {
  const [starRating, setStarRating] = useState<number>(0);
  const orders = dummyOrders.filter((order) => order.status === "success");

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [ratingText, setRatingText] = useState("");

  const openModal = (order: any) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

const handleSubmitRating = () => {
  if (!starRating || ratingText.trim() === "") {
    Alert.alert("Complete Rating", "Give stars and fill in the review before submitting");
    return;
  }

  Alert.alert(
    "Rating Dikirim",
    `Produk: ${selectedOrder?.name}\nBintang: ${starRating}\nUlasan: ${ratingText}`,
    [{ text: "OK", onPress: () => {
        setShowModal(false);
        setStarRating(0);
        setRatingText("");
      } }]
  );
};

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
                {order.name || "Uknown Product"}
              </Text>
              <Text className="text-sm text-gray-800 mt-1">
                Rp {(order.price * order.quantity).toLocaleString("id-ID")}
              </Text>
              <Text className="text-xs text-gray-400">Jumlah: {order.quantity}</Text>
              <Text className="text-xs text-gray-400 capitalize">Tipe: {order.type}</Text>
              <Text className="text-sm text-green-500 mt-1">Status: Terkirim</Text>
            </View>
          </View>

          <View className="flex-row justify-end mt-2">
            <TouchableOpacity
              onPress={() => openModal(order)}
              className="px-3 py-1.5 border border-blue-500 rounded-md mr-2"
            >
              <Text className="text-blue-500 text-sm font-medium">Berikan Rating</Text>
            </TouchableOpacity>

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
            Tidak ada pesanan yang terkirim.
          </Text>
        </View>
      )}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-6">
          <View className="bg-white p-6 rounded-2xl w-full max-w-md">
            <Text className="text-lg font-semibold mb-2 text-center">
              Berikan Rating untuk {selectedOrder?.name}
            </Text>

            <View className="flex-row justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setStarRating(star)}>
                  <Ionicons
                    name={starRating >= star ? "star" : "star-outline"}
                    size={50}
                    color={starRating >= star ? "#facc15" : "#d1d5db"}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              placeholder="Write your review here..."
              value={ratingText}
              onChangeText={setRatingText}
              multiline
              className="border border-gray-300 rounded-md p-3 text-sm text-gray-800 h-24"
            />

            <View className="flex-row justify-between mt-5">
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                className="px-4 py-2 rounded-md bg-gray-200"
              >
                <Text className="text-gray-700">Tutup</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSubmitRating}
                className="px-4 py-2 rounded-md bg-blue-600"
              >
                <Text className="text-white font-semibold">Kirim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}