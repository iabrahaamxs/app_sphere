import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import CardUser from "../components/CardUser";
import { getItem } from "../utils/AsyncStorage";
import { LikeApi } from "../api/likeApi";
import { Left } from "./Icons";

const ModalLikes = ({ postId, setLikeModalVisible }) => {
  const [likes, setLikes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadLikes = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const jwt = await getItem("jwt");

    const likesData = await LikeApi.getLikes(jwt, postId, page, limit);

    if (likesData.length < limit) {
      setHasMore(false);
    }

    setLikes((prev) => [...prev, ...likesData]);
    setLoading(false);
  };

  useEffect(() => {
    loadLikes();
  }, [page]);

  return (
    <View style={styles.container}>
      <View className="flex-row items-center gap-3 pl-3 py-4">
        <Pressable onPress={() => setLikeModalVisible(false)}>
          <Left size={26} />
        </Pressable>
        <Text className="text-xl font-semibold">Me gustas</Text>
      </View>

      <FlatList
        data={likes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CardUser user={item} />}
        showsVerticalScrollIndicator={false}
        style={styles.likesList}
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" color="gray" /> : null
        }
        onEndReached={() => {
          if (hasMore && !loading) {
            setPage((prevPage) => prevPage + 1);
          }
        }}
        onEndReachedThreshold={0.2}
      />
    </View>
  );
};

export default ModalLikes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  likesList: {
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.2)",
  },
});
