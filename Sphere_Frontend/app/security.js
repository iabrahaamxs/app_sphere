import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import { Link, Stack } from "expo-router";
import React, { useState } from "react";
import { Eye, Eye_Off, LockIcon } from "../components/Icons";

export default function Security() {
  const [showPassword, setShowPassword] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
  const [showPassword3, setShowPassword3] = useState(true);
  return (
    <View className="flex-1 pl-1 bg-white ">
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
          Editar contraseña actual{" "}
        </Text>
        <View className="flex-row items-center ml-3">
          <LockIcon />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            keyboardType="default"
            secureTextEntry={showPassword}
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
          />
          <View className="absolute right-8">
            <Pressable
              onPress={() => {
                showPassword3
                  ? setShowPassword3(false)
                  : setShowPassword3(true);
              }}
            >
              {showPassword2 ? <Eye_Off /> : <Eye />}
            </Pressable>
          </View>
        </View>
      </View>

      <Pressable
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
        <Text className="text-white">Actualizar</Text>
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
