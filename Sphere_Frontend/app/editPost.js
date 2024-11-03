import {  ActivityIndicator, TextInput, View, Pressable, Modal} from "react-native";
import React, { useState } from "react";
import { SendCircle, ImageIcon } from "../components/Icons";
import { Stack, useRouter } from "expo-router"; 

export default function EditPost() { 

  const [sending, setSending] = useState(false);
  const router = useRouter(); // Inicializa el router

  const sendPost = async () => {
    setSending(true);
    try {
      // Aquí va logica para editar a la Api

      console.log("Publicación editada");
      router.back();

    } catch (error) {
      console.error("Error al editar la publicación:", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Editar publicación",
          headerRight: () => (
            <Pressable
              onPress={sendPost}
              style={{
                backgroundColor: '#462E84',
                width: 43,
                height: 43,
                borderRadius: 21.5,
                justifyContent: 'center',
                alignItems: 'center'
              }}
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

      <View style={{ flex: 1, alignItems: 'center' }}>
        <TextInput
          placeholder={"Edita la descripción"} 
          style={{
            borderWidth: 1,
            borderColor: "white",
            padding: 10,            
            width: "90%", 
            textAlignVertical: "top",
          }}
          multiline
          numberOfLines={4}
        />

        <View style={{ marginTop: 20 }}>
          <ImageIcon size={300} color="gray" /> 
        </View>
      </View>

      <Modal transparent={true} visible={sending}>
        <View style={{ backgroundColor: 'black', flex: 1, opacity: 0.5, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color={"#fff"} size="large" />
        </View>
      </Modal>
    </View>
  );
}
