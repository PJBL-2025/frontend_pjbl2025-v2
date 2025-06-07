import CartIcon from "@/components/cart-icon";
import ModalCart from "@/components/modal-cart";
import ReviewCard from "@/components/ui/review-card";
import { mockProduct, mockReviews } from "@/constant/dummy-data";
import { formatDate, formatPrice } from "@/utils/formatter";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
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

const ProductDetail = () => {
  const [modalCart, setModalCart] = useState<boolean>(false);
  const router = useRouter();
  const product = mockProduct;
  const reviewData = mockReviews;

  return (
    <>
      <View className="flex-row items-center mt-2 p-4">
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-white font-semibold text-base">
          Detail Product
        </Text>
        <CartIcon />
      </View>

      <ScrollView className="flex-1 bg-white p-4 rounded-t-2xl">
        <View className="flex-row items-center gap-4">
          <View className="size-40">
            <Image
              src={product.product_images}
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
          <Text className="text-gray-500">Stok: {product.quantity} pcs</Text>
          <Text className="text-gray-500">Berat: {product.weight} kg</Text>
        </View>

        <View className="mb-4">
          <Text className="text-2xl font-bold mb-2">Ulasan</Text>
          <FlatList
            data={reviewData}
            keyExtractor={(item) => item.user.username}
            renderItem={({ item }) => <ReviewCard data={item} />}
          />
        </View>
      </ScrollView>

      <View className="flex-row p-4 bg-white border-t border-gray-200 items-center gap-2">
        <TouchableOpacity
          className="flex-1 bg-gray-200 rounded-xl py-3"
          onPress={() => setModalCart(true)}
        >
          <Text className="text-center font-semibold">Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 bg-blue-500 rounded-xl py-3">
          <Text className="text-center text-white font-semibold">Buy Now</Text>
        </TouchableOpacity>
        
        <TouchableOpacity>
          <View className="size-10 justify-center items-center border-2 rounded-xl">
            <Palette />
          </View>
        </TouchableOpacity>
      </View>

      <ModalCart
        product={product}
        modalCart={modalCart}
        setModalCart={setModalCart}
      />
    </>
  );
};

export default ProductDetail;
