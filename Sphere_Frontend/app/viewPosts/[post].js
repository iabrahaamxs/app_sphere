import { Stack } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function PostsUser() {
  const { post } = useLocalSearchParams();

  //   const [filteredPosts, setFilteredPosts] = useState([]);

  //   const fetchData = async () => {
  //     if (tag) {
  //       const postsData = await PostApi.getPostsByTag(tag);
  //       setFilteredPosts(postsData);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchData();
  //   }, [tag]);

  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {},
          headerTitle: `#${"hola"}`,
          headerShadowVisible: false,
        }}
      />
      {/* <FlatList
        data={filteredPosts}
        renderItem={({ item }) => (
          <View>
            <Post item={item} />
          </View>
        )}
        keyExtractor={(item, index) => index}
      /> */}
      <Text>{post}</Text>
    </View>
  );
}
