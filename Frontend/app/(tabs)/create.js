import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Create() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: "#fff",
        flex: 1,
      }}
    ></View>
  );
}
