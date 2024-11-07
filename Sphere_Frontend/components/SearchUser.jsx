import { Link } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { getItem } from "../utils/AsyncStorage";

const SearchUser = ({ item }) => {
  const [id, setId] = useState(null);

  const fetchData = async () => {
    const id = await getItem("id");
    setId(id);
  };
  fetchData();

  return (
    <Link
      href={`${item.id == id ? "/myProfile" : "/user/" + item.id}`}
      asChild
    >
      <Pressable>
        <View className="flex-row ml-2 mb-1 ">
          <Image
            source={{ uri: item.photo }}
            style={{
              resizeMode: "contain",
              width: 55,
              height: 55,
              borderRadius: 999999,
              borderWidth: 1,
              borderColor: "#462E84",
            }}
          />
          <View className="pl-3">
            <Text className="text-base font-medium">{item.name}</Text>
            <Text className="opacity-80">{item.user_name}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default SearchUser;
