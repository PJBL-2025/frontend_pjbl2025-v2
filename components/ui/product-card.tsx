import { Product } from "@/interfaces/interfaces";
import { formatPrice } from "@/utils/formatter";
import { useRouter } from "expo-router";
import { Star } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ProductCard({ data }: { data: Product }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="bg-white rounded-xl p-3 gap-3 border border-gray-300 w-[48%]"
      onPress={() => router.push(`/product/${data.id}`)}
    >
      <View className="aspect-square rounded-xl flex justify-center ">
        <Image
          src={data.product_images}
          className="w-full h-full object-cover"
        />
      </View>
      <View className="gap-1 ">
        <Text className="text-sm font-medium text-black">{data.name}</Text>
        <Text className="text-sm font-bold text-black">
          {formatPrice(data.price)}
        </Text>
        <View className="flex-row items-center mt-1 gap-1">
          <Star size={16} color="orange" />
          <Text className="text-xs text-gray-600">{data.star}</Text>
          <Text className="text-xs text-gray-400">( {data.sold} Terjual )</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
