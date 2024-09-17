import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
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
import { compararObjetos } from "../utils/CompareObj";

const User_icon = require("../assets/User_icon.png");

export default function AccountSettings() {
  // radio button
  const [data, setData] = useState({});
  const [newData, setNewData] = useState({});
  //const [userName, setUserName] = useState("");
  //const [bio, setBio] = useState("");
  //const [id, setId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  //const [imagen, setImagen] = useState("");
  const [newImagen, setNewImagen] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  function removeCommonElements(array1, array2) {
    const elementsToRemove = new Set(array2);

    return array1.filter((element) => !elementsToRemove.has(element));
  }

  const handleValueChange = (value) => {
    setSelectedValues((prevSelectedValues) => {
      const newSelectedValues = prevSelectedValues.includes(value)
        ? prevSelectedValues.filter((v) => v !== value)
        : [...prevSelectedValues, value];

      setNewData({ ...newData, newArray: newSelectedValues.sort() });
      compareObj({ ...newData, newArray: newSelectedValues.sort() });

      return newSelectedValues;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const id = await getItem("id");
      const [{ bio, user_name, user_photo, user_id }, categoriesData] =
        await Promise.all([
          UserApi.getProfile(id),
          CategorieApi.getCategories(id),
        ]);
      const newArray = categoriesData.map((item) => item.value.toString());

      setData({
        user_id,
        user_photo,
        user_name,
        bio,
        newArray: newArray.sort(),
      });

      setNewData({
        user_id,
        user_photo,
        user_name,
        bio,
        newArray: newArray.sort(),
      });

      setSelectedValues(newArray);
      compareObj(newData);
    };

    fetchData();
  }, []);

  const upImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        setErrorMessage("Permiso denegado para acceder a la galería.");
        return;
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8, // Reduce calidad
      });
      if (!result.canceled) {
        setNewImagen(result.assets[0].uri);
        setIsDisabled(false);
      }
    } catch (error) {
      setErrorMessage("Error al cargar la imagen.");
    }
  };

  const update = async () => {
    setIsLoading(true);
    const categoriesOff = removeCommonElements(deselected, newData.newArray);

    let imageUrl = newData.user_photo;
    if (newImagen) {
      const response = await uploadImage(newImagen);
      imageUrl = response.secure_url;
    }

    const up = await UserApi.updateSettings(
      imageUrl,
      newData.user_name,
      newData.bio,
      newData.newArray,
      categoriesOff,
      newData.user_id
    );

    setData({
      user_id: newData.user_id,
      user_photo: imageUrl,
      user_name: newData.user_name,
      bio: newData.bio,
      newArray: newData.newArray.sort(),
    });

    if (up) {
      setErrorMessage("");
      setSuccessMessage(
        "Tu configuración de cuenta ha sido actualizada con éxito!!"
      );
    } else {
      setSuccessMessage("");
      setErrorMessage("No se pudo actualizar tu configuración de cuenta");
    }
    setIsDisabled(true);
    setIsLoading(false);
  };

  function compareObj(newdata) {
    if (!newdata.user_name) {
      setIsDisabled(true);
      return;
    }
    const bool = compararObjetos(data, newdata);

    setIsDisabled(bool);
  }

  return (
    <View className="flex-1 pl-1 bg-white ">
      {Object.keys(newData).length == 0 ? (
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
          <Pressable onPress={upImage} className="self-center rounded-full">
            <View className="items-center justify-center self-center">
              {newData.user_photo ? (
                <Image
                  source={{ uri: newData.user_photo }}
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
                <Camera />
              </View>
            </View>
          </Pressable>
          <Text className="self-center my-1">Editar foto de perfil</Text>

          <View className="flex-row items-center ml-3">
            <UserName />
            <TextInput
              style={[styles.input, { height: 40 }]}
              placeholder="Nombre de usuario"
              onChangeText={(text) => {
                setNewData({ ...newData, user_name: text });
                compareObj({ ...newData, user_name: text });
              }}
              value={newData.user_name}
            />
          </View>

          <View className="flex-row items-center ml-3">
            <Pencil />
            <TextInput
              style={styles.input}
              placeholder="Biografía"
              multiline={true}
              onChangeText={(text) => {
                setNewData({ ...newData, bio: text });
                compareObj({ ...newData, bio: text });
              }}
              value={newData.bio}
            />
          </View>

          <Text className="self-center my-2 text-[17px]	opacity-70">
            Selecciona las categorias de tus juegos favoritos
          </Text>

          <View>
            <RadioGroup
              options={options}
              selectedValues={newData.newArray}
              onValueChange={handleValueChange}
            />
            {/* Puedes usar selectedOption en el resto de tu app */}
          </View>

          {errorMessage && (
            <Text className="text-red-700	self-center">{errorMessage}</Text>
          )}
          {successMessage && (
            <Text className="text-lime-500	self-center">{successMessage}</Text>
          )}

          <Pressable
            onPress={update}
            disabled={isDisabled}
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
              isDisabled ? styles.disabledButton : null,
            ]}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text className="text-white">Actualizar</Text>
            )}
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
  disabledButton: {
    backgroundColor: "#BDBDBD",
  },
});
