import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  Platform,
  ToastAndroid,
} from "react-native";
import {
  Location,
  Calendar,
  Share,
  Grid,
  Bookmark,
  Logout,
  Settings,
} from "../../components/Icons";
import { router } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import PagerView from "react-native-pager-view";
import * as Clipboard from "expo-clipboard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { clear, getItem } from "../../utils/AsyncStorage";
import { UserApi } from "../../api/userApi";
import { CategorieApi } from "../../api/categorieApi";
import { PostApi } from "../../api/postsApi";
import { formatDate } from "../../utils/FormatDate";
import CardFollows from "../../components/CardFollows";
import Categories from "../../components/Categories";
import CoverPhoto from "../../components/CoverPhoto";
import LogoutConfirmation from "../../components/LogoutConfirmation";

export default function MyProfile() {
  // react-native-tab-view para post y fav
  const insets = useSafeAreaInsets();
  const [viewPost, setViewPost] = useState(true);
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(3);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadPosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const jwt = await getItem("jwt");
    const postsData = await PostApi.getMyPosts(jwt, page, limit);

    if (postsData.length < limit) {
      setHasMore(false);
    }

    setPosts((prev) => [...prev, ...postsData]);
    setLoading(false);
  };

  const ref = useRef();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);

    if (Platform.OS === "android") {
      ToastAndroid.show("¡Nombre de usuario copiado!", ToastAndroid.SHORT);
    } else {
      // Para iOS, podrías agregar un mensaje alternativo, por ejemplo, con un estado
      alert("¡Nombre de usuario copiado!"); // Como alternativa rápida para iOS
    }
  };

  const postPress = () => {
    ref.current?.setPage(0);
    setViewPost(true);
  };
  const favPress = () => {
    ref.current?.setPage(1);
    setViewPost(false);
  };

  const { height } = Dimensions.get("window");

  const getHeight = (b) => {
    return height > b ? height - 20 : b;
  };

  // API

  const [Profile, setProfile] = useState({});
  const [categories, setCategories] = useState([]);
  const [follows, setFollows] = useState(null);
  const [followed, setFollowed] = useState(null);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [fetchData]);

  const fetchData = async () => {
    const jwt = await getItem("jwt");
    const profileData = await UserApi.whoami(jwt);
    const categoriesData = await CategorieApi.getMyCategories(jwt);
    const favoritesData = await PostApi.getFavorites(jwt);
    const followsData = await UserApi.countMyFollows(jwt);
    const followedData = await UserApi.countMyFollowed(jwt);

    setProfile(profileData);
    setCategories(categoriesData);
    setFollows(followsData);
    setFollowed(followedData);
    setFavorites(favoritesData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    loadPosts();
  }, [page]);

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      {Object.keys(Profile).length === 0 ? (
        <View className="pt-[10%] ">
          <ActivityIndicator color={"#000"} size="large" />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row items-center w-[100%] h-20 mt-1 p-4 absolute z-10 justify-end	">
            <Pressable onPress={() => setShowLogoutModal(true)}>
              <Logout color="white" />
            </Pressable>
          </View>

          <CoverPhoto photo={Profile.photo} />

          <View className="w-[100%] bg-white mt-[-6] rounded-t-xl items-center z-20">
            <Image
              className="mt-[-65]"
              source={{ uri: Profile.photo }}
              style={{
                resizeMode: "contain",
                width: 130,
                height: 130,
                borderRadius: 99999,
                shadowColor: "#000",
              }}
            />

            <Text className="text-xl">
              {Profile.name + " " + Profile.last_name}
            </Text>
            <Text className="text-sm mt-1">{"@" + Profile.user_name}</Text>
            <Text className="text-sm p-2">{Profile.bio}</Text>

            <View className="flex-row justify-around px-4 py-2 space-x-2">
              <Pressable
                className="flex-row items-center p-1.5 rounded-lg border-[1.2px] border-[#462E84] bg-white"
                onPress={() => router.push("/editProfile")}
              >
                <Settings className="ml-1 mr-1" color="#462E84" />
                <Text className="text-[#462E84] ml-1 mr-2 text-sm">
                  Configuración
                </Text>
              </Pressable>

              <Pressable
                className="flex-row items-center p-1.5 rounded-lg bg-[#462E84]"
                onPress={() => {
                  copyToClipboard("@" + Profile.user_name);
                }}
              >
                <Share className="ml-1 mr-1" color="white" />
                <Text className="text-white ml-1 mr-2 text-sm">
                  Compartir perfil
                </Text>
              </Pressable>
            </View>

            <View className=" flex-row w-[100%] p-1 ml-2.5">
              <Location />
              <Text className="ml-2">{Profile.country}</Text>
            </View>
            <View className=" flex-row w-[100%] p-1 ml-1">
              <Calendar />
              <Text className="ml-1.5">{formatDate(Profile.created_at)}</Text>
            </View>

            <Categories categories={categories} />

            <CardFollows followed={followed} follows={follows} asChild />
          </View>

          <View style={styles.container}>
            <View className="p-2 flex-row justify-between w-[85%] self-center	">
              <Pressable
                style={{ opacity: viewPost ? 1 : 0.5 }}
                onPress={() => postPress()}
                className="flex-row items-center"
              >
                <Grid />
                <Text className="text-base pl-2">Publicaciones</Text>
              </Pressable>
              <Pressable
                style={{ opacity: !viewPost ? 1 : 0.5 }}
                onPress={() => favPress()}
                className="flex-row items-center"
              >
                <Bookmark />
                <Text className="text-base pl-2">Favoritos</Text>
              </Pressable>
            </View>
            <PagerView
              ref={ref}
              initialPage={0}
              scrollEnabled={false}
              style={{
                height: viewPost
                  ? getHeight(Math.ceil(posts.length / 3) * 133)
                  : getHeight(Math.ceil(favorites.length / 3) * 133),
              }}
            >
              <View style={styles.grid} key="0">
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

              <View style={styles.grid} key="1">
                {favorites.map((fav, index) => (
                  <Pressable
                    key={fav.id}
                    style={styles.box}
                    onPress={() => {
                      router.push({
                        pathname: "/viewPosts",
                        params: {
                          title: "Favoritos",
                          postsString: JSON.stringify(favorites),
                          index: index,
                        },
                      });
                    }}
                  >
                    <Image
                      style={styles.image}
                      source={{
                        uri: fav.photos[0].photo,
                      }}
                    />
                  </Pressable>
                ))}
              </View>
            </PagerView>
          </View>
          <LogoutConfirmation
            isVisible={showLogoutModal}
            onClose={() => setShowLogoutModal(false)}
            onConfirm={async () => {
              await clear();
              router.replace("/login");
            }}
          />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    backgroundColor: "#fff",
    marginTop: 10,
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
