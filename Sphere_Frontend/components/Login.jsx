import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Eye_Off, LockIcon, MailIcon, UserIcon } from "./Icons";
const icon = require("../assets/sphereColor.png");

export function Login() {
  const insets = useSafeAreaInsets();
  return (
    <View>
      <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
        <View className="flex-row ml-8 mt-10 items-center">
          <Text className="text-xl font-bold">Iniciar sesion</Text>
          <UserIcon className="pl-2" />
        </View>

        <Text className="text-xs pl-8 ">Bienvenido !</Text>

        <View className="items-center mt-[60]">
          <Image
            source={icon}
            style={{ resizeMode: "contain", width: 140, alignItems: "center" }}
          />
        </View>

        <View>
          <View className="flex-row items-center ml-3">
            <MailIcon />
            <TextInput
              className="grow"
              style={styles.input}
              placeholder="Correo electronico"
              keyboardType="email-address"
            />
          </View>

          <View className="flex-row items-center ml-3">
            <LockIcon />
            <TextInput
              className="grow"
              style={styles.input}
              placeholder="Contraseña"
              keyboardType="default"
            />
            <View className="absolute right-6">
              <Eye_Off />
            </View>
          </View>

          <Link href="/recoverPassword" className="self-end pr-3">
            <Text>Olvidaste tu contraseña?</Text>
          </Link>

          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#513Ab1" : "#462E84",
                height: 40,
                margin: 8,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
              },
            ]}
          >
            <Text className="text-white">Iniciar Sesión</Text>
          </Pressable>

          <View className="flex-row justify-center mt-4">
            <Text>¿Aún no te has registrado?</Text>
            <Link href="/signUp" className="pl-1">
              <Text className="font-bold">Crear una cuenta</Text>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0.5,
    padding: 10,
  },
});
