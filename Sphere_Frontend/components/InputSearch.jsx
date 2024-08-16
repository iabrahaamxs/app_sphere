import { TextInput, View } from "react-native";
import { Search } from "./Icons";
import { onChangeSearch } from "../app/(tabs)/search";

const InputSearch = () => {
  return (
    <View className="flex-1 p-3">
      <TextInput
        style={{
          height: 40,
          width: 380,
          backgroundColor: "#f3f3f3",
          padding: 10,
          paddingStart: 40,
          borderRadius: 5,
        }}
        placeholder="Buscar"
        onChangeText={(text) => onChangeSearch(text)}
      />
      <Search className="absolute p-5 opacity-40" />
    </View>
  );
};

export default InputSearch;
