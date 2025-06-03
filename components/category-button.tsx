import React from "react";
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";

type categoryButtonProps = {
  icon: ImageSourcePropType;
  label: string;
};

const CategoryButton = ({ icon, label }: categoryButtonProps) => {
  return (
    <TouchableOpacity className="items-center justify-center mx-2 self-center">
      <View className="w-16 h-16 bg-gray-100 rounded-full items-center justify-center mb-1">
        <Image source={icon} className="w-14 h-14"/>
      </View>
      <Text className="text-xs text-white">{label}</Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;
