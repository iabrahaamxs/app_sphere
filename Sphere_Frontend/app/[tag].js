import { Stack } from "expo-router";
import { FlatList, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import { PostApi } from "../api/postsApi";

export default function PostsTag() {
  const { tag } = useLocalSearchParams();
  const [filteredPosts, setFilteredPosts] = useState([]);

  const fetchData = async () => {
    if (tag) {
      const postsData = await PostApi.getPostsByTag(tag);
      setFilteredPosts(postsData);
    }
  };

  useEffect(() => {
    fetchData();
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
        data={filteredPosts}
        renderItem={({ item }) => (
          <View>
            <Post item={item} />
          </View>
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}
