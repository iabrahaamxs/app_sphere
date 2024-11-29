import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Link, Stack } from "expo-router";
import React, { useState } from "react";
import { Eye, Eye_Off, LockIcon } from "../components/Icons";
import { validatePasswords } from "../utils/Validations";
import { UserApi } from "../api/userApi";
import { getItem } from "../utils/AsyncStorage";

export default function Security() {
  const [showPassword, setShowPassword] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
  const [showPassword3, setShowPassword3] = useState(true);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirPassword, setConfirPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const update = async () => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const validateNew = validatePasswords(newPassword, confirPassword);
    if (validateNew) {
      setErrorMessage(validateNew);
      setLoading(false);
      return;
    }

    try {
      const jwt = await getItem("jwt");
      const res = await UserApi.updatePassword(newPassword, password, jwt);

      if (res.error[0]) {
        setErrorMessage(res.error[0].message);
        setLoading(false);
        return;
      }

      setErrorMessage("");
      setSuccessMessage(res.message);
    } catch (error) {
      // Captura de cualquier error en la petición
      setErrorMessage("Ocurrió un error. Inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white ">
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {},
          headerTitle: "Seguridad",
          headerShadowVisible: false,
        }}
      />

      <View className="mt-[40%]">
        <Text className="text-base font-medium self-center mb-4">
          Editar contraseña actual
        </Text>
        <View className="flex-row items-center ml-3">
          <LockIcon />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            keyboardType="default"
            secureTextEntry={showPassword}
            onChangeText={setPassword}
          />
          <View className="absolute right-8">
            <Pressable
              onPress={() => {
                showPassword ? setShowPassword(false) : setShowPassword(true);
              }}
            >
              {showPassword ? <Eye_Off /> : <Eye />}
            </Pressable>
          </View>
        </View>

        <View className="flex-row items-center ml-3">
          <LockIcon />
          <TextInput
            style={styles.input}
            placeholder="Nueva contraseña"
            keyboardType="default"
            secureTextEntry={showPassword2}
            onChangeText={setNewPassword}
          />
          <View className="absolute right-8">
            <Pressable
              onPress={() => {
                showPassword2
                  ? setShowPassword2(false)
                  : setShowPassword2(true);
              }}
            >
              {showPassword2 ? <Eye_Off /> : <Eye />}
            </Pressable>
          </View>
        </View>

        <View className="flex-row items-center ml-3">
          <LockIcon />
          <TextInput
            style={styles.input}
            placeholder="Repite tu nueva contraseña"
            keyboardType="default"
            secureTextEntry={showPassword3}
            onChangeText={setConfirPassword}
          />
          <View className="absolute right-8">
            <Pressable
              onPress={() => {
                showPassword3
                  ? setShowPassword3(false)
                  : setShowPassword3(true);
              }}
            >
              {showPassword3 ? <Eye_Off /> : <Eye />}
            </Pressable>
          </View>
        </View>
      </View>
      {errorMessage && (
        <Text className="text-red-700	self-center">{errorMessage}</Text>
      )}
      {successMessage && (
        <Text className="text-lime-500	self-center">{successMessage}</Text>
      )}

      <Pressable
        onPress={update}
        disabled={loading}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#513Ab1" : "#462E84",
            height: 40,
            margin: 8,
            marginTop: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
          },
        ]}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white">Actualizar</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "85%",
    maxHeight: 40,
    margin: 12,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 6,
  },
});
