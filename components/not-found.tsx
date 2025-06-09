import { FileQuestion } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const NotFound = () => {
  return (
    <View className="justify-center items-center py-20 gap-4">
      <FileQuestion color={"white"} size={60} />
      <View>
        <Text className="text-white text-2xl font-bold text-center">
          Produk tidak ditemukan
        </Text>
        <Text className="text-gray-300 text-center">
          Mungkin ada kesalahan, coba cari kata kunci lain
        </Text>
      </View>
      <TouchableOpacity className="bg-white py-2 px-4 rounded-sm">
        <Text>Cari kata kunci lain</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotFound;
