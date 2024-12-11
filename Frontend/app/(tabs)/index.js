import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
} from "react-native";
import Post from "../../components/Post";
import { getItem } from "../../utils/AsyncStorage";
import { PostApi } from "../../api/postsApi";
import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(3);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadPosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const jwt = await getItem("jwt");
    const postsData = await PostApi.getFollowersPosts(jwt, page, limit);

    if (postsData.length < limit) {
      setHasMore(false);
    }

    setPosts((prev) => [...prev, ...postsData]);
    setLoading(false);
  };

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const jwt = await getItem("jwt");
        if (!jwt) {
          router.replace("/login");
        }
      } catch (error) {
        console.log("Error during app initialization:", error);
      } finally {
        setIsLoading(false);
        await SplashScreen.hideAsync();
      }
    };
    initializeApp();
  }, []);

  useEffect(() => {
    loadPosts();
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
    await loadPosts();
  }, []);

  if (isLoading) {
    return null;
  }

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
        data={posts}
        renderItem={({ item }) => <Post item={item} className="mb-2" />}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        keyExtractor={(item) => item.id.toString()}
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
