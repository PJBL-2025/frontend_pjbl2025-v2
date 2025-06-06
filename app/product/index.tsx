import NotFound from "@/components/not-found";
import ProductCard from "@/components/ui/product-card";
import { products } from "@/constant/dummy-data";
import { useRouter } from "expo-router";
import { ArrowLeft, Search, ShoppingCart } from "lucide-react-native";
import React from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Product = () => {
  const router = useRouter();

  return (
    <>
      <View className="flex-row gap-4 p-4 items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color={"white"} />
        </TouchableOpacity>
        <Pressable
          className="bg-white flex-1 rounded-xl p-4 flex-row items-center gap-4"
          onPress={() => router.push("/search")}
        >
          <Search />
          <Text className="text-gray-500">Cari Sesuatu</Text>
        </Pressable>
        <TouchableOpacity>
          <ShoppingCart color="white" />
        </TouchableOpacity>
      </View>

      <NotFound />

      <ScrollView className="bg-white rounded-t-2xl p-4 gap-8">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          <View className="flex-row gap-2">
            <View className="bg-gray-400 rounded-full py-1 px-4">
              <Text className="text-white">Laris</Text>
            </View>
          </View>
        </ScrollView>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductCard data={item} />}
          numColumns={2}
          columnWrapperStyle={{
            gap: 20,
          }}
          scrollEnabled={false}
        />

        <Text className="text-center font-bold text-blue-500 mb-12">
          Sudah menunjukan semua produk.
        </Text>
      </ScrollView>
    </>
  );
};

export default Product;
