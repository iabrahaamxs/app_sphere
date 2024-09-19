import { View } from "react-native";
import { Login } from "../components/Login";
import { Bubbles } from "../components/Bubbles";
import React, { useEffect } from "react";

export default function Index() {
  return (
    <View className="flex-1">
      <Bubbles />
      <Login />
    </View>
  );
}
