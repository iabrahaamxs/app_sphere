import { Link, router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

const CardUser = ({ user }) => {
  const { user_id, name, last_name, photo, user_name } = user;

  return (
    <View className="w-[100%] flex-row justify-between	items-center px-2 mb-2">
      <Pressable
        onPress={() => {
          router.navigate(`/user/${user_id}`);
        }}
        className="flex-row basis-2/3"
      >
        <Image
          source={{ uri: photo }}
          style={{
            resizeMode: "contain",
            width: 50,
            height: 50,
            borderRadius: 99999,
            backgroundColor: "#000",
          }}
        />
        <View className="ml-2">
          <Text>{user_name}</Text>
          <Text className="opacity-50">
            {name} {last_name}
          </Text>
        </View>
      </Pressable>

      <Pressable className="w-[100] border-2 rounded-lg p-1 items-center mr-4">
        <Text>follow</Text>
      </Pressable>
    </View>
  );
};

export default CardUser;
