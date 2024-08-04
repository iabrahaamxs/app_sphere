import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { Link, Stack } from "expo-router";
import { useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import {
  UserIcon,
  LockIcon,
  Pencil,
  Eye,
  Eye_Off,
  Calendar,
} from "../components/Icons";

const User_icon = require("../assets/User_icon.png");

export default function SignUp2() {
  const [showPassword, setShowPassword] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    setShow(true);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      maximumDate: new Date(),
      mode: currentMode,
      is24Hour: false,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <View className="flex-1 pl-1 bg-white">
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {},
          headerTitle: "Crear cuenta",
          headerShadowVisible: false,
        }}
      />
      <Text className="ml-4">
        Crea una cuenta completando el siguiente formulario
      </Text>

      <View className="items-center justify-center w-[100%] h-[170]">
        <Image
          source={User_icon}
          style={{
            resizeMode: "contain",
            width: 130,
            height: 130,
            borderRadius: 99999,
            borderWidth: 2,
            borderColor: "#462E84",
          }}
        />
        <Text>Foto de perfil</Text>
      </View>

      <View className="flex-row items-center ml-3">
        <Pencil />
        <TextInput style={styles.input} placeholder="Biografía" />
      </View>

      <View className="flex-row items-center ml-3">
        <Calendar />
        <Pressable style={styles.input} onPress={showDatepicker}>
          {show ? (
            <Text> {date.toLocaleDateString()}</Text>
          ) : (
            <Text className="opacity-50">Fecha de nacimiento</Text>
          )}
        </Pressable>
      </View>

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
          placeholder="Repite tu contraseña"
          keyboardType="default"
          secureTextEntry={showPassword2}
        />
        <View className="absolute right-8">
          <Pressable
            onPress={() => {
              showPassword2 ? setShowPassword2(false) : setShowPassword2(true);
            }}
          >
            {showPassword2 ? <Eye_Off /> : <Eye />}
          </Pressable>
        </View>
      </View>

      <Text>Selecciona las categorias de tus juegos favoritos</Text>

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
        <Text className="text-white">Crear Cuenta</Text>
      </Pressable>

      <View className="flex-row justify-center mt-4">
        <Text>¿Ya tiene una cuenta?</Text>
        <Link href="/" className="pl-1">
          <Text className="font-bold">Inicia sesión</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "85%",
    height: 40,
    margin: 12,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 6,
  },
});
