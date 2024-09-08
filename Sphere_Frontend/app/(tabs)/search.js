import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import SearchUser from "../../components/SearchUser";
import SearchTag from "../../components/SearchTag";
import Post from "../../components/Post";

import { LupaIcon } from "../../components/Icons";

export default function Search() {
  const [text, setText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filterType, setFilterType] = useState("account");

  const users = getUser();
  const posts = getPosts();

  const onChangeSearch = (txt) => {
    setText(txt);
    searchFilter(txt, filterType);
  };

  const pressAccount = () => {
    setFilterType("account");
    searchFilter(text, "account");
  };

  const pressTag = () => {
    setFilterType("tag");
    searchFilter(text, "tag");
  };

  const pressPost = () => {
    setFilterType("post");
    searchFilter(text, "post");
  };

  const searchFilter = (text, type) => {
    if (text && type === "account") {
      const newData = users.filter((item) => {
        const itemData = item.userName
          ? item.userName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else if (text && type === "post") {
      const newData = posts.filter((item) => {
        const itemData = item.description
          ? item.description.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else if (text && type === "tag") {
      const regex = new RegExp(`#${text.toLocaleLowerCase()}\\w*`, "g");
      const tagCounts = {};

      posts.forEach((post) => {
        const tags = post.description.toLocaleLowerCase().match(regex);

        if (tags) {
          tags.forEach((tag) => {
            if (tagCounts[tag]) {
              tagCounts[tag] += 1;
            } else {
              tagCounts[tag] = 1;
            }
          });
        }
      });

      setFilteredData(Object.entries(tagCounts).sort());
    } else {
      setFilteredData([]);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {<StatusBar style="dark" />}
      <Stack.Screen
        options={{
          headerRight: () => (
            <View className="flex-1 p-3">
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
                onChangeText={(text) => onChangeSearch(text)}
              />
              <LupaIcon className="absolute p-5 opacity-40" />
            </View>
          ),
          headerShown: true,
          headerStyle: {},
          headerTitle: "",
          headerShadowVisible: false,
          //headerSearchBarOptions: {
          //  autoFocus: true,
          //  placeholder: "buscar",
          //  onChangeText: (e) => {
          //    setText(e.nativeEvent.text);
          //    searchFilter(e.nativeEvent.text, filterType);
          //  },
          //},
        }}
      />

      <View className="flex-row justify-between	w-[90%] self-center px-3 mt-2">
        <Pressable onPress={pressAccount}>
          <Text
            style={{
              opacity: filterType === "account" ? 1 : 0.6,
              borderBottomWidth: filterType === "account" ? 1 : 0,
              borderColor: "#462E84",
            }}
          >
            Cuentas
          </Text>
        </Pressable>
        <Pressable onPress={pressTag}>
          <Text
            style={{
              opacity: filterType === "tag" ? 1 : 0.6,
              borderBottomWidth: filterType === "tag" ? 1 : 0,
              borderColor: "#462E84",
            }}
          >
            Etiquetas
          </Text>
        </Pressable>
        <Pressable onPress={pressPost}>
          <Text
            style={{
              opacity: filterType === "post" ? 1 : 0.6,
              borderBottomWidth: filterType === "post" ? 1 : 0,
              borderColor: "#462E84",
            }}
          >
            Publicaciones
          </Text>
        </Pressable>
      </View>

      <FlatList
        className="pt-2"
        data={filteredData}
        renderItem={({ item }) => (
          <View>
            {filterType === "account" ? (
              <SearchUser item={item} />
            ) : (
              <View></View>
            )}
            {filterType === "tag" ? <SearchTag item={item} /> : <View></View>}
            {filterType === "post" ? <Post item={item} /> : <View></View>}
          </View>
        )}
        keyExtractor={(item, index) => (item.id ? item.id : index)}
      />
    </View>
  );
}

export function getPosts() {
  return [
    {
      id: "1",
      userId: "1",
      userName: "Luiss",
      date: "11/08/2024",
      description: "primer post #primero #ucla",
      photo:
        "https://s0.smartresize.com/wallpaper/376/67/HD-wallpaper-video-game-charactors-creatures-game-video-charactors.jpg",
    },
    {
      id: "2",
      userId: "2",
      userName: "Maria",
      date: "11/08/2024",
      description:
        "segundooo este tendra mas textoooooooo para ver como se veeeeee post #segundo #ucla",
      photo:
        "https://s0.smartresize.com/wallpaper/376/67/HD-wallpaper-video-game-charactors-creatures-game-video-charactors.jpg",
    },
    {
      id: "3",
      userId: "5",
      userName: "Pedroo",
      date: "10/08/2024",
      description: "tresss post #tressSS #ucla",
      photo:
        "https://s0.smartresize.com/wallpaper/376/67/HD-wallpaper-video-game-charactors-creatures-game-video-charactors.jpg",
    },
    {
      id: "4",
      userId: "1",
      userName: "Luiss",
      date: "10/08/2024",
      description: "primer post tambieeen #primero #ucla",
      photo:
        "https://s0.smartresize.com/wallpaper/376/67/HD-wallpaper-video-game-charactors-creatures-game-video-charactors.jpg",
    },
    {
      id: "5",
      userId: "3",
      userName: "Carlosss",
      date: "09/08/2024",
      description: "primer post tambieeen #primera #ucla",
      photo:
        "https://s0.smartresize.com/wallpaper/376/67/HD-wallpaper-video-game-charactors-creatures-game-video-charactors.jpg",
    },
    {
      id: "0",
      userId: "4",
      userName: "Juann",
      date: "08/08/2024",
      description: "primer post #prim #ucla",
      photo:
        "https://s0.smartresize.com/wallpaper/376/67/HD-wallpaper-video-game-charactors-creatures-game-video-charactors.jpg",
    },
  ];
}

export function getUser() {
  return [
    {
      id: "1",
      name: "Luis",
      userName: "luiss1",
      bio: "esta es la cuenta de Luis",
      photo:
        "https://us.123rf.com/450wm/saripuddin/saripuddin2301/saripuddin230100001/197800879-gamer-esport-gaming-mascota-logo-dise%C3%B1o-ilustraci%C3%B3n-vector-perfil-de-un-hombre-barbudo-con-capucha.jpg",
    },
    {
      id: "2",
      name: "Maria",
      userName: "Mariaa1",
      bio: "esta es la cuenta de maria",
      photo:
        "https://us.123rf.com/450wm/saripuddin/saripuddin2301/saripuddin230100001/197800879-gamer-esport-gaming-mascota-logo-dise%C3%B1o-ilustraci%C3%B3n-vector-perfil-de-un-hombre-barbudo-con-capucha.jpg",
    },
    {
      id: "3",
      name: "Carlos",
      userName: "carloss1",
      bio: "esta es la cuenta de carlos",
      photo:
        "https://us.123rf.com/450wm/saripuddin/saripuddin2301/saripuddin230100001/197800879-gamer-esport-gaming-mascota-logo-dise%C3%B1o-ilustraci%C3%B3n-vector-perfil-de-un-hombre-barbudo-con-capucha.jpg",
    },
    {
      id: "4",
      name: "Juan",
      userName: "juann1",
      bio: "esta es la cuenta de Juan",
      photo:
        "https://us.123rf.com/450wm/saripuddin/saripuddin2301/saripuddin230100001/197800879-gamer-esport-gaming-mascota-logo-dise%C3%B1o-ilustraci%C3%B3n-vector-perfil-de-un-hombre-barbudo-con-capucha.jpg",
    },
    {
      id: "5",
      name: "Pedroo",
      userName: "pedrooo1999",
      bio: "esta es la cuenta de pedro",
      photo:
        "https://us.123rf.com/450wm/saripuddin/saripuddin2301/saripuddin230100001/197800879-gamer-esport-gaming-mascota-logo-dise%C3%B1o-ilustraci%C3%B3n-vector-perfil-de-un-hombre-barbudo-con-capucha.jpg",
    },
  ];
}
