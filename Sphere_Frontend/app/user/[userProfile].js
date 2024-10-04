import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
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
import CoverPhoto from "../../components/coverPhoto";

export default function UserProfile() {
  const { userProfile } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [follows, setFollows] = useState([]);
  const [followed, setFollowed] = useState([]);
  const [follow, setFollow] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (userProfile) {
      const fetchData = async () => {
        const userData = await UserApi.getProfile(userProfile);
        const categoriesData = await CategorieApi.getCategories(userProfile);
        const followsData = await UserApi.getFollows(userProfile);
        const followedData = await UserApi.getFollowed(userProfile);
        const postsData = await PostApi.getPosts(userProfile);

        setUser(userData);
        setCategories(categoriesData);
        setFollows(followsData);
        setFollowed(followedData);
        setPosts(postsData);
      };

      fetchData();
    }
  }, [userProfile]);

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
  };

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      {user === null ? (
        <ActivityIndicator />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-row items-center w-[100%] h-20 mt-1 p-4 absolute z-10 justify-between">
            <Link href="/">
              <Left color="white" />
            </Link>
            <Pressable onPress={() => copyToClipboard("@" + user.user_name)}>
              <Share color="white" />
            </Pressable>
          </View>
          <CoverPhoto photo={user.user_photo} />
          <View className="w-[100%] bg-white mt-[-6] rounded-t-xl items-center z-20">
            <Image
              className="mt-[-65]"
              source={{ uri: user.user_photo }}
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
                follow ? setFollow(false) : setFollow(true);
              }}
              style={{
                backgroundColor: follow ? "#BBBBBB" : "#462E84",
              }}
            >
              {follow ? (
                <>
                  <UserUnfollow className="ml-2" color="white" />
                  <Text className="text-white ml-3 mr-2 text-base ">
                    Dejar de seguir
                  </Text>
                </>
              ) : (
                <>
                  <UserFollow className="ml-2" color="white" />
                  <Text className="text-white ml-3 mr-2 text-base ">
                    Seguir
                  </Text>
                </>
              )}
            </Pressable>

            <View className=" flex-row w-[100%] p-1 ml-2.5">
              <Location />
              <Text className="ml-2">{user.country}</Text>
            </View>
            <View className=" flex-row w-[100%] p-1 ml-1">
              <Calendar />
              <Text className="ml-1.5">{formatDate(user.user_created_at)}</Text>
            </View>

            <Categories categories={categories} />

            <CardFollows followed={followed} follows={follows} />
          </View>
          <View style={styles.container}>
            <Text className="p-2 text-base">Publicaciones</Text>
            <View style={styles.grid}>
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
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    padding: 4,
    backgroundColor: "#fff",
  },
  grid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    minHeight: 700,
  },
  box: {
    width: "32%", // Ancho de cada elemento (30% para 3 columnas con espacio entre)
    height: 100,
    aspectRatio: 1, // Proporción de altura para mantener la forma de cuadrado
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    resizeMode: "cover",
    borderRadius: 5,
  },
});
