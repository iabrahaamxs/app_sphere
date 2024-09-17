import {
  Pressable,
  Text,
  View,
  StyleSheet,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SelectDropdown from "react-native-select-dropdown";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import {
  Calendar,
  Earth,
  Gender,
  MailIcon,
  Phone,
  UserIcon,
} from "../components/Icons";
import { getItem } from "../utils/AsyncStorage";
import { UserApi } from "../api/userApi";
import { formatDMY, formatYMD, timeElapsed } from "../utils/FormatDate";
import { getCountries } from "../api/countriesApi";

export default function EditProfile() {
  const insets = useSafeAreaInsets();
  const genders = [
    { title: "Masculino", icon: 1 },
    { title: "Femenino", icon: 2 },
  ];

  const [user, setUser] = React.useState({});
  const [name, setName] = React.useState(user.name);
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [birthday, setBirthday] = React.useState(new Date());
  const [country, setCountry] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [countries, setCountries] = useState([]);
  const [countryModal, setCountryModal] = useState(false);
  const [countryId, setCountryId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const id = await getItem("id");
      const profileData = await UserApi.getProfile(id);
      const countryData = await getCountries();
      setUser(profileData);
      setCountries(countryData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setLastName(user.last_name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setBirthday(user.birthdate || "");
      setCountry(user.country || "");
      setCountryId(user.country_id || "");
      setGender(user.gender || "");
    }
  }, [user]);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    setBirthday(currentDate);
    setShow(true);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      maximumDate: new Date(),
      mode: currentMode,
      is24Hour: false,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const update = async () => {
    const res = await UserApi.updateInformation(
      name,
      lastName,
      email.toLowerCase(),
      phone,
      formatYMD(birthday),
      countryId,
      gender,
      user.user_id
    );

    if (res) {
      setErrorMessage("");
      setSuccessMessage(
        "Tu información personal ha sido actualizada con éxito!!"
      );
    } else {
      setSuccessMessage("");
      setErrorMessage("No se pudo actualizar tu información personal");
    }

    //console.log(user, "es userrr");
  };

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      {Object.keys(user).length != 0 ? (
        <View>
          <Stack.Screen
            options={{
              headerShown: true,
              headerStyle: {},
              headerTitle: "Información personal",
              headerShadowVisible: false,
            }}
          />

          <View className="flex-row items-center ml-3">
            <UserIcon />
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              onChangeText={setName}
              value={name}
            />
          </View>

          <View className="flex-row items-center ml-3">
            <UserIcon />
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              onChangeText={setLastName}
              value={lastName}
            />
          </View>

          <View className="flex-row items-center ml-3">
            <MailIcon className="ml-[-3]" />
            <TextInput
              style={styles.input}
              placeholder="Correo electronico"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
          </View>

          <View className="flex-row items-center ml-3">
            <Phone />
            <TextInput
              style={styles.input}
              placeholder="Numero de telefono"
              keyboardType="number-pad"
              onChangeText={setPhone}
              value={phone}
            />
          </View>

          <View className="flex-row items-center ml-3">
            <Calendar />
            <Pressable style={styles.input} onPress={showDatepicker}>
              {show ? (
                <Text> {formatDMY(birthday)}</Text>
              ) : (
                <Text>{formatDMY(birthday)}</Text>
              )}
            </Pressable>
          </View>

          <View className="flex-row items-center ml-3">
            <Earth className="opacity-80" />
            <Modal visible={countryModal} transparent={true}>
              <View className="bg-[#000]/40 flex-1 justify-center	items-center">
                <View className="w-[80%] h-[40%] bg-white">
                  <ScrollView>
                    {countries.map((country) => (
                      <Pressable
                        onPress={() => [
                          setCountryModal(false),
                          setCountry(country.country),
                          setCountryId(country.country_id),
                        ]}
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
            <Pressable
              style={styles.input}
              onPress={() => setCountryModal(true)}
            >
              <View>
                {!country ? (
                  <Text className="opacity-50">País</Text>
                ) : (
                  <Text>{country}</Text>
                )}
              </View>
            </Pressable>
          </View>

          <View className="flex-row items-center ml-3">
            <Gender />
            <SelectDropdown
              data={genders}
              onSelect={(selectedItem, index) => {
                setGender(selectedItem.title);
                console.log(selectedItem, index);
              }}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View style={styles.input}>
                    {selectedItem && selectedItem.title ? (
                      <Text>{selectedItem.title}</Text>
                    ) : (
                      <Text>{gender}</Text>
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

          {errorMessage && (
            <Text className="text-red-700	self-center">{errorMessage}</Text>
          )}
          {successMessage && (
            <Text className="text-lime-500	self-center">{successMessage}</Text>
          )}

          <Pressable
            onPress={update}
            style={({ pressed }) => ({
              backgroundColor: pressed ? "#513Ab1" : "#462E84",
              height: 40,
              margin: 8,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
            })}
          >
            <Text className="text-white">Actualizar</Text>
          </Pressable>
        </View>
      ) : (
        <View></View>
      )}
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
