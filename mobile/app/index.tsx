import { useAuthStore } from "@/hooks/auth-store";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = async () => {
    await logout();
    alert("Logged out");
    router.push("/login");
  };

  return user ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-neutral-800 text-xl">{user?._id}</Text>
      <Text className="text-neutral-800 text-xl">{user?.username}</Text>
      <Text className="text-neutral-800 text-xl">{user?.name}</Text>
      <TouchableOpacity
        onPress={handleLogout}
        className="bg-neutral-800 px-4 py-1.5 rounded"
      >
        <Text className="text-neutral-200 text-xl">Logout</Text>
      </TouchableOpacity>
    </View>
  ) : (
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
        <Text className="text-neutral-200 text-xl font-elms">Login</Text>
      </TouchableOpacity>
    </View>
  );
}
