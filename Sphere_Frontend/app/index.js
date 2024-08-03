import { Login } from "../components/Login";
import { Bubbles } from "../components/Bubbles";
import { View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 bg-white">
      <Bubbles />
      <Login />
    </View>
  );
}
