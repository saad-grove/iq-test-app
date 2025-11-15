import { useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";

const Login = () => {
  const passwordRef = useRef<TextInput>(null);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 justify-between items-center flex-col py-10 px-4">
        <View className="mt-10">
          <Text>Logo Here</Text>
        </View>
        <View className="flex justify-center items-center w-full flex-col gap-y-6">
          <TextInput
            className={`border-2 border-neutral-800/70 w-[350px] rounded-full pl-6 ${Platform.OS === "ios" && "h-[55px]"} text-lg font-semibold text-neutral-800`}
            placeholder="Enter your email"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
          <TextInput
            ref={passwordRef}
            className={`border-2 border-neutral-800/70 w-[350px] rounded-full pl-6 ${Platform.OS === "ios" && "h-[55px]"} placeholder:text-lg font-semibold text-neutral-800`}
            placeholder="Enter your password"
            returnKeyType="done"
            secureTextEntry
          />
        </View>
        <View className="flex justify-center items-center w-full flex-col gap-y-6">
          <TouchableOpacity className="bg-neutral-800 w-[350px] rounded-full py-5">
            <Text className="text-center text-neutral-200 text-lg font-semibold">
              Login
            </Text>
          </TouchableOpacity>
          <View className="flex justify-center items-center text-center w-full flex-row gap-x-1">
            <Text>New to IQ Test App?</Text>
            <Text className="font-bold underline">Create Account</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
