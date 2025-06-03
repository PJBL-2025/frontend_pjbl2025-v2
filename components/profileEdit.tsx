import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Pencil } from "lucide-react-native";
// import { Popup } from 'components/Popup';
import { useRouter } from 'expo-router';
// import * as ImagePicker from 'expo-image-picker';

export default function ProfileEdit() {
    const navigation = useNavigation();
    const [showPopup, setShowPopup] = useState(false);
    const router = useRouter();

    const [image, setImage] = useState<string | null>(null);

    // const pickImage = async () => {
    //     // Request permission
    //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //     if (status !== 'granted') {
    //     alert('Permission to access gallery is required!');
    //     return;
    //     }

    //     const result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [1, 1],
    //         quality: 1,
    //       });

    //     if (!result.canceled) {
    //     setImage(result.assets[0].uri);
    //     }
    // };

    return (
        <LinearGradient
            colors={['#007AFF', '#D9EBFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="flex-1 px-4"
        >
            <SafeAreaView className="flex-1">

                {/* Header */}
                <View className="flex-row items-center mt-2 mb-6">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeft size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text className="flex-1 text-center text-white font-semibold text-base">
                        Edit Profile
                    </Text>
                    <View className="w-5" />
                </View>

                <View className='flex items-center justify-center align-middle'>
                    <View className="relative items-center justify-center">
                    {/* onPress={pickImage} */}
                        <View style={{
                                shadowColor: '#ffffff',
                                shadowOffset: { width: 0, height: 8 },
                                shadowOpacity: 1.0,
                                shadowRadius: 12,
                                elevation: 20,
                                borderRadius: 9999,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Image
                                source={image ? { uri: image } : require('assets/images/Profile/profile-dummy.png')}
                                className="w-[120px] h-[120px] rounded-full mb-2"
                            />
                        </View>
                        {/* <View className="absolute -translate-x-1/2 -translate-y-1/2">
                            <Pencil size={28} color="#FFFFFF" />
                        </View> */}
                    </View>
                    <Text className='text-white font-bold'>Change Profile Picture</Text>
                </View>
                {/* Form */}
                <View className="mt-6 justify-center">
                    <View className="bg-white p-6 rounded-3xl">

                        <Text className="text-gray-500 mb-4">
                            Profile Information
                        </Text>

                        {/* Username */}
                        <Text className="font-bold mb-1">Name</Text>
                        <TextInput
                            placeholder="Name Sebelumnya"
                            className="border border-gray-300 px-4 py-2 rounded-md mb-4"
                        />

                        {/* Username */}
                        <Text className="font-bold mb-1">Username</Text>
                        <TextInput
                            placeholder="@username sebelumnya"
                            className="border border-gray-300 px-4 py-2 rounded-md mb-4"
                        />
                        <Text className="font-bold mb-1">Password</Text>
                        <TextInput
                            placeholder="Password Sebelumnya"
                            className="border border-gray-300 px-4 py-2 rounded-md mb-4"
                        />
                        <Text className="text-gray-400 ml-2 mt-1 mb-8">
                            Don't forget to save before Exit
                        </Text>

                        {/* Submit Button */}
                        <View className='flex flex-row items-center justify-center gap-x-5'>
                            <TouchableOpacity className="bg-[#0ACF83] py-3 rounded-xl items-center mb-4 w-20">
                                <Text className="text-white font-semibold text-[16px]">Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setShowPopup(true)}
                                className="bg-[#BF3131] py-3 rounded-xl items-center mb-4 w-20"
                            >
                                <Text className="text-white font-semibold text-[16px]">Cancel</Text>
                            </TouchableOpacity>

                            {/* <Popup visible={showPopup}
                                onClose={() => setShowPopup(false)}
                                onConfirm={() => {setShowPopup(false); navigation.navigate();}}
                            /> */}
                        </View>
                    </View>
                </View>

            </SafeAreaView>
        </LinearGradient>
    );
}