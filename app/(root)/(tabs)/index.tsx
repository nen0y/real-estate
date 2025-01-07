import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex flex-1 justify-center items-center">
      <Link className="text-[24px] font-bold mb-6 font-rubik" href={"/sign-in"}>Sign In</Link>
      <Link href={"/explore"}>Explore</Link>
      <Link href={"/profile"}>Profile</Link>
      <Link href={"/properties/1"}>Property 1</Link>
    </View>
  );
}
