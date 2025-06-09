import CartIcon from "@/components/cart-icon";
import Footer from "@/components/footer";
import PageWrapper from "@/components/pageWrapper";
import CategoryButton from "@/components/ui/category-button";
import ProductCard from "@/components/ui/product-card";
import { categoryIcon, products } from "@/constant/dummy-data";
import { images } from "@/constant/images";
import { getGreeting } from "@/utils/formatter";
import { useRouter } from "expo-router";
import {
  MessageCircle,
  MoveRight,
  Search,
} from "lucide-react-native";
import { useRef } from "react";
import {
  Animated,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  return (
    <PageWrapper>
      <View className="sticky top-0 left-0 p-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-base text-white font-semibold">
            {getGreeting()}, User👋
          </Text>

          <View className="flex-row items-center gap-3">
            <TouchableOpacity>
              <MessageCircle color="white" />
            </TouchableOpacity>

            <CartIcon/>

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
        <Pressable
          className="bg-white rounded-xl p-4 flex-row items-center gap-4"
          onPress={() => router.push("/search")}
        >
          <Search />
          <Text className="text-gray-500">Cari Sesuatu</Text>
        </Pressable>
      </View>

      <ScrollView>
        <View className="">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="p-4"
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

          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ProductCard data={item} />}
            numColumns={2}
            columnWrapperStyle={{
              gap: 6,
            }}
            scrollEnabled={false}
          />
        </View>
        <Footer />
      </ScrollView>
    </PageWrapper>
  );
}
