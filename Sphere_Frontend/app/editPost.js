import { router, Stack } from "expo-router";
import {
  ActivityIndicator,
  TextInput,
  View,
  Pressable,
  Keyboard,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { SendCircle } from "../components/Icons";
import { getItem } from "../utils/AsyncStorage";
import { PostApi } from "../api/postsApi";

export default function EditPost({ initialDescription }) {
  const [description, setDescription] = useState(initialDescription);
  const [sending, setSending] = useState(false);

  const sendPost = async () => {
    try {
      setSending(true);
      Keyboard.dismiss();
      const id = await getItem("id");

      await PostApi.update(id, description); // Asumiendo que tienes un método para actualizar la publicación

      router.replace("/"); // Regresa a la pantalla anterior después de editar
    } catch (error) {
      console.log(error);
      // Aquí puedes generar un mensaje de error para el usuario
    } finally {
      setSending(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {},
          headerTitle: "Editar publicación",
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
      
      {/* Campo de texto para editar la descripción */}
      <TextInput
        placeholder="Descripción"
        multiline={true}
        maxLength={200}
        className="px-4 py-1 max-h-36"
        value={description}
        onChangeText={(d) => setDescription(d)}
      />

      <Modal transparent={true} visible={sending}>
        <View className="bg-black flex-1 opacity-10"></View>
      </Modal>
    </View>
  );
}
