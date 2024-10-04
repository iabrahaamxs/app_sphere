import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
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

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const jwt = await getItem("jwt");
        if (!jwt) {
          router.replace("/login");
        } else {
          await fetchData();
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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [fetchData]);

  const fetchData = useCallback(async () => {
    const jwt = await getItem("jwt");
    const postsData = await PostApi.getFollowersPosts(jwt);
    setPosts(postsData);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <View >
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
        className="pt-2 bg-white "
        data={posts}
        renderItem={({ item }) => <Post item={item} />}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        keyExtractor={(item) => item.post_id.toString()}
      />
    </View>
  );
}
