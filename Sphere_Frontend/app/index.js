import { Login } from "../components/Login";
import { Bubbles } from "../components/Bubbles";
import { View } from "react-native";

export default function Index() {
  return (
    <View>
      <Bubbles />
      <Login />
    </View>
  );
}
