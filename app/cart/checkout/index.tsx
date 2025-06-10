import CartCard from "@/components/ui/cart-card";
import { addressMockup } from "@/constant/dummy-data";
import { Address, CheckoutProduct } from "@/interfaces/interfaces";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/utils/formatter";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Checkout = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [address, setAddress] = useState<Address>();

  const addressData = addressMockup;

  const selectedCart = useCartStore((state) => state.selectedCart);
  const clearOrder = useCartStore((state) => state.clearOrder);
  const removeCart = useCartStore((state) => state.removeCart);

  const router = useRouter();

  const isCustom = selectedCart.some((item) => item.type === "custom");

  const calculateTotal = () => {
    if (isCustom) {
      return selectedCart.reduce(
        (total, item) =>
          total + item.price * (item?.quantity || 0) + 2000 + 10000,
        0
      );
    }
    return selectedCart.reduce(
      (total, item) => total + item.price * (item?.quantity || 0) + 2000,
      0
    );
  };

  const handleSubmit: CheckoutProduct = {
    total_price: calculateTotal(),
    address_id: address?.id || 0,
    product_checkout: selectedCart,
  }

  console.log(handleSubmit)

  return (
    <>
      <View className="flex-row items-center mt-2 p-4">
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-white font-bold text-base">
          Order Produk
        </Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1 bg-white rounded-t-2xl p-4 gap-4">
        <View className="pt-4 pb-8 gap-2">
          <Text className="text-lg font-semibold">Pilih 1 Alamat</Text>
          <FlatList
            data={addressMockup}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="flex-row items-center gap-2 mb-2"
                onPress={() => setAddress(item)}
              >
                <TouchableOpacity className="w-6 h-6 border-2 border-blue-500 rounded mr-2 items-center justify-center">
                  {address?.id === item.id && (
                    <View className="w-4 h-4 bg-blue-500 rounded" />
                  )}
                </TouchableOpacity>
                <View className="bg-gray-200 p-2 flex-1 rounded-xl">
                  <Text className="font-bold">{item.address}</Text>
                  <Text>
                    {item.receiver_area}, {item.destination_code},{" "}
                    {item.zip_code}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        <View className="py-8 border-t border-gray-400 gap-1">
          <Text className="text-lg font-semibold">Produk yang dipesan</Text>
          <FlatList
            data={selectedCart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CartCard item={item} isOrder={true} />}
          />
        </View>

        <View className="py-8 border-t border-gray-400 gap-1">
          <Text className="text-lg font-semibold">Rincian Pembelian</Text>
          <View className="flex-row justify-between">
            <Text className="text-gray-500">Total Produk:</Text>
            <Text className="text-gray-500">
              {formatPrice(calculateTotal())}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-500">Harga Admin:</Text>
            <Text className="text-gray-500">{formatPrice(2000)}</Text>
          </View>
          {isCustom && (
            <View className="flex-row justify-between">
              <Text className="text-gray-500">Harga Sablon:</Text>
              <Text className="text-gray-500">{formatPrice(10000)}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View className="bg-white p-4 border-t border-gray-200">
        <View className="flex-row justify-between mb-4">
          <Text className="text-lg font-semibold">Total</Text>
          <Text className="text-lg font-bold">
            {formatPrice(calculateTotal())}
          </Text>
        </View>
        <TouchableOpacity
          className={`rounded-xl py-3 ${
            !address ? "bg-blue-200" : "bg-blue-500"
          }`}
          onPress={() => {
            clearOrder()
          }}
          disabled={!address}
        >
          <Text className="text-center text-white font-semibold">
            Pilih metode pembayaran
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Checkout;
