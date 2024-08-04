import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import { Link, Stack } from "expo-router";
import {
  UserIcon,
  MailIcon,
  Phone,
  UserName,
  Earth,
  Gender,
} from "../components/Icons";
import SelectDropdown from "react-native-select-dropdown";
import { useRouter } from "expo-router";

export default function SignUp() {
  const genders = [
    { title: "Masculino", icon: 1 },
    { title: "Femenino", icon: 2 },
  ];

  const countries = [
    { title: "Venezuela", id: 1 },
    { title: "Colombia", id: 2 },
    { title: "Ecuador", id: 3 },
    { title: "Perú", id: 4 },
  ];

  const router = useRouter();

  return (
    <View className="flex-1 pl-1 bg-white">
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {},
          headerTitle: "Crear cuenta",
          headerShadowVisible: false,
        }}
      />
      <Text className="ml-4">
        Crea una cuenta completando el siguiente formulario
      </Text>

      <View className="flex-row items-center ml-3">
        <UserIcon />
        <TextInput style={styles.input} placeholder="Nombre" />
      </View>

      <View className="flex-row items-center ml-3">
        <UserIcon />
        <TextInput style={styles.input} placeholder="Apellido" />
      </View>

      <View className="flex-row items-center ml-3">
        <MailIcon className="ml-[-3]" />
        <TextInput
          style={styles.input}
          placeholder="Correo electronico"
          keyboardType="email-address"
        />
      </View>

      <View className="flex-row items-center ml-3">
        <Phone />
        <TextInput style={styles.input} placeholder="Numero de telefono" />
      </View>

      <View className="flex-row items-center ml-3">
        <UserName />
        <TextInput style={styles.input} placeholder="Nombre de usuario" />
      </View>

      <View className="flex-row items-center ml-3">
        <Earth className="opacity-80" />
        <SelectDropdown
          data={countries}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.input}>
                {selectedItem && selectedItem.title ? (
                  <Text>{selectedItem.title}</Text>
                ) : (
                  <Text className="opacity-50">País</Text>
                )}
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: "#D2D9DF" }),
                }}
              >
                <Text>{item.title}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View className="flex-row items-center ml-3">
        <Gender />
        <SelectDropdown
          data={genders}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.input}>
                {selectedItem && selectedItem.title ? (
                  <Text>{selectedItem.title}</Text>
                ) : (
                  <Text className="opacity-50">Género</Text>
                )}
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: "#D2D9DF" }),
                }}
              >
                <Text>{item.title}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Link href="/signUp2" asChild>
        <Pressable
          style={
            {
              backgroundColor: false ? "#513Ab1" : "#462E84",
              height: 40,
              margin: 8,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
            }
          }
        >
          <Text className="text-white">Continuar</Text>
        </Pressable>
      </Link>

     

      <View className="flex-row justify-center mt-4">
        <Text>¿Ya tiene una cuenta?</Text>
        <Link href="/" className="pl-1">
          <Text className="font-bold">Inicia sesión</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 6,
    flexGrow: 1,
  },

  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
});
