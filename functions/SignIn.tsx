import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export async function SignIn(email?: string, password?: string) {
  const formData = new FormData();

  if (email && password) {
    formData.append("Email", email);
    formData.append("Password", password);
    const credentials = { email, password };
    try {
      await SecureStore.setItemAsync(
        "userCredentials",
        JSON.stringify(credentials)
      );
    } catch (e) {
      console.log(e);
    }
  } else {
    const credentials = await SecureStore.getItemAsync("userCredentials");
    //console.log("Value of Credentials:", credentials);
    if (credentials) {
      const keys = JSON.parse(credentials);
      formData.append("Email", keys.email);
      formData.append("Password", keys.password);
    }
  }

  //retrive device infomation from local storage
  let deviceType = await AsyncStorage.getItem("@devicetype");
  let deviceToken = await AsyncStorage.getItem("@devicetoken");

  deviceType ? formData.append("deviceType", deviceType) : null;
  deviceToken ? formData.append("deviceToken", deviceToken) : null;

  //console.log(formData);

  let response = await fetch("https://mindfieldonline.com/user/api/signin", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("HTTP Request Error");
  }
}
