import { Headset, Instagram, Music2, ThumbsUp } from "lucide-react-native";
import { Image, Text, View } from "react-native";

const Footer = () => {
  return (
    <View className="flex-1 relative bg-white">
      <View
        className="bg-white px-4 pb-4 gap-y-6"
        style={{ padding: 16, marginTop: 100, zIndex: 2 }}
      >
        <View className="linear-gradient"></View>
        <View className="flex-row justify-between">
          {/* Kiri: Icon dan Teks */}
          <View className="space-y-3">
            <View className="flex-row items-center space-x-2">
              <Headset size={16} />
              <Text className="text-gray-600 text-[10px]">
                Customer Service
              </Text>
            </View>
            <View className="flex-row items-center space-x-2">
              <ThumbsUp size={16} />
              <Text className="text-gray-600 text-[10px]">
                Criticism and suggestions
              </Text>
            </View>
          </View>

          {/* Kanan: Paragraf */}
          <Text className="text-gray-400 w-[48%] text-left text-[12px]">
            malesuada eget consectetur non non laoreet Donec nisl. non, ultrices
            quam Nam tincidunt faucibus nulla, Sed ipsum Lorem sit
          </Text>
        </View>

        <View className="flex-row justify-between px-6 mt-10">
          {/* Kolom 1: Follow Us */}
          <View className="flex-1 items-start">
            <Text className="font-bold text-lg mb-2">Follow Us</Text>
            <View className="flex-row gap-x-2">
              <Instagram />
              <Music2 />
            </View>
          </View>

          {/* Kolom 2: Payment */}
          <View className="flex-1 items-center">
            <Text className="font-bold text-lg ">Payment</Text>
            <View className="items-center">
              <Image
                source={require("../assets/images/payment.png")}
                className="w-[200px] h-[200px]"
                style={{ resizeMode: "contain" }}
              />
            </View>
          </View>
        </View>

        {/* Section 3: Footer Text */}
        <Text className="text-center text-gray-400 mt-4 text-xs">
          Since 2025
        </Text>
      </View>
    </View>
  );
};

export default Footer;
