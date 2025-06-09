import { Size } from "@/constant/enum";
import { ProductCart } from "@/interfaces/interfaces";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/utils/formatter";
import { useRouter } from "expo-router";
import { Pen, X } from "lucide-react-native";
import { useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import ModalCart from "../modal-cart";

const CartCard = ({
  item,
  isOrder = false,
}: {
  item: ProductCart;
  isOrder?: boolean;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCart, setModalCart] = useState<boolean>(false);
  const router = useRouter();

  const removCart = useCartStore((state) => state.removeCart);

  const handleCancel = () => {
    setModalVisible(true);
  };

  return (
    <View className="flex-row items-center mb-4 p-3 bg-gray-100 rounded-xl gap-3">
      <TouchableOpacity
        className="flex-row items-center flex-1 gap-3"
        onPress={() => router.push(`/product/${item.product_id}`)}
      >
        <Image src={item.product_images} className="w-20 h-20 rounded-lg" />
        <View className="flex-1">
          <Text className="font-bold">{item.name}</Text>
          <Text className="text-gray-500">
            {item.color}, {Size[item.size || 0]}, {item.quantity} pcs
          </Text>
          <Text className="font-semibold">{formatPrice(item.price)}</Text>
        </View>
      </TouchableOpacity>

      {!isOrder && (
        <>
          <TouchableOpacity onPress={() => setModalCart(true)}>
            <Pen size={20} color="#3b82f6" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCancel} className="p-2">
            <X size={20} color="#FF0000" />
          </TouchableOpacity>

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View className="flex-1 justify-center items-center bg-black/50">
              <View className="bg-white w-80 p-5 rounded-xl">
                <Text className="text-lg font-bold mb-4 text-center">
                  Kalian yakin untuk menghapus item ini di keranjang?
                </Text>
                <View className="flex-row justify-center gap-x-5">
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    className="bg-gray-300 px-4 py-2 rounded-lg"
                  >
                    <Text className="text-black font-semibold">Tidak</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      removCart(item.id);
                      setModalVisible(false);
                    }}
                    className="bg-red-500 px-4 py-2 rounded-lg"
                  >
                    <Text className="text-white font-semibold">Iya</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <ModalCart
            product={item}
            modalCart={modalCart}
            setModalCart={setModalCart}
            isUpdate={true}
          />
        </>
      )}
    </View>
  );
};

export default CartCard;
