import ReviewCard from "@/components/ui/review-card";
import { mockProduct, mockReviews } from "@/constant/dummy-data";
import { formatDate, formatPrice } from "@/utils/formatter";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  Palette,
  ShoppingCart,
  Star,
  X,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ProductDetail = () => {
  const [modalCart, setModalCart] = useState<boolean>(false);
  const [size, setSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const router = useRouter();
  const product = mockProduct;
  const reviewData = mockReviews;

  const handleQuantityChange = (value: string) => {
    const numValue = parseInt(value.replace(/[^0-9]/g, ""));
    if (!isNaN(numValue) && numValue > 0) {
      setQuantity(numValue);
    }
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 0));
  };

  return (
    <>
      <View className="flex-row items-center mt-2 p-4">
        <TouchableOpacity>
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-white font-semibold text-base">
          Detail Product
        </Text>
        <TouchableOpacity className="relative">
          <ShoppingCart size={24} color="#FFFFFF" />
        </TouchableOpacity>
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
                <FontAwesome name="star" size={16} color='#FFD700'/>
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

      <Modal
        visible={modalCart}
        transparent
        animationType="slide"
        onRequestClose={() => setModalCart(false)}
      >
        <View className="flex-1 justify-end">
          <View className="rounded-t-2xl bg-white p-6 gap-4">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-xl font-bold">Shopping Cart</Text>
              <TouchableOpacity onPress={() => setModalCart(false)}>
                <X size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <View className="flex-row gap-4 items-center">
              <View className="size-36">
                <Image
                  src={product.product_images}
                  className="w-full h-full object-cover"
                />
              </View>
              <View className="gap-2">
                <Text className="text-2xl font-bold">
                  {formatPrice(product.price)}
                </Text>
                <Text className="text-gray-400">Stok: {product.quantity}</Text>
              </View>
            </View>

            <View className="gap-2 pt-4 border-t border-gray-300">
              <Text>Ukuran Baju</Text>
              <View className="flex-row flex-wrap gap-2">
                {product.product_size.map((sz) => (
                  <TouchableOpacity
                    key={sz}
                    className={`py-2 px-8 rounded-md ${
                      size === sz ? "bg-blue-400" : "bg-gray-200"
                    }`}
                    onPress={() => setSize(sz)}
                  >
                    <Text className={size === sz ? "text-white" : ""}>
                      {sz}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View className="flex-row justify-between items-center pt-4 border-t border-gray-300">
              <Text className="text-xl font-bold">Jumlah</Text>
              <View className="flex-row gap-4 items-center rounded-xl border border-gray-300 bg-white ">
                <TouchableOpacity onPress={decrementQuantity}>
                  <Text className="text-xl text-gray-700 px-4">-</Text>
                </TouchableOpacity>
                <TextInput
                  className="w-8 text-center text-base text-gray-700"
                  value={quantity.toString()}
                  onChangeText={handleQuantityChange}
                  keyboardType="numeric"
                  maxLength={2}
                />
                <TouchableOpacity onPress={incrementQuantity}>
                  <Text className="text-xl text-gray-700 px-4">+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              className={`rounded-xl py-3 ${
                quantity <= 0 ? "bg-blue-200" : "bg-blue-500"
              }`}
              onPress={() => setModalCart(false)}
              disabled={quantity <= 0 || size === undefined}
            >
              <Text className="text-white font-bold checkout text-center">
                Masukkan keranjang
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ProductDetail;
