import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft } from "lucide-react-native";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductProgress from "../productProgress";

export default function OnDeliver() {
    const navigation = useNavigation();

    // Dummy data
    const [cartItems] = useState([
        {
            id: '1',
            product: {
                id: '1',
                name: 'TMA-2 Comfort Wireless',
                description: 'High-quality headphones',
                price: 2700000,
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
                price: 20000000,
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

    const handleCheck = (id: string) => {
        console.log("Checked item with id: ", id);
    };

    return (
        <LinearGradient
            colors={['#007AFF', '#D9EBFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="flex-1 px-4"
        >
            <SafeAreaView edges={['top', 'bottom']} className="flex-1 pt-4">
                {/* Header */}
                <View className="flex-row justify-between items-center">
                    <TouchableOpacity >
                        <ChevronLeft size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <View className="flex flex-row gap-x-4 justify-center ">
                        <TouchableOpacity>
                            <Text className="text-center text-white font-semibold text-base">
                                Pending
                            </Text>
                        </TouchableOpacity>
                        <View>
                            <Text className="text-center text-white font-semibold text-base">
                                On Progress
                            </Text>
                            <View className="absolute left-0 right-0 -bottom-1 h-[2px] bg-white shadow-white shadow-md" />
                        </View>
                        <TouchableOpacity>
                            <Text className="text-center text-white font-semibold text-base">
                                Success
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text className="text-center text-white font-semibold text-base">
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View className="w-5" />
                </View>

                <ScrollView className="mt-4">
                    {cartItems.map((item) => (
                        <ProductProgress
                            key={item.id}
                            item={item}
                            onCheck={handleCheck}
                        />
                    ))}
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}
