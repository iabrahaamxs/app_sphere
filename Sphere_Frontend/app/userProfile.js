import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import { UserCheck, Location, Calendar, Compass } from "../components/Icons";
const User_icon = require("../assets/User_icon.png");

export default function App() {
  return (
    <View className="">
      <Image
        source={User_icon}
        style={{
          resizeMode: "cover",
          width: "110%",
          height: 140,
          alignSelf: "center",
        }}
      />
      <View className="w-[100%] h-[400] bg-white mt-[-6] rounded-t-xl items-center">
        <Image
          className="mt-[-65]"
          source={User_icon}
          style={{
            resizeMode: "contain",
            width: 130,
            height: 130,
            borderRadius: 99999,
            shadowColor: "#000",
          }}
        />

        <Text className="text-xl">Madeleine Toussaint</Text>
        <Text className="text-sm mt-1">@MadeleineToussaint</Text>
        <Text className="text-sm p-2">
          Mi primera cuenta en esta app! Aqui puede ir mas texto que pasa si
          sobre pasas chevereee
        </Text>

        <Pressable className="bg-[#462E84] flex-row p-1.5 rounded-lg ">
          <UserCheck className="ml-2" color="white" />
          <Text className="text-white ml-3 mr-2 text-base ">Seguir</Text>
        </Pressable>

        <View className=" flex-row w-[100%] p-1 ml-2.5">
          <Location />
          <Text className="ml-2">Venezuela</Text>
        </View>
        <View className=" flex-row w-[100%] p-1 ml-1">
          <Calendar />
          <Text className="ml-1.5">Se unió en agosto del 2024</Text>
        </View>
       
        <ScrollView className="mr-auto pl-2 relative" horizontal={true}>
          <View className="flex-row h-7">
            <Pressable className="bg-[#6D7278]/10 flex-row rounded-xl items-center mr-1 p-1">
              <Compass className="ml-2" size={20} />
              <Text className="ml-2 mr-2">Arcade</Text>
            </Pressable>
          </View>
        </ScrollView>

        <View className="flex-row">
          <View className="">
            <Text>200</Text>
            <Text>Seguidos</Text>
          </View>
          <View>
            <Text>7300</Text>
            <Text>Seguidores</Text>
          </View>
        </View>
       
      </View>
    </View>
  );
}
