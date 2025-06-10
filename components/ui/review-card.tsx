import { Review } from "@/interfaces/interfaces";
import { formatDate } from "@/utils/formatter";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { Text, View } from "react-native";

const ReviewCard = ({ data }: { data: Review }) => {
  const renderStars = (rating: number) => {
    return (
      <View className="flex-row">
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesome key={star} name="star" size={16} color={star <= rating ? '#FFD700' : '#D1D5DB'} />
        ))}
      </View>
    );
  };

  return (
    <View className="border-t border-gray-200 py-4 gap-3">
      <View className="flex-row gap-3 items-center">
        <View className="size-10 rounded-full overflow-hidden justify-center items-center bg-blue-400">
          <Text className="text-white font-bold">{data.user.name[0]}</Text>
        </View>
        <View className="flex-1">
          <Text className="font-semibold">{data.user.name}</Text>
          <View className="flex-row items-center gap-x-2">
            {renderStars(data.star)}
            <Text className="text-xs text-gray-500">
              {formatDate(data.created_at)}
            </Text>
          </View>
        </View>
      </View>
      <Text className="text-gray-600">{data.comment}</Text>
    </View>
  );
};

export default ReviewCard;
