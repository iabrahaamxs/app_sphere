import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  Location,
  Calendar,
  Compass,
  Left,
  Share,
  Grid,
  Bookmark,
  Logout,
} from "../../components/Icons";
import { Link } from "expo-router";
import { useRef, useState } from "react";
import PagerView from "react-native-pager-view";
import * as Clipboard from "expo-clipboard";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const User_icon = require("../../assets/User_icon.png");

export default function MyProfile() {
  const insets = useSafeAreaInsets();
  const [viewPost, setViewPost] = useState(true);
  const [user, setUser] = useState("Abrahaaam");
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

  const categories = [
    { value: 1, icon: "hand-rock", name: "Acción" },
    { value: 2, icon: "heart-pulse", name: "Aventura" },
    { value: 3, icon: "compass", name: "Arcade" },
    { value: 4, icon: "soccer-ball", name: "Deporte" },
    { value: 5, icon: "lightbulb", name: "Estrategia" },
    { value: 6, icon: "explosion", name: "Simulación" },
    { value: 7, icon: "chess-knight", name: "Mesa" },
    { value: 8, icon: "guitar", name: "Musicales" },
  ];

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

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center w-[100%] h-20 mt-1 p-4 absolute z-10 justify-end	">
          <Link href="/">
            <Logout color="white" />
          </Link>
        </View>
        <Image
          source={User_icon}
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
            source={User_icon}
            style={{
              resizeMode: "contain",
              width: 130,
              height: 130,
              borderRadius: 99999,
              shadowColor: "#000",
            }}
          />

          <Text className="text-xl">Abraham Almao</Text>
          <Text className="text-sm mt-1">{"@" + user}</Text>
          <Text className="text-sm p-2">
            Mi primera cuenta en esta app! Aqui puede ir mas texto que pasa si
            sobre pasas chevereee
          </Text>

          <Pressable
            className=" flex-row p-1.5 rounded-lg bg-[#462E84] "
            onPress={() => copyToClipboard("@" + user)}
          >
            <Share className="ml-2" color="white" />
            <Text className="text-white ml-3 mr-2">Compartir perfil</Text>
          </Pressable>

          <View className=" flex-row w-[100%] p-1 ml-2.5">
            <Location />
            <Text className="ml-2">Venezuela</Text>
          </View>
          <View className=" flex-row w-[100%] p-1 ml-1">
            <Calendar />
            <Text className="ml-1.5">Se unió en agosto del 2024</Text>
          </View>

          <ScrollView
            className="mr-auto mt-1 relative"
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

          <View className="flex-row  justify-between w-[80%] mb-5">
            <View className="w-[120] border-2 rounded-lg p-1 items-center ">
              <Text className="text-base font-bold">200</Text>
              <Text>Seguidos</Text>
            </View>
            <View className="w-[120] border-2 rounded-lg p-1 items-center">
              <Text className="text-base font-bold">5M</Text>
              <Text>Seguidores</Text>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <View className="p-2 flex-row justify-between w-[85%] self-center	">
            <Pressable
              onPress={() => postPress()}
              className="flex-row items-center"
            >
              <Grid />
              <Text className="text-base pl-2">Publicaciones</Text>
            </Pressable>
            <Pressable
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
