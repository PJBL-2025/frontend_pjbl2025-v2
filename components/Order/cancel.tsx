import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft } from "lucide-react-native";
import { View, Text, TouchableOpacity, StatusBar, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCancel from "components/ProductCancel";

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
  
  interface SentProps {
    cartItems: CartItem[];
  }
  
export default function Cancel() {
    const navigation = useNavigation();
    
    // Dummy data
    const [cartItems, setCartItems] = useState([
        {
            id: '1',
            product: {
                id: '1',
                name: 'TMA-2 Comfort Wireless',
                description: 'High-quality headphones',
                price: 2700000, // dalam IDR
                image: require('assets/images/headphone.png'),
                colors: ['Black', 'White'],
                rating: 4.5,
                reviewCount: 120,
                seller: {
                    name: 'Audio Store',
                    avatar: null,
                },
            },
            quantity: 1,
            selectedColor: 'Black',
        },
        {
            id: '2',
            product: {
                id: '2',
                name: 'TMA-2 Comfort Wireless',
                description: 'High-quality headphones',
                price: 20000000, // dalam IDR
                image: require('assets/images/headphone.png'),
                colors: ['Black', 'White'],
                rating: 4.5,
                reviewCount: 120,
                seller: {
                    name: 'Audio Store',
                    avatar: null,
                },
            },
            quantity: 1,
            selectedColor: 'Black',
        },
        {
            id: '3',
            product: {
                id: '3',
                name: 'TMA-2 Comfort Wireless',
                description: 'High-quality headphones',
                price: 755000, // dalam IDR
                image: require('assets/images/headphone.png'),
                colors: ['Black', 'White'],
                rating: 4.5,
                reviewCount: 120,
                seller: {
                    name: 'Audio Store',
                    avatar: null,
                },
            },
            quantity: 1,
            selectedColor: 'Black',
        },
        {
            id: '4',
            product: {
                id: '4',
                name: 'TMA-2 Comfort Wireless',
                description: 'High-quality headphones',
                price: 755000, // dalam IDR
                image: require('assets/images/headphone.png'),
                colors: ['Black', 'White'],
                rating: 4.5,
                reviewCount: 120,
                seller: {
                    name: 'Audio Store',
                    avatar: null,
                },
            },
            quantity: 1,
            selectedColor: 'Black',
        },
    ]);

    // Handler untuk menghapus item
    const handleRemove = (id :string) => {
        const filteredItems = cartItems.filter((item: any) => item.id !== id);
        setCartItems(filteredItems);
    };

    // Handler untuk mengecek status
    const handleCheck = (id :string) => {
        console.log("Checked item with id: ", id);
    };
    return (
        <LinearGradient
            colors={['#007AFF', '#D9EBFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="flex-1 px-4"
        >
            
            {/* Safe Area Context */}
            <SafeAreaView edges={['top', 'bottom']} className="flex-1 pt-4">
                
                {/* Header */}
                <View className="flex-row justify-between items-center">
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <ChevronLeft size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <View className="flex flex-row gap-x-4 justify-center ">
                        <TouchableOpacity className="" onPress={() => navigation.navigate("Pending")}>
                            <Text className="text-center text-white font-semibold text-base">
                                Pending
                            </Text>
                            
                        </TouchableOpacity>
                        <TouchableOpacity className="" onPress={() => navigation.navigate("OnDeliver")}>
                            <Text className="text-center text-white font-semibold text-base">
                                On Progress
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className=""onPress={() => navigation.navigate("Sent")}>
                            <Text className="text-center text-white font-semibold text-base">
                                Success
                            </Text>
                        </TouchableOpacity>
                        <View className="">
                            <Text className="text-center text-white font-semibold text-base">
                                Cancel
                            </Text>
                            <View className="absolute left-0 right-0 -bottom-1 h-[2px] bg-white shadow-white shadow-md" />
                        </View>
                    </View>
                    <View className="w-5" />
                </View>
                <ScrollView className="mt-4">
                    {cartItems.map((item) => (
                        <ProductCancel key={item.product.id} item={item} />
                    ))}
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}
