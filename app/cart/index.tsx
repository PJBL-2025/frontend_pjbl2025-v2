import ModalCart from "@/components/modal-cart";
import ProductPreview from "@/components/ui/cart-card";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/utils/formatter";
import { useRouter } from "expo-router";
import { ChevronLeft, ShoppingCart } from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CartPage = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const cart = useCartStore((state) => state.cart);
  const router = useRouter();

  const toggleItemSelection = (itemId: number) => {
    setSelectedItems((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  const calculateTotal = () => {
    return cart
      .filter((item) => selectedItems.includes(item.id))
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
      <View className="flex-row items-center mt-2 p-4">
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-white font-bold text-base">
          Keranjang
        </Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1 bg-white rounded-t-2xl p-4 gap-4">
        <View className="">
          {cart.length === 0 ? (
            <View className="items-center justify-center py-8">
              <ShoppingCart size={48} color="#D1D5DB" />
              <Text className="text-gray-500 mt-4 text-center">
                Yahh.. keranjangnya masih kosong
              </Text>
            </View>
          ) : (
            <FlatList
              data={cart}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View>
                  <View className="flex-row items-center">
                    <TouchableOpacity
                      className="w-6 h-6 border-2 border-blue-500 rounded mr-2 items-center justify-center"
                      onPress={() => toggleItemSelection(item.id)}
                    >
                      {selectedItems.includes(item.id) && (
                        <View className="w-4 h-4 bg-blue-500 rounded" />
                      )}
                    </TouchableOpacity>
                    <View className="flex-1">
                      <ProductPreview item={item} />
                    </View>
                  </View>
                  <ModalCart product={item}/>
                </View>
              )}
            />
          )}
        </View>
      </ScrollView>

      {cart.length > 0 && (
        <View className="bg-white p-4 border-t border-gray-200">
          <View className="flex-row justify-between mb-4">
            <Text className="text-lg font-semibold">Total</Text>
            <Text className="text-lg font-bold">
              {formatPrice(calculateTotal())}
            </Text>
          </View>
          {selectedItems.length > 0 ? (
            <TouchableOpacity className="bg-blue-500 rounded-xl py-3">
              <Text className="text-center text-white font-semibold">
                Checkout ({selectedItems.length} items)
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="bg-gray-300 rounded-xl py-3"
              disabled={true}
            >
              <Text className="text-center text-gray-500 font-semibold">
                Select items to checkout
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  );
};

export default CartPage;
