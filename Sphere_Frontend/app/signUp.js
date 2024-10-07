import { Link, Stack } from "expo-router";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getCountries } from "../api/countriesApi";
import { setItem } from "../utils/AsyncStorage";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Modal,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  UserIcon,
  MailIcon,
  Phone,
  UserName,
  Earth,
  Gender,
} from "../components/Icons";
import { validateFieldsSignUp } from "../utils/Validations";

export default function SignUp() {
  const [userData, setUserData] = useState({
    name: "",
    last_name: "",
    email: "",
    phone: "",
    user_name: "",
    country: 0,
    gender: "",
  });
  const [countries, setCountries] = useState([]);
  const [countryTXT, setCountryTXT] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const NewUser = {};
  const [countryModal, setCountryModal] = useState(false);
  const [genderModal, setGenderModal] = useState(false);
  const genders = [
    { title: "Masculino", id: 1 },
    { title: "Femenino", id: 2 },
  ];

  useEffect(() => {
    async function fetchCountries() {
      const res = await getCountries();
      setCountries(res);
    }

    fetchCountries();
  }, []);

  const handleInputChange = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    });
  };

  const handleNextStep = async () => {
    setLoading(true);

    const errorMessage = await validateFieldsSignUp(userData);
    if (errorMessage) {
      setLoading(false);
      setErrorMessage(errorMessage);
      return;
    }

    await setItem("new-user", userData);
    router.push("/signUp2");
    setErrorMessage("");
    setLoading(false);
  };

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
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          onChangeText={(value) => handleInputChange("name", value)}
          value={userData.name}
        />
      </View>

      <View className="flex-row items-center ml-3">
        <UserIcon />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          onChangeText={(value) => handleInputChange("last_name", value)}
          value={userData.last_name}
        />
      </View>

      <View className="flex-row items-center ml-3">
        <MailIcon className="ml-[-3]" />
        <TextInput
          style={styles.input}
          placeholder="Correo electronico"
          keyboardType="email-address"
          onChangeText={(value) => handleInputChange("email", value)}
          value={userData.email}
        />
      </View>

      <View className="flex-row items-center ml-3">
        <Phone />
        <TextInput
          style={styles.input}
          placeholder="Numero de telefono"
          keyboardType="number-pad"
          onChangeText={(value) => handleInputChange("phone", value)}
          value={userData.phone}
        />
      </View>

      <View className="flex-row items-center ml-3">
        <UserName />
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          onChangeText={(value) => handleInputChange("user_name", value)}
          value={userData.user_name}
        />
      </View>

      <View className="flex-row items-center ml-3">
        <Earth className="opacity-80" />
        <Modal visible={countryModal} transparent={true}>
          <View className="bg-[#000]/40 flex-1 justify-center	items-center">
            <View className="w-[80%] h-[40%] bg-white">
              <ScrollView>
                {countries.map((country) => (
                  <Pressable
                    onPress={() => {
                      setCountryModal(false);
                      setCountryTXT(country.country);
                      handleInputChange("country", country.country_id);
                    }}
                    className="border-[0.5px] h-8 justify-center"
                    key={country.country_id}
                  >
                    <Text className="self-center justify-center">
                      {country.country}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
        <Pressable style={styles.input} onPress={() => setCountryModal(true)}>
          <View>
            {!countryTXT ? (
              <Text className="opacity-50">País</Text>
            ) : (
              <Text>{countryTXT}</Text>
            )}
          </View>
        </Pressable>
      </View>

      <View className="flex-row items-center ml-3">
        <Gender />
        <Modal visible={genderModal} transparent={true}>
          <View className="bg-[#000]/40 flex-1 justify-center	items-center">
            <View className="w-[80%] h-[auto] bg-white py-2">
              {genders.map((gender) => (
                <Pressable
                  onPress={() => {
                    setGenderModal(false);
                    handleInputChange("gender", gender.title);
                  }}
                  className="border-[0.5px] h-8 justify-center mb-1"
                  key={gender.id}
                >
                  <Text className="self-center justify-center">
                    {gender.title}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </Modal>
        <Pressable style={styles.input} onPress={() => setGenderModal(true)}>
          <View>
            {!userData.gender ? (
              <Text className="opacity-50">Género</Text>
            ) : (
              <Text>{userData.gender}</Text>
            )}
          </View>
        </Pressable>
      </View>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <Pressable
        onPress={handleNextStep}
        disabled={loading}
        style={({ pressed }) => ({
          backgroundColor: pressed ? "#513Ab1" : "#462E84",
          height: 40,
          margin: 8,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
        })}
      >
        <Text className="text-white">
          {loading ? <ActivityIndicator color="#fff" /> : "Continuar"}
        </Text>
      </Pressable>

      <View className="flex-row justify-center mt-4">
        <Text>¿Ya tiene una cuenta?</Text>
        <Link href="/login" className="pl-1">
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
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 8,
  },
});
