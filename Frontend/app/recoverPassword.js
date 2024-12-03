import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Bubbles } from "../components/Bubbles";
import { Left, LockBold, MailIcon } from "../components/Icons";
import { Link, router } from "expo-router";
import { UserApi } from "../api/userApi";
import { useState } from "react";
const icon = require("../assets/sphereColor.png");

export default function RecoverPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const restorePassword = async () => {
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    const res = await UserApi.forgotPassword(email);

    res.ok ? setSuccessMessage(res.message) : setErrorMessage(res.message);

    setIsLoading(false);
  };
  return (
    <View className="">
      <Bubbles />
      <View className="flex-row items-center w-[100%] h-10 mt-12 ml-5">
        <Link href="/">
          <Left />
        </Link>

        <Text className="text-[20px] font-medium ml-4 mr-2">
          Recuperar contraseña
        </Text>
        <LockBold />
      </View>

      <View className="items-center mt-[120]">
        <Image
          source={icon}
          style={{ resizeMode: "contain", width: 140, alignItems: "center" }}
        />

        <Text>Escribe el correo electrónico asociado a tu cuenta</Text>
      </View>

      <View className="flex-row items-center ml-3 mt-4 mb-4">
        <MailIcon />
        <TextInput
          className="grow"
          style={styles.input}
          placeholder="Correo electronico"
          keyboardType="email-address"
          onChangeText={setEmail}
        />
      </View>

      {errorMessage && (
        <Text className="text-red-700	self-center">{errorMessage}</Text>
      )}
      {successMessage && (
        <Text className="text-lime-500	self-center">{successMessage}</Text>
      )}

      <Pressable
        onPress={restorePassword}
        disabled={isLoading}
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
        {isLoading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <Text className="text-white">Enviar</Text>
        )}
      </Pressable>
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
});
