import { Stack } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { PostApi } from "../../api/postsApi";

export default function PostsUser() {
  const { userID } = useLocalSearchParams();

  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    if (userID) {
      const postsData = await PostApi.getPosts(userID);
      console.log("id", userID);

      setPosts(postsData);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userID]);

  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {},
          headerTitle: `${"mesi"}`,
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
      <Text>{userID}</Text>
    </View>
  );
}
