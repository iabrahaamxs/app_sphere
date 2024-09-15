import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { getItem } from "../../utils/AsyncStorage";
import { UserApi } from "../../api/userApi";
import { LupaIcon } from "../../components/Icons";
import PagerView from "react-native-pager-view";
import CardUser from "../../components/CardUser";

export default function Follower() {
  const { follower } = useLocalSearchParams();

  const [Profile, setProfile] = useState({});
  const [follows, setFollows] = useState([]);
  const [followed, setFollowed] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [viewFollow, setViewFollow] = useState(0);
  const followRef = useRef();
  const [text, setText] = useState("");

  const followedPress = () => {
    followRef.current?.setPage(0);
    setViewFollow(0);
  };
  const followerPress = () => {
    followRef.current?.setPage(1);
    setViewFollow(1);
  };
  const fetchData = async () => {
    const id = await getItem("id");
    const profileData = await UserApi.getProfile(id);
    const followsData = await UserApi.getFollows(id);
    const followedData = await UserApi.getFollowed(id);

    setProfile(profileData);
    setFollows(followsData);
    setFollowed(followedData);

    parseInt(follower) === 0
      ? setFilteredData(followedData)
      : setFilteredData(followsData);
  };
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
      setFilteredData([]);
    }
  };

  useEffect(() => {
    fetchData();

    searchFilter("", parseInt(follower));
    setViewFollow(parseInt(follower));
  }, []);

  return (
    <View className="flex-1 pl-1 bg-white ">
      {Object.keys(Profile).length != 0 ? (
        <>
          <Stack.Screen
            options={{
              headerShown: true,
              headerStyle: {},
              headerTitle: Profile.user_name,
              headerShadowVisible: false,
            }}
          />

          <View className="bg-[#fff] flex-1">
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
                <Text className="text-base font-bold">{followed.length}</Text>
              </Pressable>
              <Pressable
                style={{ opacity: viewFollow ? 1 : 0.5 }}
                onPress={() => {
                  followerPress();
                  searchFilter(text, 1);
                }}
                className="w-[50%] p-1 items-center "
              >
                <Text>Seguidores</Text>
                <Text className="text-base font-bold">{follows.length}</Text>
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
        </>
      ) : (
        <View></View>
      )}
    </View>
  );
}

// const styles = StyleSheet.create({
//   input: {
//     width: "85%",
//     maxHeight: 40,
//     margin: 12,
//     borderWidth: 0.5,
//     padding: 10,
//     borderRadius: 6,
//   },
// });
