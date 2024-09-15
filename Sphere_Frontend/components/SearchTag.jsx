import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

const SearchTag = ({ item }) => {
  const route = item.hashtag.slice(1).toString();

  return (
    <Link href={`/${route}`} asChild>
      <Pressable className="flex-row ml-2 mb-1 ">
        <Image
          source={{
            uri: "https://cdn-icons-png.freepik.com/512/1827/1827975.png",
          }}
          style={{
            resizeMode: "contain",
            width: 55,
            height: 55,
            borderRadius: 999999,
            //borderWidth: 1,
            //borderColor: "#462E84",
          }}
        />
        <View className="pl-3">
          <Text className="text-base font-medium">{item.hashtag}</Text>
          <Text className="opacity-80">{item.post_count} publicaciones</Text>
        </View>
      </Pressable>
    </Link>
  );
};

export default SearchTag;
