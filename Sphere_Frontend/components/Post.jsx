import { Image, Pressable, Text, View } from "react-native";
import { Bookmark, Comment, Ellipsis, Heart } from "./Icons";
import { Link } from "expo-router";
import { timeElapsed } from "../utils/FormatDate";

const Post = ({ item }) => {
  return (
    <View className="mb-2">
      <View className="flex-row items-center px-2 ">
        <Link href={`/user/${item.post_user}`} asChild>
          <Pressable className="flex-row items-center">
            <Image
              source={{
                uri: item.user_photo,
              }}
              style={{
                resizeMode: "contain",
                width: 50,
                height: 50,
                borderRadius: 999999,
                borderWidth: 1,
                borderColor: "#462E84",
              }}
            />
            <Text className="text-base mx-2 ">{item.name} ·</Text>
          </Pressable>
        </Link>
        <Text className="text-xs leading-8	">
          {timeElapsed(item.post_created_at)}
        </Text>
        <Ellipsis className="absolute right-3" />
      </View>
      <Text className="px-2">{item.description}</Text>
      <Image
        source={{
          uri: item.photos[0].photo,
        }}
        style={{
          resizeMode: "cover",
          width: "100%",
          aspectRatio: 4 / 3,
        }}
      />
      <View className="flex-row divide-x mt-1 ">
        <Pressable className="w-[33%] justify-center items-center">
          <Heart />
        </Pressable>
        <Pressable className="w-[33%] justify-center items-center">
          <Comment />
        </Pressable>
        <Pressable className="w-[33%] justify-center items-center">
          <Bookmark />
        </Pressable>
      </View>
    </View>
  );
};

export default Post;
