import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Login } from "./components/Login.jsx";

export default function App() {
  return (
    <SafeAreaProvider>
      <View ClassName="bg-slate-700">
        <StatusBar style="auto" />
        <Login />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
