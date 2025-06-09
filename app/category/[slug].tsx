import CartIcon from "@/components/cart-icon";
import NotFound from "@/components/not-found";
import ProductCard from "@/components/ui/product-card";
import { images } from "@/constant/images";
import useFetch from "@/hooks/usefetch";
import { Product } from "@/interfaces/interfaces";
import { getCategoryPorduct } from "@/service/productService";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const capitalizeWords = (text: string) =>
  text.replace(/\b\w/g, (char) => char.toUpperCase());

const CategoryPage = () => {
  const { slug } = useLocalSearchParams();
  const formattedSlug = capitalizeWords(String(slug).replace("%20", " "));

  const {
    data: filteredProducts,
    error,
    loading,
  } = useFetch<Product[]>(() => getCategoryPorduct(String(slug)));

  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-blue-500">
      <View className="flex-row justify-between items-center p-4 mb-4 z-10">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft color="white" />
        </TouchableOpacity>
        <CartIcon />
      </View>

      <View className="relative h-56 bottom-14">
        <Image
          source={images.categoryHeader}
          className="w-full object-cover rounded-b-3xl"
        />
      </View>

      <View className="flex-1 bg-white rounded-t-3xl px-4 pt-6">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-black text-xl font-bold">Kategori</Text>
          <View className="bg-blue-500 px-3 py-1 rounded-full">
            <Text className="text-white font-semibold text-sm capitalize">
              {formattedSlug}
            </Text>
          </View>
        </View>

        {filteredProducts?.length === 0 ? (
          <NotFound />
        ) : (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 20,
              gap: 12,
            }}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => <ProductCard data={item} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CategoryPage;
