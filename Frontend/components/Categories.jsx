import { Pressable, ScrollView, Text, View } from "react-native";
import { Compass } from "./Icons";

const Categories = ({ categories }) => {
  return categories.length > 0 ? (
    <View className="mr-auto h-11 justify-center items-center">
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          flexGrow: 1,
        }}
        style={{ flexGrow: 0 }}
      >
        <View className="flex-row h-7 pl-2 pr-2">
          {categories.map((categorie) => (
            <Pressable
              className="bg-[#6D7278]/10 flex-row rounded-xl items-center mr-1 p-1"
              key={categorie.value}
            >
              <Compass className="ml-2" size={20} name={categorie.icon} />
              <Text className="ml-2 mr-2">{categorie.name}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  ) : null;
};

export default Categories;
