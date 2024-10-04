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
} from "react-native";
import {
  Location,
  Calendar,
  Compass,
  Share,
  Grid,
  Bookmark,
  Logout,
} from "../../components/Icons";
import { Link, router } from "expo-router";
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

export default function MyProfile() {
  //react-native-tab-view para post y fav
  const insets = useSafeAreaInsets();
  const [viewPost, setViewPost] = useState(true);
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const ref = useRef();

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
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
  const [follows, setFollows] = useState([]);
  const [followed, setFollowed] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [fetchData]);

  const fetchData = async () => {
    const jwt = await getItem("jwt");
    const id = await getItem("id");
    //const user_name = await getItem("user_name");
    const profileData = await UserApi.getProfile(id);
    const categoriesData = await CategorieApi.getCategories(id);
    const followsData = await UserApi.getFollows(id);
    const followedData = await UserApi.getFollowed(id);
    const postsData = await PostApi.getPosts(id);
    const favoritesData = await PostApi.getFavorites(jwt);

    setProfile(profileData);
    setCategories(categoriesData);
    setFollows(followsData);
    setFollowed(followedData);
    setPosts(postsData);
    setFavorites(favoritesData);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            <Pressable
              onPress={async () => {
                await clear();
                router.replace("/login");
              }}
            >
              <Logout color="white" />
            </Pressable>
          </View>
          <Image
            source={{ uri: Profile.user_photo }}
            style={{
              resizeMode: "cover",
              width: "110%",
              height: 140,
              alignSelf: "center",
            }}
          />
          <View className="w-[100%] bg-white mt-[-6] rounded-t-xl items-center z-20">
            <Image
              className="mt-[-65]"
              source={{ uri: Profile.user_photo }}
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

            <Pressable
              className=" flex-row p-1.5 rounded-lg bg-[#462E84] "
              onPress={() => {
                copyToClipboard("@" + Profile.user_name);
                //setFollowModal(false);
              }}
            >
              <Share className="ml-2" color="white" />
              <Text className="text-white ml-3 mr-2">Compartir perfil</Text>
            </Pressable>

            <View className=" flex-row w-[100%] p-1 ml-2.5">
              <Location />
              <Text className="ml-2">{Profile.country}</Text>
            </View>
            <View className=" flex-row w-[100%] p-1 ml-1">
              <Calendar />
              <Text className="ml-1.5">
                {formatDate(Profile.user_created_at)}
              </Text>
            </View>

            <Categories categories={categories} />

            <CardFollows followed={followed} follows={follows} />
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
                {posts.map((post) => (
                  <Image
                    key={post.post_id}
                    style={styles.box}
                    source={{
                      uri: post.photos[0].photo,
                    }}
                  />
                ))}
              </View>

              <View style={styles.grid} key="1">
                {favorites.map((fav) => (
                  <Image
                    key={fav.favorite_id}
                    style={styles.box}
                    source={{
                      uri: fav.photos[0].photo,
                    }}
                  />
                ))}
              </View>
            </PagerView>
          </View>
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
    width: "32%",
    height: 100,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    resizeMode: "cover",
    borderRadius: 5,
  },
});
