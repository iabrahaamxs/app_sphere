import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function SignUp() {
  return (
    <View className="ml-4 mt-24">
      <Link href="/" className="text-blue-400">
        Iniciar sesion
      </Link>
      <Text>Aca el registrarse</Text>
    </View>
  );
}
