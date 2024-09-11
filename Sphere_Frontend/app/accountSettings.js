import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { Link, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import RadioGroup from "../components/RadioButton";
import * as ImagePicker from "expo-image-picker";
import { Pencil, Camera, UserName } from "../components/Icons";
import { getItem } from "../utils/AsyncStorage";
import { UserApi } from "../api/userApi";
import { CategorieApi } from "../api/categorieApi";

const User_icon = require("../assets/User_icon.png");

export default function SignUp2() {
  // radio button

  const [selectedValues, setSelectedValues] = useState(["3", "5", "6"]);

  const handleValueChange = (value) => {
    setSelectedValues((prevSelectedValues) =>
      prevSelectedValues.includes(value)
        ? prevSelectedValues.filter((v) => v !== value)
        : [...prevSelectedValues, value]
    );
  };

  const options = [
    { value: "1", label: "Acción" },
    { value: "2", label: "Aventura" },
    { value: "3", label: "Arcade" },
    { value: "4", label: "Deporte" },
    { value: "5", label: "Estrategía" },
    { value: "6", label: "Simulación" },
    { value: "7", label: "Mesa" },
    { value: "8", label: "Musicales" },
  ];

  const [imagen, setImagen] = useState(
    "https://variety.com/wp-content/uploads/2023/10/SuperMarioRunTA-e1697227587140.webp?w=1000&h=667&crop=1"
  );

  const User = {
    userName: "abrahaam",
    bio: "esta es mi bio actuaaaal, se puede editar en cualquier momento",
  };

  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const id = await getItem("id");
      const { bio, user_name, user_photo } = await UserApi.getProfile(id);
      const categoriesData = await CategorieApi.getCategories(id);
      const newArray = categoriesData.map((item) => item.value.toString());
      console.log(newArray);

      setBio(bio);
      setUserName(user_name);
      setImagen(user_photo);
      setSelectedValues(newArray);
    };

    fetchData();
  }, []);

  const upImage = async () => {
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //allowsMultipleSelection: false,
      //selectionLimit: 5,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 pl-1 bg-white ">
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {},
          headerTitle: "Configuración de cuenta",
          headerShadowVisible: false,
        }}
      />

      <View className="items-center justify-center self-center">
        {imagen ? (
          <Image
            source={{ uri: imagen }}
            style={{
              resizeMode: "cover",
              width: 130,
              height: 130,
              borderRadius: 99999,
              borderWidth: 2,
              borderColor: "#462E84",
            }}
          />
        ) : (
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
        )}
        <View className="w-8 h-8 absolute right-1.5	bottom-1 bg-white rounded-full items-center justify-center">
          <Pressable onPress={upImage}>
            <Camera />
          </Pressable>
        </View>
      </View>
      <Text className="self-center my-1">Editar foto de perfil</Text>

      <View className="flex-row items-center ml-3">
        <UserName />
        <TextInput
          style={[styles.input, { height: 40 }]}
          placeholder="Nombre de usuario"
          onChangeText={setUserName}
          value={userName}
        />
      </View>

      <View className="flex-row items-center ml-3">
        <Pencil />
        <TextInput
          style={styles.input}
          placeholder="Biografía"
          multiline={true}
          onChangeText={setBio}
          value={bio}
        />
      </View>

      <Text className="self-center my-2 text-[17px]	opacity-70">
        Selecciona las categorias de tus juegos favoritos
      </Text>

      <View>
        <RadioGroup
          options={options}
          selectedValues={selectedValues}
          onValueChange={handleValueChange}
        />
        {/* Puedes usar selectedOption en el resto de tu app */}
      </View>

      <Pressable
        onPress={() => console.log(selectedValues)}
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
    maxHeight: 120,
    margin: 12,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 6,
  },
});
