import CartIcon from "@/components/cart-icon";
import Footer from "@/components/footer";
import PageWrapper from "@/components/pageWrapper";
import BannerCard from "@/components/ui/banner-card";
import CategoryButton from "@/components/ui/category-button";
import ProductCard from "@/components/ui/product-card";
import { categoryIcon } from "@/constant/dummy-data";
import { API_URL } from "@/constant/env";
import useFetch from "@/hooks/usefetch";
import { Banner, Product } from "@/interfaces/interfaces";
import { getAllProduct, getBanner } from "@/service/productService";
import { getGreeting } from "@/utils/formatter";
import { useRouter } from "expo-router";
import { MessageCircle, Search } from "lucide-react-native";
import { useRef } from "react";
import {
  Animated,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const {
    data: productData,
    error: productError,
    loading: productLoading,
  } = useFetch<Product[]>(getAllProduct);

  const {
    data: bannerData,
    error: bannerRrror,
    loading: bannerLoading,
  } = useFetch<Banner[]>(getBanner);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const router = useRouter();

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

            <CartIcon />

            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity
                className="bg-white border border-[#007AFF] rounded-2xl px-4 py-2 items-center shadow-md"
                onPress={() => router.push("/login")}
              >
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
              {bannerData?.map((item) => (
                <BannerCard key={item.id} item={item} />
              ))}
            </View>
          </ScrollView>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4"
          >
            <View className="mb-4 flex-row items-center justify-start gap-4 mr-8">
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
            data={productData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ProductCard data={item} />}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
              paddingBottom: 12,
            }}
            scrollEnabled={false}
          />
        </View>
        <Footer />
      </ScrollView>
    </PageWrapper>
  );
}
