import { router, Stack } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Modal,
  Pressable,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SendCircle } from "../components/Icons";
import * as ImagePicker from "expo-image-picker";
import { getItem } from "../utils/AsyncStorage";
import { uploadImage } from "../utils/cloudinary";
import { PostApi } from "../api/postsApi";

export default function CreatePost() {
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState();
  const [sending, setSending] = useState(false);

  const upImage = async () => {
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    } else {
      router.back();
    }
  };

  useEffect(() => {
    upImage();
  }, []);

  const sendPost = async () => {
    try {
      setSending(true);
      Keyboard.dismiss();
      const id = await getItem("id");

      const response = await uploadImage(photo);

      await PostApi.create(id, description, response.secure_url);

      router.replace("/");
    } catch (error) {
      console.log(error);
      // aca se puede generar un mensaje de error para el usuario
    } finally {
      setSending(false);
    }
  };
  return (
    <View className="flex-1 bg-white ">
      {photo ? (
        <>
          <Stack.Screen
            options={{
              headerShown: true,
              headerStyle: {},
              headerTitle: "Nueva publicación",
              headerRight: () => (
                <Pressable
                  onPress={sendPost}
                  className="bg-[#462E84] w-[43] h-[43] rounded-full justify-center items-center"
                >
                  {sending ? (
                    <ActivityIndicator color={"#fff"} />
                  ) : (
                    <SendCircle color="#fff" />
                  )}
                </Pressable>
              ),
              headerShadowVisible: false,
            }}
          />
          <TextInput
            placeholder="Descripción"
            multiline={true}
            maxLength={200}
            className="px-4 py-1 max-h-36"
            onChangeText={(d) => setDescription(d)}
          />

          <Image
            source={{
              uri: photo,
            }}
            style={{
              resizeMode: "cover",
              width: "100%",
              aspectRatio: 4 / 3,
            }}
          />

          <Modal transparent={true} visible={sending}>
            <View className="bg-black flex-1 opacity-10"></View>
          </Modal>
        </>
      ) : null}
    </View>
  );
}
