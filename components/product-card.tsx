import { formatPrice } from "@/utils/formatter";
import { useNavigation } from "expo-router";
import { Star } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";


export default function ProductCard({
  id,
  name,
  sold,
  image, 
  star,
  price,
}: Product) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="w-[48%] bg-white rounded-2xl p-3 mb-4"
      style={{
        shadowColor: "#687582",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 30,
        elevation: 4,
      }}
    >
      <View className="w-full h-32 rounded-xl bg-white items-center justify-center overflow-hidden mb-3">
        <Image src={image} className="w-full h-full" resizeMode="contain" />
      </View>
      <Text className="text-sm font-medium text-black mb-1">{name}</Text>
      <Text className="text-sm font-bold text-black">{formatPrice(price)}</Text>
      <View className="flex-row items-center mt-1 gap-1">
        <Star size={16} color="orange" />
        <Text className="text-xs text-gray-600">{star}</Text>
        <Text className="text-xs text-gray-400">( {sold} Terjual )</Text>
      </View>
    </TouchableOpacity>
  );
}
