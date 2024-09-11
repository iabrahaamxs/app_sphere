import { Pressable, Text, View, StyleSheet, TextInput } from "react-native";
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
import { timeElapsed } from "../utils/FormatDate";

export default function EditProfile() {
  const insets = useSafeAreaInsets();
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

  const [user, setUser] = React.useState({});
  const [name, setName] = React.useState(user.name);
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [birthday, setBirthday] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [gender, setGender] = React.useState("");

  useEffect(() => {
    const fetchData = async () => {
      const id = await getItem("id");
      const profileData = await UserApi.getProfile(id);
      setUser(profileData);
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
      setGender(user.gender || "");
    }
  }, [user]);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
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
            <Text> {date.toLocaleDateString()}</Text>
          ) : (
            <Text>{timeElapsed(birthday)}</Text>
          )}
        </Pressable>
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
                  <Text>{country}</Text>
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

      <Pressable
        style={{
          backgroundColor: false ? "#513Ab1" : "#462E84",
          height: 40,
          margin: 8,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
        }}
      >
        <Text className="text-white">Actualizar</Text>
      </Pressable>
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
