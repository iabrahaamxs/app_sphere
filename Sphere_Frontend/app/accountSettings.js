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
import { uploadImage } from "../utils/cloudinary";

const User_icon = require("../assets/User_icon.png");

export default function SignUp2() {
  // radio button

  const [selectedValues, setSelectedValues] = useState(["3", "5", "6"]);
  const [deselected, setDeselected] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
  ]);
  function removeCommonElements(array1, array2) {
    const elementsToRemove = new Set(array2);

    return array1.filter((element) => !elementsToRemove.has(element));
  }

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
  const [newImagen, setNewImagen] = useState("");

  const User = {
    userName: "abrahaam",
    bio: "esta es mi bio actuaaaal, se puede editar en cualquier momento",
  };

  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [id, setId] = useState("");
  const [error, setError] = useState(false);
  const [finish, setFinish] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const id = await getItem("id");
      const { bio, user_name, user_photo, user_id } = await UserApi.getProfile(
        id
      );
      const categoriesData = await CategorieApi.getCategories(id);
      const newArray = categoriesData.map((item) => item.value.toString());

      setBio(bio);
      setUserName(user_name);
      setId(user_id);
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
      setNewImagen(result.assets[0].uri);
    }
  };

  const update = async () => {
    const categoriesOff = removeCommonElements(deselected, selectedValues);

    if (newImagen) {
      const response = await uploadImage(newImagen);
      //aqui enviar url a la bbdd

      const up = await UserApi.updateSettings(
        response.secure_url,
        userName,
        bio,
        selectedValues,
        categoriesOff,
        id
      );

      up ? setFinish(true) : setError(true);

      return;
    }

    console.log(
      imagen,
      userName,
      bio,
      selectedValues,
      res,
      id,
      "sin imagen en la nube"
    );
  };

  return (
    <View className="flex-1 pl-1 bg-white ">
      {userName === "" ? (
        <></>
      ) : (
        <View>
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

          {error ? (
            <Text className="text-red-700	self-center">
              No se pudo actualizar tu configuración de cuenta
            </Text>
          ) : (
            <></>
          )}

          {finish ? (
            <Text className="text-lime-500	self-center">
              Tu configuración de cuenta ha sido actualizada con éxito!!
            </Text>
          ) : (
            <></>
          )}

          <Pressable
            onPress={update}
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
      )}
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
