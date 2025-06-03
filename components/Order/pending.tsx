import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft, ShoppingCart } from "lucide-react-native";
import { View, Text, TouchableOpacity, StatusBar, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductPreview from "components/ProductPreview";

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

const mockCartItems: CartItem[] = [
    {
        id: '1',
        product: {
            id: '1',
            name: 'TMA-2 HD Wireless',
            description: 'High-quality wireless headphones',
            price: 2000000,
            image: require('assets/images/headphone.png'),
            colors: ['Black', 'White'],
            rating: 4.7,
            reviewCount: 911,
            seller: {
                name: 'John Doe',
                avatar: require('assets/favicon.png')
            }
        },
        quantity: 1,
        selectedColor: 'Black'
    },
    {
        id: '2',
        product: {
            id: '2',
            name: 'TMA-2 HD Wireless',
            description: 'High-quality wireless headphones',
            price: 2000000,
            image: require('assets/images/headphone.png'),
            colors: ['Black', 'White'],
            rating: 4.7,
            reviewCount: 911,
            seller: {
                name: 'John Doe',
                avatar: require('assets/favicon.png')
            }
        },
        quantity: 2,
        selectedColor: 'White'
    }
];

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
};

export default function Pending() {
    const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const navigation = useNavigation();

    const removeFromCart = (itemId: string) => {
        setCartItems(prev => prev.filter(item => item.id !== itemId));
        setSelectedItems(prev => prev.filter(id => id !== itemId));
    };

    const calculateTotal = () => {
        return cartItems
            .filter(item => selectedItems.includes(item.id))
            .reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    const toggleItemSelection = (itemId: string) => {
        setSelectedItems(prev => {
            if (prev.includes(itemId)) {
                return prev.filter(id => id !== itemId);
            } else {
                return [...prev, itemId];
            }
        });
    };

    const handleCheckout = () => {
        // Here you would typically navigate to a checkout page or process the order
        const selectedProducts = cartItems.filter(item => selectedItems.includes(item.id));
        console.log('Checking out products:', selectedProducts);
        // For now, just show an alert
        alert('Proceeding to checkout...');
    };
    
    return (
        <LinearGradient
            colors={['#007AFF', '#D9EBFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="flex-1"
        >
            
            {/* Safe Area Context */}
            <SafeAreaView edges={['top', 'bottom']} className="flex-1 pt-4">
                
                {/* Header */}
                <View className="flex-row justify-between items-center px-4">
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <ChevronLeft size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <View className="flex flex-row gap-x-4 justify-center ">
                        <View className="relative">
                            <Text className="text-center text-white font-semibold text-base">
                                Pending
                            </Text>
                            <View className="absolute left-0 right-0 -bottom-1 h-[2px] bg-white shadow-white shadow-md" />
                        </View>
                        <TouchableOpacity className="" onPress={() => navigation.navigate("OnDeliver")}>
                            <Text className="text-center text-white font-semibold text-base">
                                On Progress
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="" onPress={() => navigation.navigate("Sent")}>
                            <Text className="text-center text-white font-semibold text-base">
                                Success
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="" onPress={() => navigation.navigate("Cancel")}>
                            <Text className="text-center text-white font-semibold text-base">
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View className="w-5" />
                </View>

                {/* Content */}
                <ScrollView className="flex-1 bg-white rounded-3xl mt-10 mb-10 mx-4">
                    <View className="p-4">
                        {cartItems.length === 0 ? (
                            <View className="items-center justify-center py-8">
                                <ShoppingCart size={48} color="#D1D5DB" />
                                <Text className="text-gray-500 mt-4">Your cart is empty</Text>
                            </View>
                        ) : (
                            cartItems.map((item) => (
                                <View key={item.id} className="mb-4">
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
                                            <ProductPreview
                                                item={item}
                                                onRemove={removeFromCart}
                                            />
                                        </View>
                                    </View>
                                </View>
                            ))
                        )}
                    </View>
                </ScrollView>

                {/* Bottom Checkout Section */}
                {cartItems.length > 0 && (
                    <View className="bg-white p-4 border-t border-gray-200">
                        <View className="flex-row justify-between mb-4">
                            <Text className="text-lg font-semibold">Total</Text>
                            <Text className="text-lg font-bold">{formatPrice(calculateTotal())}</Text>
                        </View>
                        {selectedItems.length > 0 ? (
                            <TouchableOpacity
                                className="bg-blue-500 rounded-xl py-3"
                                onPress={handleCheckout}
                            >
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
            </SafeAreaView>
        </LinearGradient>
    );
}
