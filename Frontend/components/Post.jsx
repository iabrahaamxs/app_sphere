import { Image, Modal, Pressable, Text, View } from "react-native";
import { Bookmark, CommentIcon, Ellipsis, HeartIcon } from "./Icons";
import { Link } from "expo-router";
import { timeElapsed } from "../utils/FormatDate";
import { useState, useEffect } from "react";
import { getItem } from "../utils/AsyncStorage";
import PostOptionsMenu from "./PostOptionsMenu";
import { isOlderThan24Hours } from "../utils/DateUtils";
import { LikeApi } from "../api/likeApi";
import Comment from "./Comment";
import { CommentApi } from "../api/commentApi";

const Post = ({ item }) => {
  const [id, setId] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [isPostOptionsMenu, setIsPostOptionsMenu] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const postDate = new Date(item.created_at);
  const isEditableDeletable = !isOlderThan24Hours(postDate);

  const refresh = async () => {
    const jwt = await getItem("jwt");
    const count = await LikeApi.count(jwt, item.id);
    const isliked = await LikeApi.isliked(jwt, item.id);

    setLikesCount(parseInt(count));
    setLiked(isliked);
  };

  useEffect(() => {
    const fetchData = async () => {
      const id = await getItem("id");
      const jwt = await getItem("jwt");
      const commentsData = await CommentApi.count(jwt, item.id);

      setId(id);
      setCommentsCount(commentsData);

      await refresh();
    };
    fetchData();
  }, []);

  const isOwner = item.user === id;

  const handleLike = async () => {
    try {
      const jwt = await getItem("jwt");

      if (liked) {
        await LikeApi.deleteLike(jwt, item.id);
        setLikesCount((prev) => Math.max(prev - 1, 0));
      } else {
        await LikeApi.createLike(jwt, item.id);
        setLikesCount((prev) => prev + 1);
      }

      setLiked((prev) => !prev);
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  const handleCommentPress = () => {
    // router.push({
    //   pathname: "../createComment",
    //   params: { post: item.id },
    // });
    setModalVisible(true);
  };

  const handlePostOptionsMenuPress = () => {
    setIsPostOptionsMenu(true);
  };

  return (
    <View className="mb-2 bg-white">
      <View className="flex-row items-center px-2 py-1">
        <Link
          href={`${item.user == id ? "/myProfile" : "/user/" + item.user}`}
          asChild
        >
          <Pressable className="flex-row items-center">
            <Image
              source={{ uri: item.photo }}
              style={{
                resizeMode: "contain",
                width: 50,
                height: 50,
                borderRadius: 999999,
                borderWidth: 1,
                borderColor: "#462E84",
              }}
            />
            <Text className="text-base mx-2">{item.name} ·</Text>
          </Pressable>
        </Link>
        <Text className="text-xs leading-8">
          {timeElapsed(item.created_at)}
        </Text>
        <Pressable
          onPress={handlePostOptionsMenuPress}
          className="absolute right-3"
          style={{
            marginRight: 5,
            padding: 8,
            width: 40,
            alignItems: "center",
          }}
        >
          <Ellipsis />
          {isPostOptionsMenu && (
            <PostOptionsMenu
              isVisible={isPostOptionsMenu}
              onCancel={() => setIsPostOptionsMenu(false)}
              isOwner={isOwner}
              isEditableDeletable={isEditableDeletable} // Nueva propiedad
              user={item.user}
              postId={item.id}
              description={item.description}
              photo={item.photos[0].photo}
            />
          )}
        </Pressable>
      </View>
      <Text className="px-2 pb-1">{item.description}</Text>
      <Image
        source={{ uri: item.photos[0].photo }}
        style={{
          resizeMode: "cover",
          width: "99%",
          aspectRatio: 4 / 3,
          alignSelf: "center",
        }}
      />
      <View className="flex-row divide-x my-1 h-8">
        <Pressable
          className="w-[33%] justify-center items-center flex-row"
          onPress={handleLike}
        >
          <HeartIcon liked={liked} color="black" />
          {likesCount > 0 && <Text className="ml-2">{likesCount}</Text>}
        </Pressable>

        <Pressable
          className="w-[33%] justify-center items-center flex-row"
          onPress={handleCommentPress}
        >
          <CommentIcon />
          {commentsCount > 0 && <Text className="ml-2">{commentsCount}</Text>}
        </Pressable>
        <Pressable className="w-[33%] justify-center items-center">
          <Bookmark />
        </Pressable>

        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View className="flex-1 ">
            <Comment postId={item.id} refresh={refresh} />
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Post;
