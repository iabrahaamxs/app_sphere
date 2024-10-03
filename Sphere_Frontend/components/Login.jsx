import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { Eye, Eye_Off, LockIcon, MailIcon, UserIcon } from "./Icons";
import { UserApi } from "../api/userApi";
import { setItem } from "../utils/AsyncStorage";
import { validateInputsLogin } from "../utils/Validations";
const icon = require("../assets/sphereColor.png");

export function Login() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    const validationError = validateInputsLogin(email, password);

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const auth = await UserApi.login({
        email: email.toLowerCase(),
        password: password,
      });

      if (auth.jwt) {
        await setItem("jwt", auth.jwt);
        await setItem("user_name", auth.user_name);
        await setItem("id", auth.user_id);
        router.replace("/");
      } else {
        setErrorMessage(
          "Credenciales inválidas, por favor verifica tus datos."
        );
      }
    } catch (error) {
      setErrorMessage("Error al iniciar sesión, por favor intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
            onChangeText={setEmail}
          />
        </View>

        <View className="flex-row items-center ml-3">
          <LockIcon />
          <TextInput
            className="grow"
            style={styles.input}
            placeholder="Contraseña"
            keyboardType="default"
            secureTextEntry={showPassword}
            onChangeText={setPassword}
          />
          <View className="absolute right-6">
            <Pressable
              onPress={() => {
                showPassword ? setShowPassword(false) : setShowPassword(true);
              }}
            >
              {showPassword ? <Eye_Off /> : <Eye />}
            </Pressable>
          </View>
        </View>

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <Link href="/recoverPassword" className="self-end pr-3">
          <Text>Olvidaste tu contraseña?</Text>
        </Link>

        <Pressable
          style={({ pressed }) => ({
            backgroundColor: pressed ? "#513Ab1" : "#462E84",
            height: 40,
            margin: 8,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
          })}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white">Iniciar Sesión</Text>
          )}
        </Pressable>

        <View className="flex-row justify-center mt-4">
          <Text>¿Aún no te has registrado?</Text>
          <Link href="/signUp" className="pl-1">
            <Text className="font-bold">Crear una cuenta</Text>
          </Link>
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
    borderRadius: 6,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 8,
  },
});
