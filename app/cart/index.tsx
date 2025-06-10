import CartCard from "@/components/ui/cart-card";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/utils/formatter";
import { useRouter } from "expo-router";
import { ChevronLeft, ShoppingCart } from "lucide-react-native";
import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CartPage = () => {
  const cart = useCartStore((state) => state.cart);
  const router = useRouter();

  const selectedCart = useCartStore((state) => state.selectedCart);
  const orderCart = useCartStore((state) => state.orderCart);

  const calculateTotal = () => {
    return selectedCart.reduce(
      (total, item) => total + item.price * item.product_quantity,
      0
    );
  };

  console.log(selectedCart)

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
                <View className="flex-row items-center">
                  <TouchableOpacity
                    className="w-6 h-6 border-2 border-blue-500 rounded mr-2 items-center justify-center"
                    onPress={() => orderCart(item)}
                  >
                    {selectedCart.includes(item) && (
                      <View className="w-4 h-4 bg-blue-500 rounded" />
                    )}
                  </TouchableOpacity>
                  <View className="flex-1">
                    <CartCard item={item} />
                  </View>
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
          {selectedCart.length > 0 ? (
            <TouchableOpacity
              className="bg-blue-500 rounded-xl py-3"
              onPress={() => router.push("/cart/checkout")}
            >
              <Text className="text-center text-white font-semibold">
                Pesanan ({selectedCart.length} item)
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity className="bg-gray-300 rounded-xl py-3" disabled>
              <Text className="text-center text-gray-500 font-semibold">
                Pilih item untuk dipesan
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  );
};

export default CartPage;
