import { Stack } from "expo-router";
import { FlatList, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import Post from "../components/Post";

export default function PostsUser() {
  const { postsString, index, title } = useLocalSearchParams();
  const ref = useRef(null);

  const posts = postsString ? JSON.parse(postsString) : [];
  const startIndex = parseInt(index, 10);

  useEffect(() => {
    if (ref.current && startIndex >= 0) {
      setTimeout(() => {
        ref.current?.scrollToIndex({ index: startIndex, animated: false });
      }, 0);
    }
  }, [startIndex, posts]);

  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: `${title}`,
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
        keyExtractor={(item, index) => index.toString()}
        onScrollToIndexFailed={(info) => {
          setTimeout(() => {
            ref.current?.scrollToIndex({
              index: info.index,
              animated: false,
            });
          }, 0);
        }}
      />
    </View>
  );
}
