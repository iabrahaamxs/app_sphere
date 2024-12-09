import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Pressable, Text } from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import CardUser from "../components/CardUser";
import { getItem } from "../utils/AsyncStorage";
import { LikeApi } from "../api/likeApi";
import { BackIcon, Left } from "./Icons";

const ModalLikes = ({ postId, setLikeModalVisible }) => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const jwt = await getItem("jwt");
      if (jwt) {
        const likesData = await LikeApi.getLikes(jwt, postId);
        setLikes(likesData);
      }
    };

    fetchData();
  }, [postId]);

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
        keyExtractor={(item) => item.user_id.toString()}
        renderItem={({ item }) => <CardUser user={item} />}
        showsVerticalScrollIndicator={false}
        style={styles.likesList}
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
