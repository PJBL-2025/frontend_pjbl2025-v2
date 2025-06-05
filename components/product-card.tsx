import { formatPrice } from "@/utils/formatter";
import { useNavigation, useRouter } from "expo-router";
import { Star } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ProductCard({
  data
}: {data: Product}) {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="w-[48%] bg-white rounded-2xl p-3 mb-4"
      onPress={() => router.push(`/product/${data.id}`)}
      style={{
        shadowColor: "#687582",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 30,
        elevation: 4,
      }}
    >
      <View className="w-full h-32 rounded-xl bg-white items-center justify-center overflow-hidden mb-3">
        <Image src={data.product_images} className="w-full h-full" resizeMode="contain" />
      </View>
      <Text className="text-sm font-medium text-black mb-1">{data.name}</Text>
      <Text className="text-sm font-bold text-black">{formatPrice(data.price)}</Text>
      <View className="flex-row items-center mt-1 gap-1">
        <Star size={16} color="orange" />
        <Text className="text-xs text-gray-600">{data.star}</Text>
        <Text className="text-xs text-gray-400">( {data.sold} Terjual )</Text>
      </View>
    </TouchableOpacity>
  );
}
