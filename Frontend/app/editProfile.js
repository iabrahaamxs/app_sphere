import { Pressable, Text, View, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Chevrons } from "../components/Icons";

export default function EditProfile() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {},
          headerTitle: "Editar perfil",
          headerShadowVisible: false,
        }}
      />
      <Link href="/infoPersonal" asChild>
        <Pressable
          style={styles.pressable}
          className="flex-row bg-white w-[75%] h-[60] self-center justify-between items-center px-8"
        >
          <Text>Información personal</Text>
          <Chevrons />
        </Pressable>
      </Link>

      <Link href="/accountSettings" asChild>
        <Pressable
          style={styles.pressable}
          className="flex-row bg-white w-[75%] h-[60] self-center justify-between items-center px-8"
        >
          <Text>Configuración de cuenta</Text>
          <Chevrons />
        </Pressable>
      </Link>
      <Link href="/security" asChild>
        <Pressable
          style={styles.pressable}
          className="flex-row bg-white w-[75%] h-[60] self-center justify-between items-center px-8"
        >
          <Text>Seguridad</Text>
          <Chevrons />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  pressable: {
    padding: 20,
    borderRadius: 10,
    // Propiedades para sombra en iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // Propiedades para sombra en Android
    elevation: 10,
    marginTop: 30,
  },
});
