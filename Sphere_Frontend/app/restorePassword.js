import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { Bubbles } from "../components/Bubbles";
import {
  Eye,
  Eye_Off,
  Left,
  LockBold,
  LockIcon,
  MailIcon,
} from "../components/Icons";
import { Link } from "expo-router";
import { useState } from "react";
const icon = require("../assets/sphereColor.png");

export default function RestorePassword() {
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState("");
  const [showPassword2, setShowPassword2] = useState(true);
  const [password2, setPassword2] = useState("");
  return (
    <View className="">
      <Bubbles />
      <View className="flex-row items-center w-[100%] h-10 mt-12 ml-5">
        <Link href="/">
          <Left />
        </Link>

        <Text className="text-[20px] font-medium ml-4 mr-2">
          Restablecer contraseña
        </Text>
        <LockBold />
      </View>

      <View className="items-center mt-[120]">
        <Image
          source={icon}
          style={{ resizeMode: "contain", width: 140, alignItems: "center" }}
        />
      </View>

      <View className="flex-row items-center ml-3">
        <LockIcon />
        <TextInput
          className="grow"
          style={styles.input}
          placeholder="Nueva contraseña"
          keyboardType="default"
          secureTextEntry={showPassword}
          onChangeText={setPassword}
        />
        <View className="absolute right-6">
          <Pressable
            onPress={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <Eye_Off /> : <Eye />}
          </Pressable>
        </View>
      </View>
      <View className="flex-row items-center ml-3">
        <LockIcon />
        <TextInput
          className="grow"
          style={styles.input}
          placeholder="Confirma tu contraseña"
          keyboardType="default"
          secureTextEntry={showPassword2}
          onChangeText={setPassword2}
        />
        <View className="absolute right-6">
          <Pressable
            onPress={() => {
              setShowPassword2(!showPassword2);
            }}
          >
            {showPassword2 ? <Eye_Off /> : <Eye />}
          </Pressable>
        </View>
      </View>

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
        <Text className="text-white">Restablecer</Text>
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
