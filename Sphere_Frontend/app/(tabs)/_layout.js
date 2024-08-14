import { Tabs } from "expo-router";
import { House, LupaIcon, Settings, UserIcon } from "../../components/Icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#462E84",
      }}
    >
      <Tabs.Screen
        name="home"
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
