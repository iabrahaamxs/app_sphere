import { StyleSheet, Text, View, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
//import { Link } from 'expo-router';
const icon = require("../assets/sphereColor.png");

export function Login() {
  const insets = useSafeAreaInsets();
  return (
    <View>
      <View className="justify-center items-center">
        <View className="bg-[#B8B3D3]/30 w-[110%] h-[430] rounded-full absolute"></View>
      </View>

      <View className="justify-center">
        <View className="bg-[#B8B3D3]/30 w-[300] h-[300] rounded-full absolute m-[60%]"></View>
      </View>

      <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
        <Text className="text-2xl font-bold pl-8 pt-8">Iniciar sesion</Text>
        <Text className="text-xs pl-8 ">Bienvenido !</Text>

        <View className="items-center mt-[60]">
        <Image source={icon} style={{resizeMode: 'contain', width: 140, alignItems: 'center'}}/>
        </View>

        
      </View>

      
    </View>
  );
}
