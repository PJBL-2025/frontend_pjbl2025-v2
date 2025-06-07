import { useCartStore } from "@/store/cartStore";
import { useRouter } from "expo-router";
import { ShoppingCart } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const CartIcon = () => {
  const router = useRouter();
  const cartLength = useCartStore((state) => state.cartLength());
  return (
    <TouchableOpacity className="relative" onPress={() => router.push("/cart")}>
      {cartLength > 0 && (
        <View
          className={`absolute bg-red-400 z-[1] flex justify-center items-center rounded-full -right-2 -top-2 ${
            cartLength > 99 ? "" : "size-5"
          }`}
        >
          <Text className="text-sm text-white font-bold">
            {cartLength < 99 ? cartLength : "99+"}
          </Text>
        </View>
      )}
      <ShoppingCart color="white" />
    </TouchableOpacity>
  );
};

export default CartIcon;
