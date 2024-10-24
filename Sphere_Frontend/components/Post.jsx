import { Image, Pressable, Text, View } from "react-native";
import { Bookmark, Comment, Ellipsis} from "./Icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, router} from "expo-router";
import { timeElapsed } from "../utils/FormatDate";
import { useState } from "react";
import { getItem } from "../utils/AsyncStorage";
import PostOptionsMenu from "./PostOptionsMenu";

const Post = ({ item }) => {
  const [id, setId] = useState(null);
  const [liked, setLiked] = useState(false); 
  const [likesCount, setLikesCount] = useState(item.likes); 
  const [isPostOptionsMenu, setIsPostOptionsMenu] = useState(false); 

  const fetchData = async () => {
    const id = await getItem("id");
    setId(id);
  };
  fetchData();

  const handleLike = () => {
    setLiked(!liked); // Cambia el estado de liked
    if (liked) {
      // Si ya está likeado, resta un like
      setLikesCount(likesCount - 1);
    } else {
      // Si no está likeado, suma un like
      setLikesCount(likesCount + 1);
    }
  };


    const handleCommentPress = () => {
      router.push(`../createComment`); 
    };
     // Función para abrir el menú de opciones
  const handlePostOptionsMenuPress = () => {
    setIsPostOptionsMenu(true); // Muestra el menú
  };


  return (
    <View className="mb-2 bg-white">
      <View className="flex-row items-center px-2 py-1">
        <Link
          href={`${
            item.post_user == id ? "/myProfile" : "/user/" + item.post_user
          }`}
          asChild
        >
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
        <Pressable onPress={handlePostOptionsMenuPress}
        className="absolute right-3" 
          style={{
            marginRight: 15,   
            padding: 8,
            width  : 40,
            alignItems: "center",
            

          }}>
          <Ellipsis/>
          <PostOptionsMenu
            isVisible={isPostOptionsMenu} 
            onCancel={() => setIsPostOptionsMenu(false)} 
          />
        </Pressable>
        
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
      <View className="flex-row divide-x my-1 h-8">
        <Pressable className="w-[33%] justify-center items-center flex-row" onPress={handleLike}>
        <MaterialCommunityIcons
            name={liked ? "heart" : "heart-outline"} 
            size={24}
            color={liked ? "red" : "black"} 
        />
            {likesCount > 0 && (
              <Text className="ml-2">{likesCount}</Text>
            )}
        </Pressable>
        <Pressable className="w-[33%] justify-center items-center"  onPress={handleCommentPress} >
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
