import CartIcon from "@/components/cart-icon";
import NotFound from "@/components/not-found";
import ProductCard from "@/components/ui/product-card";
import useFetch from "@/hooks/usefetch";
import { getSearchPorduct } from "@/service/productService";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Search } from "lucide-react-native";
import React, { useEffect } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Product = () => {
  const params = useLocalSearchParams();
  const query = params.query as string;
  const {
    data: products,
    loading,
    error,
    refetch,
  } = useFetch(() => getSearchPorduct(query), false);

  useEffect(() => {
    refetch();
  }, [query]);

  const router = useRouter();

  return (
    <>
      <View className="flex-row gap-4 p-4 items-center">
        <TouchableOpacity onPress={() => router.push("/search")}>
          <ArrowLeft color={"white"} />
        </TouchableOpacity>
        <Pressable
          className="bg-white flex-1 rounded-xl p-4 flex-row items-center gap-4"
          onPress={() => router.push("/search")}
        >
          <Search />
          <Text className="text-gray-500">{query || "Cari Sesuatu"}</Text>
        </Pressable>
        <CartIcon />
      </View>

      {loading && <Text className="text-center text-gray-500">Loading...</Text>}
      {error ? (
        <View className="flex-1 justify-center items-center mb-24"><NotFound /></View>
      ) : (
        <ScrollView className="bg-white rounded-t-2xl p-4 gap-8 pt-8">
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ProductCard data={item} />}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
              paddingBottom: 12,
            }}
            scrollEnabled={false}
          />

          <Text className="text-center font-bold text-blue-500 mt-6 mb-12">
            Sudah menunjukan semua produk.
          </Text>
        </ScrollView>
      )}
    </>
  );
};

export default Product;
