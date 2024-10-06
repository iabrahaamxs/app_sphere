import { Stack } from "expo-router";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { SendCircle } from "../components/Icons";

export default function CreatePost() {
  const [description, setDescription] = useState();

  const sendPost = async () => {
    console.log(description);
  };
  return (
    <View className="flex-1 bg-white ">
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {},
          headerTitle: "Nueva publicación",
          headerRight: () => (
            <Pressable onPress={sendPost}>
              <SendCircle size={45} color={"#462E84"} />
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
          uri: "https://upload.wikimedia.org/wikipedia/commons/7/74/Posts_on_the_saltmarsh%2C_Warton_Sands_-_geograph.org.uk_-_1658558.jpg",
        }}
        style={{
          resizeMode: "cover",
          width: "100%",
          aspectRatio: 4 / 3,
        }}
      />
    </View>
  );
}
