import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginPage = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="bg-blue-500 flex-1">
      <View className="flex-row items-center p-4 mb-6">
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-white font-bold text-base">
          Login
        </Text>
        <View className="w-6" />
      </View>

      <View className="bg-white p-4 m-4 rounded-xl gap-4">
        <View>
          <Text className="font-bold mb-1">Username</Text>
          <TextInput
            placeholder="Username "
            className="border border-gray-300 px-4 py-2 rounded-md"
          />
        </View>
        <View>
          <Text className="font-bold mb-1">Kata Sandi</Text>
          <TextInput
            placeholder="Kata Sandi"
            className="border border-gray-300 px-4 py-2 rounded-md"
          />
        </View>
        <TouchableOpacity className="bg-blue-500 py-3 rounded-xl items-center">
          <Text className="text-white font-semibold text-[16px]">Masuk</Text>
        </TouchableOpacity>
        <View className="flex-row gap-1">
          <Text className="">Belum punya akun?</Text>
          <TouchableOpacity className="flex justify-center items-center" onPress={() => router.push("/signup")}>
            <Text className="font-bold text-blue-500">Buat Akun</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;
