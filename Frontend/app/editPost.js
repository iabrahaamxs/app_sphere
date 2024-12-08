import { ActivityIndicator, TextInput, View, Pressable, Modal, Image, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { SendCircle, ImageIcon } from "../components/Icons";
import { Stack, useRouter } from "expo-router"; 
import { useLocalSearchParams } from "expo-router";
import { getItem } from "../utils/AsyncStorage";  
import { PostApi } from "../api/postsApi";  

export default function EditPost() { 
  const { postId, userId, postDescription, photo } = useLocalSearchParams(); 
  const [sending, setSending] = useState(false);
  const [description, setDescription] = useState("");  
  const router = useRouter(); 

  const fetchData = async () => {
    try {
      const jwt = await getItem("jwt");  
      if (jwt) {
        setDescription(postDescription);  


      }
    } catch (error) {
      console.error("Error al obtener los detalles del post:", error);
    }
  };

  const sendPost = async () => {
    setSending(true);
    try {
      const jwt = await getItem("jwt"); 
      if (jwt && description) {
        
        const updateResponse = await PostApi.update(jwt, postId, description);

        if (updateResponse.ok) {
          router.back();  
        } else {
          console.error("Error al editar la publicación:", updateResponse.message);
        }
      }
    } catch (error) {
      console.error("Error al editar la publicación:", error);
    } finally {
      setSending(false);  
    }
  };

  useEffect(() => {
    fetchData();  
  }, [postId]);

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
          value={description} 
          onChangeText={(text) => setDescription(text)} 
          style={{
            borderWidth: 1,
            borderColor: "white",
            padding: 10,
            width: "90%",
            textAlignVertical: "top",
          }}
          multiline
          numberOfLines={4}
          maxLength={180}
        />
        <Text style={{ color: '#462E84'}}>
    {description.length}/180
  </Text>

        <View style={{ marginTop: 20 }}>
        <Image 
            source={{ uri: photo }}  
            style={{
              resizeMode: "cover",
              width: "99%",
              aspectRatio: 4 / 3,
              alignSelf: "center",
            }} 
          />
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
