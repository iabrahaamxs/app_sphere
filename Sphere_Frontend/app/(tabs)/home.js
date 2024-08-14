import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FlatList, Image, Text, View } from "react-native";
import Post from "../../components/Post";
import { getPosts } from "./search";

export default function Home() {
  const posts = getPosts();
  return (
    <View>
      <StatusBar style="auto" />

      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#462E84",
          },
          headerTitle: "",
          headerShadowVisible: false,
          headerLeft: () => (
            <View className="w-[130%] h-10 items-center justify-center flex-row">
              <Image
                style={{
                  resizeMode: "contain",
                  width: 30,
                  height: 30,
                }}
                source={require("../../assets/logoTipoWhite.png")}
              />
              <Text className="text-white ml-1 text-base">PHERE</Text>
            </View>
          ),
        }}
      />

      <FlatList
        className="pt-2 bg-white "
        data={posts}
        renderItem={({ item }) => (
          <View>
            <Post item={item} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
