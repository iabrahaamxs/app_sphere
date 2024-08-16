import { Image, Pressable, Text, View } from "react-native";
import { Bookmark, Comment, Ellipsis, Heart } from "./Icons";
import { Link } from "expo-router";

const Post = ({ item }) => {
  return (
    <View className="mb-2">
      <View className="flex-row items-center px-2 ">
        <Link href={`/user/${item.userId}`} asChild>
          <Pressable className="flex-row items-center">
            <Image
              source={{
                uri: "https://us.123rf.com/450wm/saripuddin/saripuddin2301/saripuddin230100001/197800879-gamer-esport-gaming-mascota-logo-dise%C3%B1o-ilustraci%C3%B3n-vector-perfil-de-un-hombre-barbudo-con-capucha.jpg",
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
            <Text className="text-base mx-2 ">{item.userName} ·</Text>
          </Pressable>
        </Link>
        <Text className="text-xs leading-8	">{item.date}</Text>
        <Ellipsis className="absolute right-3" />
      </View>
      <Text className="px-2">{item.description}</Text>
      <Image
        source={{
          uri: item.photo,
        }}
        style={{
          resizeMode: "contain",
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
