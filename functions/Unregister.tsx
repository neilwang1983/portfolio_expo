import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function Unregister() {
  try {
    await AsyncStorage.removeItem("@username");
    await SecureStore.deleteItemAsync("userCredentials");
    await fetch("https://mindfieldonline.com/user/api/delete");
  } catch (e) {
    console.log(e);
  }
}
