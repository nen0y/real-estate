import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { signInWithGoogle } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/providers/global-provider";
import { Redirect } from "expo-router";

const SignIn = () => {
  const { refetch, loading, isLoggedIn } = useGlobalContext();

  if (!loading && isLoggedIn) return <Redirect href="/" />;
  const handleLogin = async () => {
    const result = await signInWithGoogle();
    if (result) {
      refetch();
    } else {
      Alert.alert("Error", "Failed to login with Google");
    }
  };
  return (
    <SafeAreaView className="bg-white h-full ">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />

        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome to YuState
          </Text>
          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
            Let's get You Closer to {"\n"}{" "}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>

          <Text className="text-lg font-rubik text-black-200 text-center mt-12">
            Login to YuState with Google
          </Text>

          <TouchableOpacity
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5 flex flex-row justify-center items-center gap-2"
            onPress={handleLogin}
          >
            <Image
              source={icons.google}
              className="h-5 w-5"
              resizeMode="contain"
            />
            <Text className="text-lg font-rubik-medium text-black-300">
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
