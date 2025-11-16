import { loginUserAPI } from "@/api/user.api";
import { useAuthStore } from "@/hooks/auth-store";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const Login = () => {
  const passwordRef = useRef<TextInput>(null);
  const router = useRouter();

  const setAuth = useAuthStore((state) => state.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await loginUserAPI(email, password);
      const { token, data: user } = res.data;

      await setAuth(token, user);
      alert("Logged in");
      router.push("/");
    } catch (error) {
      alert("Error logging in");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 justify-between items-center flex-col py-10 px-4">
        <View className="mt-10">
          <Text className="font-elms">Logo Here</Text>
        </View>
        <View className="flex justify-center items-center w-full flex-col gap-y-6">
          <TextInput
            className={`font-elms border-2 border-neutral-800/70 w-[350px] rounded-full pl-6 ${Platform.OS === "ios" && "h-[55px]"} text-lg font-semibold text-neutral-800`}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
          <TextInput
            ref={passwordRef}
            className={`font-elms border-2 border-neutral-800/70 w-[350px] rounded-full pl-6 ${Platform.OS === "ios" && "h-[55px]"} placeholder:text-lg font-semibold text-neutral-800`}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            returnKeyType="done"
            secureTextEntry
          />
        </View>
        <View className="flex justify-center items-center w-full flex-col gap-y-6">
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-neutral-800 w-[350px] rounded-full py-5"
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text className="text-center font-elms text-neutral-200 text-lg font-semibold">
                Login
              </Text>
            )}
          </TouchableOpacity>
          <View className="flex justify-center items-center text-center w-full flex-row gap-x-1">
            <Text className="font-elms">New to IQ Test App?</Text>
            <Text
              className="font-bold underline font-elms"
              onPress={() => router.push("/register")}
            >
              Create Account
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
