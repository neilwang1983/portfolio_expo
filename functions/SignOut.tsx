import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function SignOut() {
  try {
    await AsyncStorage.removeItem("@username");
    await SecureStore.deleteItemAsync("userCredentials");
    await fetch("https://mindfieldonline.com/user/api/logout");
  } catch (e) {
    console.log(e);
  }
}
