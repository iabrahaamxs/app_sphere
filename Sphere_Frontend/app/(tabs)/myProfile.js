import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Modal,
  TextInput,
  BackHandler,
  FlatList,
} from "react-native";
import {
  Location,
  Calendar,
  Compass,
  Share,
  Grid,
  Bookmark,
  Logout,
  LockIcon,
  LockBold,
  Left,
  LupaIcon,
} from "../../components/Icons";
import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import PagerView from "react-native-pager-view";
import * as Clipboard from "expo-clipboard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { clear, getAllItems, getItem } from "../../utils/AsyncStorage";
import { UserApi } from "../../api/userApi";
import { CategorieApi } from "../../api/categorieApi";
import CardUser from "../../components/CardUser";

//const User_icon = require("../../assets/User_icon.png");

export default function MyProfile() {
  //react-native-tab-view para post y fav
  const insets = useSafeAreaInsets();
  const [followModal, setFollowModal] = useState(false);
  const [viewPost, setViewPost] = useState(true);
  const [viewFollow, setViewFollow] = useState(null);
  const posts = [
    {
      value: "1",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwvJWnvrFvge1Nhr61-isRuZpr2G26MlrqwQ&s",
    },
    { value: "2", uri: "https://img2.rtve.es/i/?w=1600&i=1632450182030.jpg" },
    { value: "3", uri: "https://img2.rtve.es/i/?w=1600&i=1632450182030.jpg" },
    {
      value: "4",
      uri: "https://media.wired.com/photos/64b6962b6296ebb3f0861532/master/pass/Culture-EA-FC24_Screenshot_EPL_4k_CityCele.jpg",
    },
    {
      value: "5",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf3WODwZnCUMfFeWXgUueAeJmKCC1uJ0O2Ig&s",
    },
    {
      value: "6",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf3WODwZnCUMfFeWXgUueAeJmKCC1uJ0O2Ig&s",
    },
    {
      value: "7",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf3WODwZnCUMfFeWXgUueAeJmKCC1uJ0O2Ig&s",
    },
    {
      value: "8",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf3WODwZnCUMfFeWXgUueAeJmKCC1uJ0O2Ig&s",
    },
    {
      value: "9",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf3WODwZnCUMfFeWXgUueAeJmKCC1uJ0O2Ig&s",
    },
    {
      value: "10",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf3WODwZnCUMfFeWXgUueAeJmKCC1uJ0O2Ig&s",
    },
    {
      value: "11",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf3WODwZnCUMfFeWXgUueAeJmKCC1uJ0O2Ig&s",
    },
    {
      value: "12",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf3WODwZnCUMfFeWXgUueAeJmKCC1uJ0O2Ig&s",
    },
    {
      value: "13",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf3WODwZnCUMfFeWXgUueAeJmKCC1uJ0O2Ig&s",
    },
    {
      value: "14",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf3WODwZnCUMfFeWXgUueAeJmKCC1uJ0O2Ig&s",
    },
    {
      value: "15",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf3WODwZnCUMfFeWXgUueAeJmKCC1uJ0O2Ig&s",
    },
    {
      value: "16",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf3WODwZnCUMfFeWXgUueAeJmKCC1uJ0O2Ig&s",
    },
    {
      value: "17",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf3WODwZnCUMfFeWXgUueAeJmKCC1uJ0O2Ig&s",
    },
    {
      value: "18",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf3WODwZnCUMfFeWXgUueAeJmKCC1uJ0O2Ig&s",
    },
    {
      value: "19",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf3WODwZnCUMfFeWXgUueAeJmKCC1uJ0O2Ig&s",
    },
    {
      value: "0",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf3WODwZnCUMfFeWXgUueAeJmKCC1uJ0O2Ig&s",
    },
    {
      value: "20",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf3WODwZnCUMfFeWXgUueAeJmKCC1uJ0O2Ig&s",
    },
    {
      value: "21",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf3WODwZnCUMfFeWXgUueAeJmKCC1uJ0O2Ig&s",
    },
    {
      value: "22",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf3WODwZnCUMfFeWXgUueAeJmKCC1uJ0O2Ig&s",
    },
  ];
  const favorites = [
    {
      value: "1",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwvJWnvrFvge1Nhr61-isRuZpr2G26MlrqwQ&s",
    },
    { value: "2", uri: "https://img2.rtve.es/i/?w=1600&i=1632450182030.jpg" },
    { value: "3", uri: "https://img2.rtve.es/i/?w=1600&i=1632450182030.jpg" },
    {
      value: "4",
      uri: "https://media.wired.com/photos/64b6962b6296ebb3f0861532/master/pass/Culture-EA-FC24_Screenshot_EPL_4k_CityCele.jpg",
    },
  ];

  const ref = useRef();
  const followRef = useRef();

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

  const followedPress = () => {
    followRef.current?.setPage(0);
    setViewFollow(0);
  };
  const followerPress = () => {
    followRef.current?.setPage(1);
    setViewFollow(1);
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
  const [filteredData, setFilteredData] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const jwt = await getItem("jwt");
      const profileData = await UserApi.getProfile(jwt);
      const categoriesData = await CategorieApi.getCategories(jwt);
      const followsData = await UserApi.getFollows(jwt);
      const followedData = await UserApi.getFollowed(jwt);

      setProfile(profileData);
      setCategories(categoriesData);
      setFollows(followsData);
      setFollowed(followedData);
    };

    fetchData();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);

    // Array de nombres de los meses
    const months = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];

    // Obtener el mes y el año
    const month = months[date.getUTCMonth()]; // getUTCMonth() devuelve el mes de 0 a 11
    const year = date.getUTCFullYear();

    // Formatear la cadena de salida
    return `Se unió en ${month} del ${year}`;
  }

  const searchFilter = (text, type) => {
    if (text && type === 0) {
      const newData = followed.filter((item) => {
        const itemData = item.user_name
          ? (item.user_name + " " + item.name + item.last_name).toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else if (text && type === 1) {
      const newData = follows.filter((item) => {
        const itemData = item.user_name
          ? (item.user_name + " " + item.name + item.last_name).toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else if (text === "" && type === 0) {
      setFilteredData(followed);
    } else if (text === "" && type === 1) {
      setFilteredData(follows);
    } else {
      console.log("error al filtrar datos");
      setFilteredData([]);
    }
  };

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      {Object.keys(Profile).length === 0 ? (
        <View className="pt-[10%] ">
          <ActivityIndicator color={"#000"} size="large" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-row items-center w-[100%] h-20 mt-1 p-4 absolute z-10 justify-end	">
            <Link href="/">
              <Logout color="white" />
            </Link>
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
          <View className="w-[100%] h-[410] bg-white mt-[-6] rounded-t-xl items-center z-20">
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
              onPress={() => copyToClipboard("@" + Profile.user_name)}
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

            <ScrollView
              className="mr-auto mt-2 mb-4 relative"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View className="flex-row h-7 pl-2 pr-2">
                {categories.map((categorie) => (
                  <Pressable
                    className="bg-[#6D7278]/10 flex-row rounded-xl items-center mr-1 p-1"
                    key={categorie.value}
                  >
                    <Compass className="ml-2" size={20} name={categorie.icon} />
                    <Text className="ml-2 mr-2">{categorie.name}</Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>

            <View className="flex-row  justify-between w-[80%] mb-8">
              <Modal
                animationType="slide"
                visible={followModal}
                transparent={true}
                onRequestClose={() => setFollowModal(false)}
              >
                <View className="bg-[#fff] flex-1">
                  <View className="flex-row m-4">
                    <Pressable onPress={() => setFollowModal(false)}>
                      <Left />
                    </Pressable>
                    <Text className="pl-4">{Profile.user_name}</Text>
                  </View>
                  <View className="flex-row ">
                    <Pressable
                      style={{ opacity: !viewFollow ? 1 : 0.5 }}
                      onPress={() => {
                        followedPress();
                        searchFilter(text, 0);
                      }}
                      className="w-[50%] p-1 items-center opacity-50	"
                    >
                      <Text>Seguidos</Text>
                      <Text className="text-base font-bold">
                        {followed.length}
                      </Text>
                    </Pressable>
                    <Pressable
                      style={{ opacity: viewFollow ? 1 : 0.5 }}
                      onPress={() => {
                        followerPress();
                        searchFilter(text, 1);
                      }}
                      className="w-[50%] border-b-2 p-1 items-center "
                    >
                      <Text>Seguidores</Text>
                      <Text className="text-base font-bold">
                        {follows.length}
                      </Text>
                    </Pressable>
                  </View>
                  <View className="p-3">
                    <TextInput
                      style={{
                        height: 40,
                        width: 380,
                        backgroundColor: "#f3f3f3",
                        padding: 10,
                        paddingStart: 40,
                        borderRadius: 5,
                      }}
                      placeholder="Buscar"
                      onChangeText={(text) => {
                        searchFilter(text, viewFollow);
                        setText(text);
                      }}
                    />
                    <LupaIcon className="absolute p-5 opacity-40" />
                  </View>
                  <PagerView
                    ref={followRef}
                    initialPage={viewFollow}
                    scrollEnabled={false}
                    style={{ flex: 1 }}
                  >
                    <View key="0">
                      <FlatList
                        className=""
                        data={filteredData}
                        renderItem={({ item }) => (
                          <View>
                            <CardUser user={item} />
                          </View>
                        )}
                        keyExtractor={(item) => item.follow_id}
                      />
                    </View>

                    <View key="1">
                      <FlatList
                        className=""
                        data={filteredData}
                        renderItem={({ item }) => (
                          <View>
                            <CardUser user={item} />
                          </View>
                        )}
                        keyExtractor={(item) => item.follow_id}
                      />
                    </View>
                  </PagerView>
                </View>
              </Modal>
              <Pressable
                onPress={() => {
                  setFollowModal(true);
                  setViewFollow(0);
                  searchFilter("", 0);
                }}
                className="w-[120] border-2 rounded-lg p-1 items-center "
              >
                <Text className="text-base font-bold">{followed.length}</Text>
                <Text>Seguidos</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setFollowModal(true);
                  setViewFollow(1);
                  searchFilter("", 1);
                }}
                className="w-[120] border-2 rounded-lg p-1 items-center "
              >
                <Text className="text-base font-bold">{follows.length}</Text>
                <Text>Seguidores</Text>
              </Pressable>
            </View>
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
                    key={post.value}
                    style={styles.box}
                    source={{
                      uri: post.uri,
                    }}
                  />
                ))}
              </View>

              <View style={styles.grid} key="1">
                {favorites.map((fav) => (
                  <Image
                    key={fav.value}
                    style={styles.box}
                    source={{
                      uri: fav.uri,
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
