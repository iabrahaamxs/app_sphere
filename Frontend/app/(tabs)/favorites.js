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
  const [page, setPage] = useState(1);
  const [limit] = useState(3);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadFavorites = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const jwt = await getItem("jwt");
    const favoritesData = await PostApi.getFavorites(jwt, page, limit);

    if (favoritesData.length < limit) {
      setHasMore(false);
    }

    setPosts((prev) => [...prev, ...favoritesData]);
    setLoading(false);
  };

  useEffect(() => {
    const initializeApp = async () => {
      try {
      } catch (error) {
        console.log("Error during app initialization:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initializeApp();
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [page]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [fetchData]);

  const fetchData = useCallback(async () => {
    setPage(1);
    setHasMore(true);
    setPosts([]);
    await loadFavorites();
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
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" color="gray" /> : null
        }
        onEndReached={() => {
          if (hasMore && !loading) {
            setPage((prevPage) => prevPage + 1);
          }
        }}
        onEndReachedThreshold={0.3}
      />
    </View>
  );
}
