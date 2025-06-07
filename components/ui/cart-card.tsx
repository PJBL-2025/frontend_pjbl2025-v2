import { Size } from "@/constant/enum";
import { ProductCart } from "@/interfaces/interfaces";
import { useCartStore } from "@/store/cartStore";
import { useModalStore } from "@/store/modalStroe";
import { formatPrice } from "@/utils/formatter";
import { Pen, X } from "lucide-react-native";
import { useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";

const ProductPreview = ({ item }: { item: ProductCart }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const removCart = useCartStore((state) => state.removeCart);

  const toggleModal = useModalStore((state) => state.toggleModal)

  const handleCancel = () => {
    setModalVisible(true);
  };

  const handleConfirm = () => {
    removCart(item.id);
    setModalVisible(false);
  };

  return (
    <View className="flex-row items-center mb-4 p-3 bg-gray-100 rounded-xl gap-3">
      <Image src={item.product_images} className="w-20 h-20 rounded-lg" />
      <View className="flex-1">
        <Text className="font-bold">{item.name}</Text>
          <Text className="text-gray-500">
            {item.color}, {Size[item.size || 0]}, {item.quantity} pcs
          </Text>
        <Text className="font-semibold">{formatPrice(item.price)}</Text>
      </View>

      <TouchableOpacity onPress={toggleModal}>
        <Pen size={20} color="#3b82f6"/>
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
              You sure want to remove this item from your cart?
            </Text>
            <View className="flex-row justify-center gap-x-5">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                <Text className="text-black font-semibold">No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirm}
                className="bg-red-500 px-4 py-2 rounded-lg"
              >
                <Text className="text-white font-semibold">Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProductPreview;
