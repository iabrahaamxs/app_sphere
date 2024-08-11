import { View } from "react-native";
import { Login } from "../components/Login";
import { Bubbles } from "../components/Bubbles";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  useEffect(() => {
    const hideSplashScreen = async () => {
      // Simula un retraso para cargar recursos o hacer preparativos
      await new Promise((resolve) => setTimeout(resolve, 1000));
      SplashScreen.hideAsync();
    };
    hideSplashScreen();
  }, []);

  return (
    <View className="flex-1">
      <Bubbles />
      <Login />
    </View>
  );
}
