import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { router, Stack } from "expo-router";
import React, { useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import RadioGroup from "../components/RadioButton";
import * as ImagePicker from "expo-image-picker";
import {
  LockIcon,
  Pencil,
  Eye,
  Eye_Off,
  Calendar,
  Camera,
} from "../components/Icons";
import { UserApi } from "../api/userApi";
import { clear, getItem, setItem } from "../utils/AsyncStorage";
import { CategorieApi } from "../api/categorieApi";
import { uploadImage } from "../utils/cloudinary";
import { validatePasswords } from "../utils/Validations";

export default function SignUp2() {
  const [showPassword, setShowPassword] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
  const [selectedValues, setSelectedValues] = useState([]);
  const [show, setShow] = useState(false);
  const [bio, setBio] = useState("");
  const [photoBase, setPhotoBase] = useState(
    "https://res.cloudinary.com/dyfhxp9nh/image/upload/v1727979582/20240803_213228_zqzk2r.png"
  );
  const [photo, setPhoto] = useState("");
  const [date, setDate] = useState(new Date());
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let User = {};

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

  // radio button

  const handleValueChange = (value) => {
    setSelectedValues((prevSelectedValues) =>
      prevSelectedValues.includes(value)
        ? prevSelectedValues.filter((v) => v !== value)
        : [...prevSelectedValues, value]
    );
  };

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
      setPhoto(result.assets[0].uri);
    }
  };

  const createAccount = async () => {
    setLoading(true);

    const error = validatePasswords(password, password2);
    if (error) {
      setLoading(false);
      setErrorMessage(error);
      return;
    }

    User = await getItem("new-user");

    if (photo) {
      const res = await uploadImage(photo);
      User.user_photo = res.secure_url;
    } else {
      User.user_photo = photoBase;
    }

    User.bio = bio;
    User.password = password;
    User.birthdate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    const userCreated = await UserApi.register(User);

    if (userCreated.jwt) {
      await CategorieApi.create(
        {
          categories: selectedValues,
        },
        userCreated.jwt
      );
      await clear();
      await setItem("jwt", userCreated.jwt);
      await setItem("user_name", userCreated.user_name);
      await setItem("id", userCreated.user_id);
      router.replace("/");
    }
    setErrorMessage("");
    setLoading(false);
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
      <Text className="ml-4 pb-2">
        Crea una cuenta completando el siguiente formulario
      </Text>

      <View className="items-center justify-center self-center">
        <Image
          source={{ uri: photo ? photo : photoBase }}
          style={{
            resizeMode: "contain",
            width: 130,
            height: 130,
            borderRadius: 99999,
            borderWidth: 2,
            borderColor: "#462E84",
          }}
        />
        <View className="w-8 h-8 absolute right-1.5	bottom-1 bg-white rounded-full items-center justify-center">
          <Pressable onPress={upImage}>
            <Camera />
          </Pressable>
        </View>
      </View>

      <View className="flex-row items-center ml-3">
        <Pencil />
        <TextInput
          style={styles.input}
          placeholder="Biografía"
          onChangeText={setBio}
        />
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
          placeholder="Repite tu contraseña"
          keyboardType="default"
          secureTextEntry={showPassword2}
          onChangeText={setPassword2}
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

      <Text className="self-center mb-2 text-[17px]	opacity-60">
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

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <Pressable
        onPress={createAccount}
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
        <Text className="text-white">
          {loading ? <ActivityIndicator color="#fff" /> : "Crear Cuenta"}
        </Text>
      </Pressable>
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
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 8,
  },
});
