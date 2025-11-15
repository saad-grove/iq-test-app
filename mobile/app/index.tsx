import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => router.push("/login")}
        className="bg-neutral-800 px-4 py-1.5 rounded"
      >
        <Text className="text-neutral-200 text-xl">Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
}
