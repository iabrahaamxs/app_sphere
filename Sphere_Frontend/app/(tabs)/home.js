import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import Post from "../../components/Post";
import { getItem } from "../../utils/AsyncStorage";
import { PostApi } from "../../api/postsApi";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    const jwt = await getItem("jwt");
    const postsData = await PostApi.getFollowersPosts(jwt);
    setPosts(postsData);
  }, []);

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
