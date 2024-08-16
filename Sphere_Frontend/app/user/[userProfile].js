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
import { getUser } from "../(tabs)/search";
//const User_icon = require("../../assets/User_icon.png");

export default function UserProfile() {
  const { userProfile } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState(null);
  const users = getUser();
  const [follow, setFollow] = useState(false);

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

  useEffect(() => {
    if (userProfile) {
      const newUser = users.find((user) => user.id === userProfile);
      setUser(newUser);
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
            <Pressable onPress={() => copyToClipboard("@" + user.userName)}>
              <Share color="white" />
            </Pressable>
          </View>
          <Image
            source={{ uri: user.photo }}
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
              source={{ uri: user.photo }}
              style={{
                resizeMode: "contain",
                width: 130,
                height: 130,
                borderRadius: 99999,
                shadowColor: "#000",
              }}
            />

            <Text className="text-xl">{user.name}</Text>
            <Text className="text-sm mt-1">{"@" + user.userName}</Text>
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
              <Text className="ml-2">Venezuela</Text>
            </View>
            <View className=" flex-row w-[100%] p-1 ml-1">
              <Calendar />
              <Text className="ml-1.5">Se unió en agosto del 2024</Text>
            </View>

            <ScrollView
              className="mr-auto pl-2 mt-1 relative"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View className="flex-row h-7">
                <Pressable className="bg-[#6D7278]/10 flex-row rounded-xl items-center mr-1 p-1">
                  <Compass className="ml-2" size={20} />
                  <Text className="ml-2 mr-2">Arcade</Text>
                </Pressable>
              </View>
            </ScrollView>

            <View className="flex-row  justify-between w-[80%] mb-5">
              <View className="w-[120] border-2 rounded-lg p-1 items-center">
                <Text className="text-base font-bold">200</Text>
                <Text>Seguidos</Text>
              </View>
              <View className="w-[120] border-2 rounded-lg p-1 items-center">
                <Text className="text-base font-bold">7300</Text>
                <Text>Seguidores</Text>
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <Text className="p-2 text-base">Publicaciones</Text>
            <View style={styles.grid}>
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
