import { Stack } from "expo-router";
import React, { useRef, useState } from "react";
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
import { UserApi } from "../../api/userApi";
import { PostApi } from "../../api/postsApi";
import PagerView from "react-native-pager-view";

export default function Search() {
  const [text, setText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filterType, setFilterType] = useState("account");
  const [viewPage, setViewPage] = useState(0);
  const ref = useRef();

  const debounceTimer = useRef(null); // Ref para almacenar el temporizador

  const onChangeSearch = (txt) => {
    setText(txt);
    searchFilter(txt, filterType);
  };

  const pressAccount = () => {
    setFilterType("account");
    searchFilter(text, "account");
    ref.current?.setPage(0);
    setViewPage(0);
  };

  const pressTag = () => {
    setFilterType("tag");
    searchFilter(text, "tag");
    ref.current?.setPage(1);
    setViewPage(1);
  };

  const pressPost = () => {
    setFilterType("post");
    searchFilter(text, "post");
    ref.current?.setPage(2);
    setViewPage(2);
  };

  const searchFilter = (txt, type) => {
    // Limpiar el temporizador anterior antes de establecer uno nuevo
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Establecer un nuevo temporizador para esperar 500ms antes de realizar la búsqueda
    debounceTimer.current = setTimeout(async () => {
      if (type === "account" && txt) {
        const users = await UserApi.searchUsers(txt);
        setFilteredUsers(users);
      } else if (type === "tag" && txt) {
        const tags = await PostApi.getHashtags(txt);
        setFilteredTags(tags);
      } else if (type === "post" && txt) {
        const posts = await PostApi.getPostsByDescription(txt);
        setFilteredPosts(posts);
      } else {
        setFilteredUsers([]);
        setFilteredTags([]);
        setFilteredPosts([]);
      }
    }, 500);
  };

  return (
    <View className="flex-1 bg-white">
      {<StatusBar style="dark" />}
      <Stack.Screen
        options={{
          headerRight: () => (
            <View className="flex-1 p-3 w-[113%] self-center">
              <TextInput
                style={{
                  height: 40,
                  width: "93%",
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

      <PagerView
        className="mt-2"
        ref={ref}
        initialPage={viewPage}
        scrollEnabled={false}
        style={{ flex: 1 }}
      >
        <View key="0">
          <FlatList
            className=""
            data={filteredUsers}
            renderItem={({ item }) => (
              <View>
                <SearchUser item={item} />
              </View>
            )}
            keyExtractor={(item, index) => index}
          />
        </View>

        <View key="1">
          <FlatList
            className=""
            data={filteredTags}
            renderItem={({ item }) => (
              <View>
                <SearchTag item={item} />
              </View>
            )}
            keyExtractor={(item, index) => index}
          />
        </View>

        <View key="2">
          <FlatList
            className=""
            data={filteredPosts}
            renderItem={({ item }) => (
              <View>
                <Post item={item} />
              </View>
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
      </PagerView>
    </View>
  );
}
