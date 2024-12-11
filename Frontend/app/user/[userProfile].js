import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Platform,
  ToastAndroid,
} from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import * as Clipboard from "expo-clipboard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Location,
  Calendar,
  Compass,
  Left,
  Share,
  UserFollow,
  UserUnfollow,
} from "../../components/Icons";
import { UserApi } from "../../api/userApi";
import { formatDate } from "../../utils/FormatDate";
import { CategorieApi } from "../../api/categorieApi";
import { PostApi } from "../../api/postsApi";
import CardFollows from "../../components/CardFollows";
import Categories from "../../components/Categories";
import CoverPhoto from "../../components/CoverPhoto";
import { FollowApi } from "../../api/followApi";
import { getItem } from "../../utils/AsyncStorage";

export default function UserProfile() {
  const { userProfile } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [follows, setFollows] = useState([]);
  const [followed, setFollowed] = useState([]);
  const [follow, setFollow] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(3);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadPosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const postsData = await PostApi.getPosts(userProfile, page, limit);

    if (postsData.length < limit) {
      setHasMore(false);
    }

    setPosts((prev) => [...prev, ...postsData]);
    setLoading(false);
  };

  useEffect(() => {
    if (userProfile) {
      const fetchData = async () => {
        const jwt = await getItem("jwt");

        const [
          userData,
          categoriesData,
          followsData,
          followedData,
          isFollowData,
        ] = await Promise.all([
          UserApi.getProfile(userProfile),
          CategorieApi.getCategories(userProfile),
          UserApi.countFollows(userProfile),
          UserApi.countFollowed(userProfile),
          FollowApi.isfollow(jwt, userProfile),
        ]);

        setUser(userData);
        setCategories(categoriesData);
        setFollows(followsData);
        setFollowed(followedData);
        setFollow(isFollowData);
      };

      fetchData();
    }
  }, [userProfile]);

  useEffect(() => {
    loadPosts();
  }, [page]);

  const pressFollow = async () => {
    if (loadingFollow) return;
    setLoadingFollow(true);
    try {
      const jwt = await getItem("jwt");
      const newFollow = await FollowApi.createFollow(jwt, userProfile);
      setFollow(newFollow);
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
      await FollowApi.deleteFollow(jwt, userProfile);
      setFollow(null);
    } catch (error) {
      console.error("Error al dejar de seguir:", error.message);
    } finally {
      setLoadingFollow(false);
    }
  };

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);

    if (Platform.OS === "android") {
      ToastAndroid.show("¡Nombre de usuario copiado!", ToastAndroid.SHORT);
    } else {
      // Para iOS, podrías agregar un mensaje alternativo, por ejemplo, con un estado
      alert("¡Nombre de usuario copiado!"); // Como alternativa rápida para iOS
    }
  };

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      {user === null ? (
        <ActivityIndicator />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-row items-center w-[100%] h-20 mt-1 p-4 absolute z-10 justify-between">
            <Pressable onPress={() => router.back()}>
              <Left color="white" />
            </Pressable>
            <Pressable onPress={() => copyToClipboard("@" + user.user_name)}>
              <Share color="white" />
            </Pressable>
          </View>
          <CoverPhoto photo={user.photo} />
          <View className="w-[100%] bg-white mt-[-6] rounded-t-xl items-center z-20">
            <Image
              className="mt-[-65]"
              source={{ uri: user.photo }}
              style={{
                resizeMode: "contain",
                width: 130,
                height: 130,
                borderRadius: 99999,
                shadowColor: "#000",
              }}
            />

            <Text className="text-xl">{user.name + " " + user.last_name}</Text>
            <Text className="text-sm mt-1">{"@" + user.user_name}</Text>
            <Text className="text-sm p-2">{user.bio}</Text>

            <Pressable
              className=" flex-row p-1.5 rounded-lg "
              onPress={() => {
                follow ? pressUnfollow() : pressFollow();
              }}
              disabled={loadingFollow}
              style={{
                backgroundColor: follow ? "#BBBBBB" : "#462E84",
              }}
            >
              {loadingFollow ? (
                <ActivityIndicator color="white" className="px-9 py-1" />
              ) : follow ? (
                <>
                  <UserUnfollow className="ml-2" color="white" />
                  <Text className="text-white ml-3 mr-2 text-base">
                    Dejar de seguir
                  </Text>
                </>
              ) : (
                <>
                  <UserFollow className="ml-2" color="white" />
                  <Text className="text-white ml-3 mr-2 text-base">Seguir</Text>
                </>
              )}
            </Pressable>

            <View className=" flex-row w-[100%] p-1 ml-2.5">
              <Location />
              <Text className="ml-2">{user.country}</Text>
            </View>
            <View className=" flex-row w-[100%] p-1 ml-1">
              <Calendar />
              <Text className="ml-1.5">{formatDate(user.created_at)}</Text>
            </View>

            <Categories categories={categories} />

            <CardFollows followed={followed} follows={follows} />
          </View>
          <View style={styles.container}>
            <Text className="p-2 text-base">Publicaciones</Text>
            <View style={styles.grid}>
              {posts.map((post, index) => (
                <Pressable
                  key={post.id}
                  style={styles.box}
                  onPress={() => {
                    router.push({
                      pathname: "/viewPosts",
                      params: {
                        title: "Publicaciones",
                        postsString: JSON.stringify(posts),
                        index: index,
                      },
                    });
                  }}
                >
                  <Image
                    style={styles.image}
                    source={{
                      uri: post.photos[0].photo,
                    }}
                  />
                </Pressable>
              ))}
            </View>

            {hasMore && !loading && (
              <Pressable
                className="mx-auto p-2 my-4 bg-[#462E84] rounded-lg"
                onPress={() => {
                  setPage((prevPage) => prevPage + 1);
                }}
              >
                <Text className="text-white text-center">Ver más</Text>
              </Pressable>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    padding: 4,
    backgroundColor: "#fff",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  box: {
    width: "32%", // El contenedor Pressable tiene el tamaño
    height: 100,
    aspectRatio: 1,
    margin: 2,
    borderRadius: 5,
  },
  image: {
    width: "100%", // La imagen ocupa todo el espacio del Pressable
    height: "100%",
    resizeMode: "cover", // Mantiene la propiedad de cover para que la imagen se ajuste
    borderRadius: 5,
  },
});
