import PageWrapper from "@/components/pageWrapper";
import { images } from "@/constant/images";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  CircleHelp,
  MessageCircle,
  Pencil,
} from "lucide-react-native";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const router = useRouter();
  const NomorHP = "62895635004580";

  return (
    <PageWrapper>
      <View>
        <View className="flex-row items-center justify-between mt-2 mb-6 px-4">
          <Text className="flex-1 text-center text-white text-lg font-semibold">
            Hello Username👋
          </Text>
        </View>

        <View className="bg-white rounded-2xl flex-row items-center justify-between mb-5 mx-4 p-4 shadow-[0px_20px_20px_10px_#000000]">
          <View className="flex-row gap-6 items-center">
            <View className="size-16">
              <Image
                source={images.profile}
                className="w-full h-full rounded-full"
              />
            </View>

            <View className="">
              <Text className="text-[23px] font-bold">
                Nama
              </Text>
              <Text className="text-[15px] font-bold text-[#7f7f7fa4]">
                @username
              </Text>
            </View>
          </View>

          <TouchableOpacity className="" onPress={() => router.push('/profile/profileEditPage')}>
            <Pencil size={25} color="#000000" />
          </TouchableOpacity>
        </View>

        <View className="bg-white h-[169px] w-full mb-4 p-2 justify-evenly">
          <View>
          <Text className="text-[#697078] font-medium">Pesanan saya</Text>
          </View>
          <View className="flex flex-row gap-x-8 justify-center">
            <View className="flex items-center">
              <TouchableOpacity className="border-2 border-blue-500 rounded-xl p-2" onPress={() => router.push('/transaction?orderStatus=pending')}>
                <Image source={images.notpaid} className="w-12 h-12" />
              </TouchableOpacity>
              <Text className="pt-3">Pending</Text>
            </View>
            <View className="flex items-center">
              <TouchableOpacity className="border-2 border-blue-500 rounded-xl p-2" onPress={() => router.push('/transaction?orderStatus=processing')}>
                <Image source={images.deliver} className="w-12 h-12" />
              </TouchableOpacity>
              <Text className="pt-3">On Delivery</Text>
            </View>
            <View className="flex items-center">
              <TouchableOpacity className="border-2 border-blue-500 rounded-xl p-2" onPress={() => router.push('/transaction?orderStatus=success')}>
                <Image source={images.sent} className="w-12 h-12" />
              </TouchableOpacity>
              <Text className="pt-3">Sent</Text>
            </View>
          </View>
        </View>
        <View className="bg-white py-10 gap-y-3 p-2">
          <TouchableOpacity
            className="flex flex-row items-center gap-x-2"
            onPress={() => Linking.openURL(`https://wa.me/${NomorHP}`)}
          >
            <CircleHelp size={25} color="#000000" />
            <Text>Pusat Bantuan</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row items-center gap-x-2">
            <MessageCircle size={25} color="#000000" />
            <Text>Chat Dengan Toko</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PageWrapper>
  );
}
