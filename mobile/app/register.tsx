import { registerUserAPI } from "@/api/user.api";
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

const Register = () => {
  const passwordRef = useRef<TextInput>(null);
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await registerUserAPI(name, email, password);
      alert("Account created");
      router.push("/login");
    } catch (error) {
      alert("Error registering user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 justify-between items-center flex-col py-10 px-4">
        <View className="mt-10">
          <Text>Logo Here</Text>
        </View>
        <View className="flex justify-center items-center w-full flex-col gap-y-6">
          <TextInput
            className={`border-2 border-neutral-800/70 w-[350px] rounded-full pl-6 ${Platform.OS === "ios" && "h-[55px]"} text-lg font-semibold text-neutral-800`}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
          <TextInput
            ref={passwordRef}
            className={`border-2 border-neutral-800/70 w-[350px] rounded-full pl-6 ${Platform.OS === "ios" && "h-[55px]"} text-lg font-semibold text-neutral-800`}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
          <TextInput
            ref={passwordRef}
            value={password}
            onChangeText={setPassword}
            className={`border-2 border-neutral-800/70 w-[350px] rounded-full pl-6 ${Platform.OS === "ios" && "h-[55px]"} placeholder:text-lg font-semibold text-neutral-800`}
            placeholder="Enter your password"
            onSubmitEditing={() => passwordRef.current?.focus()}
            returnKeyType="next"
            secureTextEntry
          />
          <TextInput
            ref={passwordRef}
            className={`border-2 border-neutral-800/70 w-[350px] rounded-full pl-6 ${Platform.OS === "ios" && "h-[55px]"} placeholder:text-lg font-semibold text-neutral-800`}
            placeholder="Confirm password"
            returnKeyType="done"
            secureTextEntry
          />
        </View>
        <View className="flex justify-center items-center w-full flex-col gap-y-6">
          <TouchableOpacity
            onPress={handleRegister}
            className="bg-neutral-800 w-[350px] rounded-full py-5"
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text className="text-center text-neutral-200 text-lg font-semibold">
                Register
              </Text>
            )}
          </TouchableOpacity>
          <View className="flex justify-center items-center text-center w-full flex-row gap-x-1">
            <Text>Already already exist?</Text>
            <Text
              className="font-bold underline"
              onPress={() => router.push("/login")}
            >
              Sign In
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;
