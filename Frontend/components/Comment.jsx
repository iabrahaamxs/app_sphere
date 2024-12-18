import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { timeElapsed } from "../utils/FormatDate";
import { SendIcon, HeartIcon } from "./Icons";
import {
  View,
  TextInput,
  Text,
  FlatList,
  Image,
  Pressable,
  KeyboardAvoidingView,
  StyleSheet,
  StatusBar,
  Modal,
  ActivityIndicator,
} from "react-native";
import { getItem } from "../utils/AsyncStorage";
import { LikeApi } from "../api/likeApi";
import ModalLikes from "./ModalLikes";
import { CommentApi } from "../api/commentApi";

const MAX_CHARACTERS = 1000; // Máximo de caracteres permitidos
const MAX_NEWLINES = 10; // Máximo de saltos de línea permitidos

const Comment = ({ postId, refresh, refreshComments }) => {
  const [newComment, setNewComment] = useState("");
  const insets = useSafeAreaInsets();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [likeModalVisible, setLikeModalVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadComments = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const jwt = await getItem("jwt");
    const commentsData = await CommentApi.getComments(jwt, postId, page, limit);

    if (commentsData.length < limit) {
      setHasMore(false);
    }

    setComments((prev) => [...prev, ...commentsData]);
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const jwt = await getItem("jwt");
      const isliked = await LikeApi.isliked(jwt, postId);
      const count = await LikeApi.count(jwt, postId);

      setLiked(isliked);
      setLikesCount(parseInt(count));
    };
    fetchData();
  }, [postId]);

  useEffect(() => {
    loadComments(); // Solo ejecuta cuando cambia la página
  }, [page]);

  const handleTextChange = (text) => {
    // Limita los caracteres
    if (text.length > MAX_CHARACTERS) {
      return;
    }

    // Cuenta los saltos de línea y restringe si supera el máximo permitido
    const newlines = (text.match(/\n/g) || []).length;
    if (newlines > MAX_NEWLINES) {
      return;
    }

    setNewComment(text);
  };

  const handleSendComment = async () => {
    const jwt = await getItem("jwt");
    if (newComment.trim() && jwt) {
      const commentData = await CommentApi.createComment(
        jwt,
        postId,
        newComment
      );

      setComments([...comments, commentData]);
      setNewComment("");
      refreshComments(jwt);
    }
  };

  const handleLike = async () => {
    try {
      const jwt = await getItem("jwt");

      if (liked) {
        await LikeApi.deleteLike(jwt, postId);
        setLikesCount((prev) => Math.max(prev - 1, 0));
      } else {
        await LikeApi.createLike(jwt, postId);
        setLikesCount((prev) => prev + 1);
      }

      setLiked((prev) => !prev);
      await refresh(jwt);
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  const goToLikesScreen = () => {
    setLikeModalVisible(true);
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <Image source={{ uri: item.photo }} style={styles.userPhoto} />
      <View style={styles.commentContent}>
        <View style={styles.commentBox}>
          <View style={styles.commentHeader}>
            <Text style={styles.commentUsername}>{item.user_name} ·</Text>
            <Text style={styles.commentTime}>
              {timeElapsed(item.created_at)}
            </Text>
          </View>
          <Text style={styles.commentText}>{item.text}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingBottom: insets.bottom }]}
      behavior="padding"
    >
      <StatusBar style="auto" backgroundColor="#fff" />
      <View style={styles.likeIconContainer}>
        <View style={{ flex: 1 }}>
          {likesCount > 0 && (
            <Pressable onPress={goToLikesScreen}>
              <Text style={styles.likeCount}>{likesCount} Me gusta</Text>
            </Pressable>
          )}
        </View>
        <Pressable onPress={handleLike} style={styles.heartIcon}>
          <HeartIcon liked={liked} />
        </Pressable>
      </View>

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderComment}
        style={styles.commentsList}
        showsVerticalScrollIndicator={false}
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

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newComment}
          onChangeText={handleTextChange}
          placeholder="Agrega un comentario"
          multiline
        />
        <Pressable style={styles.sendButton} onPress={handleSendComment}>
          <SendIcon color="gray" />
        </Pressable>
      </View>
      <Modal
        animationType="slide"
        visible={likeModalVisible}
        onRequestClose={() => {
          <StatusBar style="auto" />;
          setLikeModalVisible(!likeModalVisible);
        }}
      >
        <View className="flex-1 ">
          <ModalLikes
            postId={postId}
            setLikeModalVisible={setLikeModalVisible}
          />
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  commentsList: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 70,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.2)",
    marginBottom: 10,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 10,
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentBox: {
    backgroundColor: "rgba(221, 221, 221, 0.2)",
    padding: 9,
    borderRadius: 15,
    marginRight: 9,
    alignSelf: "flex-start",
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  commentUsername: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  commentText: {
    marginBottom: 0,
  },
  commentTime: {
    fontSize: 12,
    color: "gray",
    marginLeft: 5,
    marginRight: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "#ccc",
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "rgba(221, 221, 221, 0.2)",
    borderRadius: 15,
    marginHorizontal: 15,
    marginBottom: 19,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    borderRadius: 12,
  },
  sendButton: {
    marginLeft: 10,
  },
  likeIconContainer: {
    position: "absolute",
    top: 35,
    right: 10,
    left: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  likeCount: {
    width: 100,
    textAlign: "left",
    fontSize: 16,
    color: "#462E84",
  },
  heartIcon: {
    marginRight: 10,
  },
});
