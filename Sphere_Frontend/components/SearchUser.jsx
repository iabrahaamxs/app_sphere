import { Image, Text, View } from "react-native"

const SearchUser=({item})=>{
    return (
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
              <Text className="opacity-80">{item.userName}</Text>
            </View>
          </View>
    )
}

export default SearchUser