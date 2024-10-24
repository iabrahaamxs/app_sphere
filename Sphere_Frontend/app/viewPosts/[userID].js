import { Stack } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { PostApi } from "../../api/postsApi";
import Post from "../../components/Post";

export default function PostsUser() {
  const { userID } = useLocalSearchParams();
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState(false);
  const ref = useRef(null);

  const fetchData = async () => {
    if (userID) {
      const postsData = await PostApi.getPosts(userID);

      setPosts(postsData);
      setView(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userID]);

  if (!view) {
    return;
  }

  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {},
          headerTitle: `${posts[0].name}`,
          headerShadowVisible: false,
        }}
      />
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View>
            <Post item={item} />
          </View>
        )}
        keyExtractor={(item) => item.post_id}
      />
      <Text>{userID}</Text>
    </View>
  );
}
