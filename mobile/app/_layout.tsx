import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import "../global.css";
import { ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [loaded] = useFonts({
    ElmsSans: require("../assets/fonts/NotoSans.ttf"),
  });

  if (!loaded) return <ActivityIndicator size="large" />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
