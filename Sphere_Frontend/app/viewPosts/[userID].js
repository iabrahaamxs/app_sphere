import { Stack } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { PostApi } from "../../api/postsApi";
import Post from "../../components/Post";

export default function PostsUser() {
  const { userID } = useLocalSearchParams();
  const [id, index] = userID.split("%"); // Separa id e índice
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState(false);
  const ref = useRef(null);

  const fetchData = async () => {
    if (id) {
      const postsData = await PostApi.getPosts(id);
      setPosts(postsData);
      setView(true);
    }
  };

  useEffect(() => {
    fetchData(); // Carga los datos de los posts
  }, [id]); // Dependencia de `id`

  useEffect(() => {
    if (ref.current && index != null && posts.length > 0) {
      ref.current.scrollToIndex({ index: parseInt(index, 10), animated: true });
    }
    console.log("troll");
    
  });

  if (!view) {
    return null;
  }

  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {},
          headerTitle: `${posts[0]?.name || "Posts"}`,
          headerShadowVisible: false,
        }}
      />
      <FlatList
        ref={ref}
        data={posts}
        renderItem={({ item }) => (
          <View>
            <Post item={item} />
          </View>
        )}
        keyExtractor={(item) => item.post_id}
        
        onScrollToIndexFailed={(info) => {
          setTimeout(() => {
            ref.current?.scrollToIndex({ index: info.index, animated: true });
          }, 500);
        }}
      />
    </View>
  );
}
