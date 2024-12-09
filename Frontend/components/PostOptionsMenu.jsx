import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import DeletePost from "./DeletePost";
import TimeLimitModal from "./TimeLimitModal";
import { Bookmark, Trash, Edit, UserFollow, UserUnfollow } from "./Icons";
import { useRouter } from "expo-router";
import { getItem } from "../utils/AsyncStorage";
import { FollowApi } from "../api/followApi";
import { FavoriteApi } from "../api/favoriteApi"; 

const PostOptionsMenu = ({
  isVisible,
  onCancel,
  isOwner,
  isFollowing,
  isEditableDeletable,
  user,
  postId,
  description,
  photo,
  onFavoriteToggle, // Callback para informar al padre cuando se cambia el estado de favorito
}) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isTimeLimitModalVisible, setIsTimeLimitModalVisible] = useState(false);
  const [timeLimitMessage, setTimeLimitMessage] = useState("");
  const [follow, setFollow] = useState(isFollowing);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [favorite, setFavorite] = useState(false); // Estado para el favorito
  const router = useRouter();

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      const jwt = await getItem("jwt");
      const isFavorited = await FavoriteApi.isFavorite(jwt, postId); // Aquí verificamos si está en favoritos
      setFavorite(isFavorited);
    };

    fetchFavoriteStatus();
  }, [postId]);

  const handleDeletePress = () => {
    if (!isEditableDeletable) {
      setTimeLimitMessage(
        "No puedes eliminar tu publicación debido a que las 24 horas transcurrieron"
      );
      setIsTimeLimitModalVisible(true);
    } else {
      setIsDeleteModalVisible(true);
    }
  };

  const handleEditPress = () => {
    if (!isEditableDeletable) {
      setTimeLimitMessage(
        "No puedes editar tu publicación debido a que las 24 horas transcurrieron"
      );
      setIsTimeLimitModalVisible(true);
    } else {
      router.push({
        pathname: "/editPost",
        params: { 
          postId: postId, 
          userId: user,
          postDescription : description,
          photo: photo,
        },
      });      
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  const handleDeletePost = () => {
    setIsDeleteModalVisible(false);
    onCancel();
  };

  const pressFollow = async () => {
    if (loadingFollow) return;
    setLoadingFollow(true);
    try {
      const jwt = await getItem("jwt");
      await FollowApi.createFollow(jwt, user);
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
      await FollowApi.deleteFollow(jwt, user);
      setFollow(false);
    } catch (error) {
      console.error("Error al dejar de seguir:", error.message);
    } finally {
      setLoadingFollow(false);
    }
  };

  // Manejo del botón de favoritos
  const handleFavoriteToggle = async () => {
    try {
      const jwt = await getItem("jwt");
      if (favorite) {
        await FavoriteApi.deleteFavorite(jwt, postId); // Eliminar de favoritos
      } else {
        await FavoriteApi.addFavorite(jwt, postId); // Agregar a favoritos
      }
      setFavorite((prev) => !prev); // Alternar el estado de favorito
      if (onFavoriteToggle) {
        onFavoriteToggle(); // Notificar al componente padre si es necesario
      }
    } catch (error) {
      console.error("Error al manejar favoritos:", error);
    }
  };

  const handleCloseTimeLimitModal = () => {
    setIsTimeLimitModalVisible(false);
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={styles.menuViewTop}>
              <View style={styles.separator}></View>
              {isOwner ? (
                <>
                  <Pressable
                    style={styles.optionButton}
                    onPress={handleDeletePress}
                  >
                    <View style={styles.iconContainer}>
                      <Trash size={24} color="black" />
                    </View>
                    <Text style={styles.optionText}>{"Eliminar"}</Text>
                  </Pressable>
                  <Pressable
                    style={styles.optionButton}
                    onPress={handleEditPress}
                  >
                    <View style={styles.iconContainer}>
                      <Edit size={24} color="black" />
                    </View>
                    <Text style={styles.optionText}>{"Editar"}</Text>
                  </Pressable>
                  <Pressable style={styles.optionButton} onPress={handleFavoriteToggle}>
                    <View style={styles.iconContainer}>
                      <Bookmark size={24} color="black" />
                    </View>
                    <Text style={styles.optionText}>
                      {favorite ? "Eliminar de favoritos" : "Agregar a favoritos"}
                    </Text>
                  </Pressable>
                </>
              ) : (
                <>
                  <Pressable
                    style={styles.optionButton}
                    onPress={() => {
                      follow ? pressUnfollow() : pressFollow();
                    }}
                    disabled={loadingFollow}
                  >
                    <View style={styles.iconContainer}>
                      {follow ? (
                        <UserUnfollow size={24} />
                      ) : (
                        <UserFollow size={24} />
                      )}
                    </View>
                    <Text style={styles.optionText}>
                      {follow ? "Dejar de seguir" : "Seguir"}
                    </Text>
                  </Pressable>
                  <Pressable style={styles.optionButton} onPress={handleFavoriteToggle}>
                    <View style={styles.iconContainer}>
                      <Bookmark size={24} color="black" />
                    </View>
                    <Text style={styles.optionText}>
                      {favorite ? "Eliminar de favoritos" : "Agregar a favoritos"}
                    </Text>
                  </Pressable>
                </>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>

      {isDeleteModalVisible && (
        <DeletePost
          isVisible={isDeleteModalVisible}
          onCancel={handleCancelDelete}
          onDelete={handleDeletePost}
          postId={postId}
        />
      )}
      {isTimeLimitModalVisible && (
        <TimeLimitModal
          isVisible={isTimeLimitModalVisible}
          onClose={handleCloseTimeLimitModal}
          message={timeLimitMessage}
        />
      )}
    </Modal>
  );
};

export default PostOptionsMenu;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  menuViewTop: {
    flexDirection: "column",
    backgroundColor: "white",
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 30,
    justifyContent: "space-around",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  optionButton: {
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
  },
  separator: {
    height: 6,
    backgroundColor: "#462E84",
    borderRadius: 20,
    marginTop: -10,
    marginBottom: 10,
    width: "20%",
    alignSelf: "center",
  },
});
