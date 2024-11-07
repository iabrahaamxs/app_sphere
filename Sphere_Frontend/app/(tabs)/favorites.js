import {
  Pressable,
  Text,
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCallback, useEffect, useState } from "react";
import { PostApi } from "../../api/postsApi";
import Post from "../../components/Post";
import { getItem } from "../../utils/AsyncStorage";

export default function Favorites() {
  const insets = useSafeAreaInsets();
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await fetchData();
      } catch (error) {
        console.log("Error during app initialization:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initializeApp();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [fetchData]);

  const fetchData = useCallback(async () => {
    const jwt = await getItem("jwt");
    const favoritesData = await PostApi.getFavorites(jwt);
    setPosts(favoritesData);
  }, []);

  if (isLoading) {
    return (
      <View className="pt-[10%] ">
        <ActivityIndicator color={"#000"} size="large" />
      </View>
    );
  }

  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {},
          headerTitle: "    Favoritos",
          headerShadowVisible: false,
          headerLeft: () => "",
        }}
      />

      <FlatList
        data={posts}
        renderItem={({ item }) => <Post item={item} className="mb-2" />}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
