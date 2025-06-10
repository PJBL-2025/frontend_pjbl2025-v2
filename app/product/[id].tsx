import CartIcon from "@/components/cart-icon";
import ModalCart from "@/components/modal-cart";
import NotFound from "@/components/not-found";
import ProductCard from "@/components/ui/product-card";
import ReviewCard from "@/components/ui/review-card";
import useFetch from "@/hooks/usefetch";
import { Product, ProductDetail } from "@/interfaces/interfaces";
import { getAllProduct, getOnePorduct } from "@/service/productService";
import { formatDate, formatPrice } from "@/utils/formatter";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { ChevronLeft, Palette } from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProductDetailPage = () => {
  const { id } = useLocalSearchParams();
  const {
    data: product,
    error,
    loading,
  } = useFetch<ProductDetail>(() => getOnePorduct(Number(id)));

  const {
    data: productData,
    error: productError,
    loading: productLoading,
  } = useFetch<Product[]>(getAllProduct);

  const [modalCart, setModalCart] = useState<boolean>(false);
  const router = useRouter();

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-white font-bold">Loading</Text>
      </View>
    );
  }

  return (
    <>
      <View className="flex-row items-center mt-2 p-4">
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-white font-semibold text-base">
          Detail Produk
        </Text>
        <CartIcon />
      </View>

      <ScrollView className="flex-1 bg-white p-4 rounded-t-2xl">
        <View className="flex-row items-center gap-4">
          <View className="size-40">
            <Image
              src={product.product_images[0]}
              className="w-full h-full object-cover"
            />
          </View>
          <View className="flex-1 gap-2">
            <Text className="font-bold text-2xl">{product.name}</Text>
            <Text className="text-lg">{formatPrice(product.price)}</Text>
            <View className="flex-row justify-between">
              <View className="flex-row gap-2 items-center">
                <FontAwesome name="star" size={16} color="#FFD700" />
                <Text>{product.star}</Text>
              </View>
              <Text>{product.sold} Terjual</Text>
            </View>
            <Text className="text-gray-400 mt-2">
              {formatDate(product.created_at)}
            </Text>
          </View>
        </View>

        <View className="my-8">
          <Text className="text-2xl font-bold mb-2">Deskripsi</Text>
          <Text className="text-gray-500">{product.description}</Text>
          <Text className="text-gray-500">
            Stok: {product.product_quantity} pcs
          </Text>
          <Text className="text-gray-500">Berat: {product.weight} kg</Text>
        </View>

        <View className="mb-8">
          <Text className="text-2xl font-bold mb-2">Ulasan</Text>
          {product.review.length < 0 ? (
            <View className="">
              <Text className="text-gray-500 text-center">
                Belum ada ulasan
              </Text>
            </View>
          ) : (
            <FlatList
              data={product.review}
              keyExtractor={(item) => item.user.username}
              renderItem={({ item }) => <ReviewCard data={item} />}
            />
          )}
        </View>

        <View className="py-4 border-t border-gray-300">
          <Text className="text-2xl font-bold mb-2">Produk Lainnya</Text>

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

        <Text className="text-center font-bold text-blue-500 mb-12">
          Sudah menunjukan semua produk.
        </Text>
      </ScrollView>

      <View className="p-4 bg-white border-t border-gray-200">
  <View className="flex-row justify-center items-center gap-4">
    <TouchableOpacity
      className="w-[45%] bg-gray-200 rounded-xl py-3 items-center justify-center"
      onPress={() =>
        router.push({
          pathname: '/design',
          params: { isShortcut: "1", category: product.product_category }
        })
      }
    >
      <Text className="font-semibold">Custom Pakaian</Text>
    </TouchableOpacity>
    <TouchableOpacity
      className="w-[45%] bg-blue-500 rounded-xl py-3 items-center justify-center"
      onPress={() => setModalCart(true)}
    >
      <Text className="font-semibold text-white">Tambah Keranjang</Text>
    </TouchableOpacity>

  </View>
</View>

      <ModalCart
        product={product}
        modalCart={modalCart}
        setModalCart={setModalCart}
      />
    </>
  );
};

export default ProductDetailPage;
