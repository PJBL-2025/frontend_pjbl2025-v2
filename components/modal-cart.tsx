import { Size } from "@/constant/enum";
import { ProductCart } from "@/interfaces/interfaces";
import { useCartStore } from "@/store/cartStore";
import { useModalStore } from "@/store/modalStroe";
import { formatPrice } from "@/utils/formatter";
import { X } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type ModalTypeProps = {
  id: number;
  name: string;
  product_images: string;
  product_size: string[];
  price: number;
  quantity: number;
};

const ModalCart = ({ product }: { product: ModalTypeProps }) => {
  const [query, setQuery] = useState<string>("");
  const [size, setSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState<number>(0);

  const addToCart = useCartStore((state) => state.addToCart);
  const modalCart = useModalStore((state) => state.modal);
  const toggleModal = useModalStore((state) => state.toggleModal);

  console.log(modalCart)

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

  const cartHandle: ProductCart = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    product_id: product.id,
    name: product.name,
    product_images: product.product_images,
    product_size: product.product_size,
    product_quantity: product.quantity,
    price: product.price,
    quantity: quantity,
    size: size,
    color: query,
    type: "reguler",
  };

  return (
    <Modal
      visible={modalCart}
      transparent
      animationType="slide"
      onRequestClose={toggleModal}
    >
      <View className="flex-1 justify-end bg-black/40">
        <View className="rounded-t-2xl bg-white p-6 gap-4">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-xl font-bold">Shopping Cart</Text>
            <TouchableOpacity onPress={toggleModal}>
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
            <Text>Warna</Text>
            <View className="flex-row flex-wrap gap-2">
              <TextInput
                className="flex-1 border px-4 rounded-xl"
                value={query}
                onChangeText={setQuery}
              />
            </View>
          </View>

          <View className="gap-2 pt-4 border-t border-gray-300">
            <Text>Ukuran Baju</Text>
            <View className="flex-row flex-wrap gap-2">
              {product.product_size.map((sz: string) => {
                const szEnum = Size[sz as keyof typeof Size];
                return (
                  <TouchableOpacity
                    key={sz}
                    className={`py-2 px-8 rounded-md ${
                      size === szEnum ? "bg-blue-400" : "bg-gray-200"
                    }`}
                    onPress={() => setSize(szEnum)}
                  >
                    <Text className={size === szEnum ? "text-white" : ""}>
                      {sz}
                    </Text>
                  </TouchableOpacity>
                );
              })}
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
              quantity <= 0 || size === undefined
                ? "bg-blue-200"
                : "bg-blue-500"
            }`}
            onPress={() => {
              addToCart(cartHandle);
              toggleModal();
              setSize(null);
              setQuery("");
              setQuantity(0);
            }}
            disabled={quantity <= 0 || size === undefined}
          >
            <Text className="text-white font-bold checkout text-center">
              Masukkan keranjang
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCart;
