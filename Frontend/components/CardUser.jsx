import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { getItem } from "../utils/AsyncStorage";
import { FollowApi } from "../api/followApi";

const CardUser = ({ user }) => {
  const [follow, setFollow] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const { user_id, name, last_name, photo, user_name } = user;

  useEffect(() => {
    if (user_id) {
      const fetchData = async () => {
        const jwt = await getItem("jwt");

        const isFollowData = await FollowApi.isfollow(jwt, user_id);
        setFollow(!!isFollowData);
      };

      fetchData();
    }
  }, [user_id]);

  const pressFollow = async () => {
    if (loadingFollow) return;
    setLoadingFollow(true);
    try {
      const jwt = await getItem("jwt");
      await FollowApi.createFollow(jwt, user_id);
      setFollow(true);
    } catch (error) {
      console.error("Error al seguir:", error.message);
    } finally {
      setLoadingFollow(false);
    }
  };

  const pressUnfollow = async () => {
    if (loadingFollow) return;
    setLoadingFollow(true);
    try {
      const jwt = await getItem("jwt");
      await FollowApi.deleteFollow(jwt, user_id);
      setFollow(false);
    } catch (error) {
      console.error("Error al dejar de seguir:", error.message);
    } finally {
      setLoadingFollow(false);
    }
  };

  return (
    <View className="w-[100%] flex-row justify-between	items-center px-2 mb-2">
      <Pressable
        onPress={() => {
          router.navigate(`/user/${user_id}`);
        }}
        className="flex-row basis-3/4"
      >
        <Image
          source={{ uri: photo }}
          style={{
            resizeMode: "contain",
            width: 50,
            height: 50,
            borderRadius: 99999,
            backgroundColor: "#000",
          }}
        />
        <View className="ml-2">
          <Text>{user_name}</Text>
          <Text className="opacity-50">
            {name} {last_name}
          </Text>
        </View>
      </Pressable>

      <Pressable
        className="w-[110] rounded-lg p-2 items-center mr-4"
        onPress={() => {
          follow ? pressUnfollow() : pressFollow();
        }}
        disabled={loadingFollow}
        style={{
          backgroundColor: follow ? "#BBBBBB" : "#462E84",
        }}
      >
        <Text className="text-white font-semibold">
          {follow ? "Dejar de seguir" : "Seguir"}
        </Text>
      </Pressable>
    </View>
  );
};

export default CardUser;
