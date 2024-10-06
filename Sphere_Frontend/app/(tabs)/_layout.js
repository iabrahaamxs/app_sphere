import { Link, Tabs } from "expo-router";
import { House, LupaIcon, Settings, UserIcon } from "../../components/Icons";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#462E84",
        tabBarStyle: {
          position: "absolute",
          height: 60,
          backgroundColor: "#fff",
          //borderTopLeftRadius: 20,
          //borderTopRightRadius: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.12,
          shadowRadius: 5,
          elevation: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <House color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Buscar",
          tabBarIcon: ({ color }) => <LupaIcon color={color} />,
        }}
      />

      {/* Botón central personalizado */}
      <Tabs.Screen
        name="create"
        options={{
          tabBarButton: (props) => (
            <Link href={`/createPost`} asChild>
              <TouchableOpacity
                style={styles.addButton}
                // onPress={() => {
                //   // Aquí defines lo que ocurre al presionar el botón central
                // }}
              >
                <Ionicons name="add" size={30} color="#fff" />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />

      <Tabs.Screen
        name="editProfile"
        options={{
          title: "Configuración",
          tabBarIcon: ({ color }) => <Settings color={color} />,
        }}
      />
      <Tabs.Screen
        name="myProfile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => <UserIcon color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#462E84",
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -30, // Esto eleva el botón por encima de la barra de pestañas
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
});
