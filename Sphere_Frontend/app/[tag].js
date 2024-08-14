import { Stack } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getPosts } from "./(tabs)/search";
import Post from "../components/Post";

export default function PostsTag() {
  const { tag } = useLocalSearchParams();
  const posts = getPosts();
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    if (tag) {
      const postsTag = posts.filter((obj) => {
        const regex = new RegExp(`\\b${tag}\\b`, "i"); // Crear una expresión regular que busca la palabra exacta
        return regex.test(obj.description); // Verificar si la palabra exacta está en el string del objeto
      });

      setFilteredData(postsTag);
    }
  }, [tag]);

  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {},
          headerTitle: `#${tag}`,
          headerShadowVisible: false,
        }}
      />
      <FlatList
        data={filteredData}
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
