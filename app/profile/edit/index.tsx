import { useNavigation } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileEdit = () => {
  const [image, setImage] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const navigation = useNavigation();

  return (
    <>
      <View className="flex-row items-center p-4 mb-6">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-white font-semibold text-base">
          Edit Profil
        </Text>
        <View className="w-5" />
      </View>

      <View className="flex items-center justify-center align-middle">
        <View className="relative items-center justify-center">
          <View
            style={{
              shadowColor: "#ffffff",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 1.0,
              shadowRadius: 12,
              elevation: 20,
              borderRadius: 9999,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={
                image
                  ? { uri: image }
                  : require("@/assets/images/profile-dummy.png")
              }
              className="w-[120px] h-[120px] rounded-full mb-2"
            />
          </View>
        </View>
      </View>
      {/* Form */}
      <View className="p-4 justify-center">
        <View className="bg-white p-6 rounded-3xl">
          <Text className="text-gray-500 mb-4">Informasi Profil</Text>

          {/* Username */}
          <Text className="font-bold mb-1">Nama</Text>
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
            Jangan lupa untuk SIMPAN sebelum keluar
          </Text>

          {/* Submit Button */}
          <View className="flex flex-row items-center justify-center gap-x-5">
            <TouchableOpacity
              onPress={() => {
                setSuccessModal(true);
                setTimeout(() => {
                  setSuccessModal(false);
                  navigation.goBack();
                }, 1000);
              }}
              className="bg-[#0ACF83] py-3 rounded-xl items-center mb-4 w-20"
            >
              <Text className="text-white font-semibold text-[16px]">
                Simpan
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowPopup(true)}
              className="bg-[#BF3131] py-3 rounded-xl items-center mb-4 w-20"
            >
              <Text className="text-white font-semibold text-[16px]">
                Tutup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showPopup}
        onRequestClose={() => setShowPopup(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/40">
          <View className="bg-white rounded-2xl px-6 py-8 w-[80%] shadow-lg">
            <Text className="text-center text-lg font-bold mb-4 text-gray-800">
              Keluar tanpa menyimpan?
            </Text>
            <Text className="text-center text-gray-500 mb-6">
              Apakah anda yakin ingin keluar tanpa menyimpan perubahan?
            </Text>
            <View className="flex-row justify-evenly space-x-4">
              <TouchableOpacity
                onPress={() => {
                  setShowPopup(false);
                  navigation.goBack();
                }}
                className="bg-[#BF3131] px-6 py-3 rounded-md"
              >
                <Text className="text-white font-semibold">Iya</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowPopup(false)}
                className="bg-gray-200 px-6 py-3 rounded-md"
              >
                <Text className="text-gray-700 font-semibold">Tidak</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={successModal}
        onRequestClose={() => setSuccessModal(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/40">
          <View className="bg-white rounded-2xl px-6 py-8 w-[75%] shadow-lg">
            <Text className="text-center text-lg font-bold mb-2 text-[#0ACF83]">
              Berhasil Menyimpan
            </Text>
            <Text className="text-center text-gray-600">
              Perubahan profil telah disimpan
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ProfileEdit;
