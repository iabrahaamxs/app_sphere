import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Bubbles } from "../../components/Bubbles";
import { Eye, Eye_Off, Left, LockBold, LockIcon } from "../../components/Icons";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { validatePasswords } from "../../utils/Validations";
import { UserApi } from "../../api/userApi";
const icon = require("../../assets/sphereColor.png");
import * as SplashScreen from "expo-splash-screen";

export default function RestorePassword() {
  const [showPassword, setShowPassword] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { token } = useLocalSearchParams();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  const restore = async () => {
    setLoading(true);
    setErrorMessage("");

    const validate = validatePasswords(password, password2);
    if (validate) {
      setErrorMessage(validate);
      setLoading(false);
      return;
    }

    try {
      const res = await UserApi.restorePassword(token, password);

      if (res.error[0]) {
        setErrorMessage("Ha ocurrido un error, vuelve a intentarlo más tarde");
        setLoading(false);
        return;
      }

      setPasswordResetSuccess(true);
    } catch (error) {
      setErrorMessage("Ocurrió un error. Inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

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

      {!passwordResetSuccess && (
        <View>
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

          {errorMessage && (
            <Text className="text-red-700	self-center">{errorMessage}</Text>
          )}

          <Pressable
            onPress={restore}
            disabled={loading}
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
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white">Restablecer</Text>
            )}
          </Pressable>
        </View>
      )}

      {passwordResetSuccess && (
        <View className="p-2 self-center">
          <Text className="text-lime-500">
            Tu contraseña ha sido restablecida con éxito.
          </Text>
          <Pressable
            onPress={() => router.replace("/login")}
            className="mt-10 justify-center items-center self-center flex-row bg-[#462E84] rounded-[8px] w-[150] h-[40]"
          >
            <Left color="white" />
            <Text className="text-white ml-2">Iniciar sesión</Text>
          </Pressable>
        </View>
      )}
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
