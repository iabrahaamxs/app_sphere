import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import SearchUser from "../components/SearchUser";
import SearchTag from "../components/SearchTag";
import Post from "../components/Post";

export default function Search() {
  const [text, setText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filterType, setFilterType] = useState("account");

  const users = [
    {
      id: "1",
      name: "Luis",
      userName: "luiss1",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKmDZfsJe6TJPmkiuGQsyD8e0UyJJmZCKIfg&s",
    },
    {
      id: "2",
      name: "Maria",
      userName: "Mariaa1",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKmDZfsJe6TJPmkiuGQsyD8e0UyJJmZCKIfg&s",
    },
    {
      id: "3",
      name: "Carlos",
      userName: "carloss1",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKmDZfsJe6TJPmkiuGQsyD8e0UyJJmZCKIfg&s",
    },
    {
      id: "4",
      name: "Juan",
      userName: "juann1",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKmDZfsJe6TJPmkiuGQsyD8e0UyJJmZCKIfg&s",
    },
  ];

  const posts = getPosts();

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
      const regex = new RegExp(`#${text}\\w*`, "g");
      const tagCounts = {};

      posts.forEach((post) => {
        const tags = post.description.match(regex);

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
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {},
          headerTitle: "Buscar",
          headerShadowVisible: false,
          headerSearchBarOptions: {
            autoFocus: true,
            placeholder: "buscar",
            onChangeText: (e) => {
              setText(e.nativeEvent.text);
              searchFilter(e.nativeEvent.text, filterType);
            },
          },
        }}
      />

      <View className="flex-row justify-between	w-[90%] self-end px-3 mt-2">
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
        data={filteredData}
        renderItem={({ item, index }) => (
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
      userName: "Luiss",
      date: "11/08/2024",
      description: "primer post #primero #ucla",
      photo:
        "https://s0.smartresize.com/wallpaper/376/67/HD-wallpaper-video-game-charactors-creatures-game-video-charactors.jpg",
    },
    {
      id: "2",
      userName: "Maria",
      date: "11/08/2024",
      description:
        "segundooo este tendra mas textoooooooo para ver como se veeeeee post #segundo #ucla",
      photo:
        "https://s0.smartresize.com/wallpaper/376/67/HD-wallpaper-video-game-charactors-creatures-game-video-charactors.jpg",
    },
    {
      id: "3",
      userName: "Pedroo",
      date: "10/08/2024",
      description: "tresss post #tress #ucla",
      photo:
        "https://s0.smartresize.com/wallpaper/376/67/HD-wallpaper-video-game-charactors-creatures-game-video-charactors.jpg",
    },
    {
      id: "4",
      userName: "Luiss",
      date: "10/08/2024",
      description: "primer post tambieeen #primero #ucla",
      photo:
        "https://s0.smartresize.com/wallpaper/376/67/HD-wallpaper-video-game-charactors-creatures-game-video-charactors.jpg",
    },
    {
      id: "5",
      userName: "Carlosss",
      date: "09/08/2024",
      description: "primer post tambieeen #primera #ucla",
      photo:
        "https://s0.smartresize.com/wallpaper/376/67/HD-wallpaper-video-game-charactors-creatures-game-video-charactors.jpg",
    },
    {
      id: "0",
      userName: "Juann",
      date: "08/08/2024",
      description: "primer post #prim #ucla",
      photo:
        "https://s0.smartresize.com/wallpaper/376/67/HD-wallpaper-video-game-charactors-creatures-game-video-charactors.jpg",
    },
  ];
}