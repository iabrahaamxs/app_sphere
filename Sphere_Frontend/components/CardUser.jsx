import { Image, Pressable, Text, View } from "react-native";

const CardUser = () => {
  return (
    <View className="w-[100%] flex-row justify-between	items-center px-2 mb-2">
      <View className="flex-row">
        <Image
          style={{
            resizeMode: "contain",
            width: 50,
            height: 50,
            borderRadius: 99999,
            backgroundColor: "#000",
          }}
        />
        <View className="ml-2">
          <Text>user</Text>
          <Text className="opacity-50">name lastname</Text>
        </View>
      </View>
      <Pressable className="w-[100] border-2 rounded-lg p-1 items-center mr-4">
        <Text>follow</Text>
      </Pressable>
    </View>
  );
};

export default CardUser;
