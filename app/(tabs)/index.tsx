import CategoryButton from "@/components/category-button";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import { categoryIcon, products } from "@/constant/dummy-data";
import { images } from "@/constant/images";
import { getGreeting } from "@/utils/formatter";
import { useNavigation } from "@react-navigation/native";
import {
  Bell,
  MessageCircle,
  MoveRight,
  Search,
  ShoppingCart,
} from "lucide-react-native";
import { useRef } from "react";
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  return (
    <SafeAreaView className="flex-1 bg-blue-500">
      <ScrollView>
        <View className="p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-base text-white font-semibold">
              {getGreeting()}, User👋
            </Text>

            <View className="flex-row items-center gap-3">
              <TouchableOpacity>
                <MessageCircle color="white" />
              </TouchableOpacity>

              <TouchableOpacity>
                <Bell color="white" />
              </TouchableOpacity>

              <TouchableOpacity>
                <ShoppingCart color="white" />
              </TouchableOpacity>

              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <TouchableOpacity className="bg-white border border-[#007AFF] rounded-2xl px-4 py-2 items-center shadow-md">
                  <Text className="text-[#007AFF] font-semibold text-base">
                    Login
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>

          {/* Search Bar */}
          <Pressable className="bg-white rounded-[10px] px-4 py-2 flex-row items-center">
            <Search />
            <TextInput
              placeholder="Search Something"
              returnKeyType="search"
              className="flex-1"
            />
          </Pressable>
        </View>

        <View className="">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4 py-4"
          >
            <View className="flex-row gap-4 mr-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <View
                  key={i}
                  className="flex-row items-center gap-4 rounded-xl bg-white px-4 py-2"
                >
                  <View>
                    <Text className="mb-2 text-base font-bold text-black">
                      TMA-2{"\n"}Modular{"\n"}Headphone
                    </Text>
                    <TouchableOpacity>
                      <View className="flex-row items-center">
                        <Text className="mr-1 text-base font-medium text-blue-500">
                          Shop now
                        </Text>
                        <MoveRight size={15} color="#3B82F6" />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View className="w-32 h-32">
                    <Image source={images.clothes1} className="w-full h-full" />
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4"
          >
            <View className="mb-4 flex-row items-center justify-start gap-4">
              {categoryIcon.map((item) => (
                <CategoryButton
                  key={item.name}
                  icon={item.icon}
                  label={item.name}
                />
              ))}
            </View>
          </ScrollView>
        </View>

        <View className="flex-1 bg-white rounded-t-2xl px-4 pt-6">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="ml-1 text-lg font-bold">New Arrivals</Text>
            <TouchableOpacity>
              <Text className="mr-1 text-blue-500">See All</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap justify-between">
            {products.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                image={item.product_images}
                name={item.name}
                price={item.price}
                sold={item.sold}
                star={item.star}
                product_category={item.product_category}
              />
            ))}
          </View>
        </View>
        <Footer/>
      </ScrollView>
    </SafeAreaView>
  );
}
