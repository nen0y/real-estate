import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import images from "@/constants/images";

interface Props {
  onPress?: () => void;
}

export const FeaturedCard = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col items-start w-[60px] h-[80px] relative"
    >
      <Image source={images.japan} className="size-full rounded-2xl" />
    </TouchableOpacity>
  );
};

export const Card = () => {
  return (
    <View>
      <Text>Card</Text>
    </View>
  );
};
