import { Banner } from "@/interfaces/interfaces";
import { useRouter } from "expo-router";
import { MoveRight } from "lucide-react-native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const BannerCard = ({ item }: { item: Banner }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(`/product/${item.id}`)}
      className="flex-row items-center gap-4 rounded-xl bg-white px-4 py-2 w-[250px]"
    >
      <View className="flex-1">
        <Text className="mb-2 text-base font-bold text-black">{item.name}</Text>
        <View className="flex-row items-center">
          <Text className="mr-1 text-base font-medium text-blue-500">
            Shop now
          </Text>
          <MoveRight size={15} color="#3B82F6" />
        </View>
      </View>
      <View className="w-32 h-32">
        <Image src={item.product_images} className="w-full h-full" />
      </View>
    </TouchableOpacity>
  );
};

export default BannerCard;
