import { Text, TouchableOpacity, View, Image } from "react-native";
import { useState } from "react";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: any;
    colors: string[];
    rating: number;
    reviewCount: number;
    seller: {
        name: string;
        avatar: any;
    };
}

interface CartItem {
    id: string;
    product: Product;
    quantity: number;
    selectedColor: string;
}

interface ProductPreviewProps {
    item: CartItem;
    onCheck: (id: string) => void;
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
};

const ProductProgress = ({ item, onCheck }: ProductPreviewProps) => {
    return (
        <View className="flex-row items-center justify-between mb-4 p-4 bg-white rounded-2xl shadow-sm">
            
            {/* Gambar Produk */}
            <Image
                source={item.product.image}
                className="w-14 h-14 rounded-lg"
                resizeMode="contain"
            />

            {/* Detail Produk */}
            <View className="flex-1 px-4">
                <Text className="text-base font-semibold text-black">
                    {item.product.name}
                </Text>
                <Text className="text-sm font-bold text-black">
                    {formatPrice(item.product.price * item.quantity)}
                </Text>
                <Text className="text-xs text-gray-500 mt-1">On Process</Text>
            </View>

            {/* Tombol Check */}
            <TouchableOpacity
                onPress={() => onCheck(item.id)}
                className="border border-black px-4 py-1.5 rounded-lg"
            >
                <Text className="text-black font-medium text-sm">Check</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProductProgress;