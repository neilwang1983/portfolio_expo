import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TextInput } from "react-native";
import { Stack, router } from "expo-router";
import { FetchAPI } from "@/functions/FetchAPI";
import { SignIn } from "@/functions/SignIn";
import { Wrapper } from "@/components/Wrapper";
import { SubmitButton } from "@/components/SubmitButton";
import HTMLView from "react-native-htmlview";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function CheckLogin() {
    setLoading(true);
    SignIn(email, password).then((login) => {
      //console.log(login);
      FetchAPI("login_check").then((response) => {
        setLoading(false);
        if (response[0].status == 1) {
          router.replace("/");
        } else {
          setMessage(response[0].message);
        }
      });
    });
  }

  return (
    <>
      <Stack.Screen name="LoginScreen" options={{ title: "Login", headerShown: false }} />
      <Wrapper>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <View style={styles.LogoBackground}>
            <Image style={styles.LogoImage} source={require("@/assets/images/logo.png")} />
          </View>
          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: "#ffb027",
              margin: 20,
            }}
          >
            <Text style={styles.LogoTitle}>MindField Online</Text>
          </View>

          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#666"
            autoFocus={true}
            autoCapitalize="none"
            autoComplete="email"
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#666"
            returnKeyType="done"
            autoComplete="password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            onSubmitEditing={() => {
              CheckLogin();
            }}
          />

          <View style={{ width: 250 }}>
            <Text onPress={() => router.push("/password_reset")} style={styles.ResetButtonText}>
              Forgot Password?
            </Text>
          </View>

          <View style={{ width: 250, marginVertical: 10 }}>
            <HTMLView stylesheet={HtmlViewStyles} value={"<p>" + message + "</p>"} />
          </View>

          <SubmitButton disabled={loading} style={styles.Submit} onPress={() => CheckLogin()} text="Login" />

          <Text
            onPress={() =>
              router.push({
                pathname: "/tfa",
                params: {
                  from: "Login",
                  destination: "/register",
                },
              })
            }
            style={styles.SignupButtonText}
          >
            Not a member? Sign Up!
          </Text>
        </View>
      </Wrapper>
    </>
  );
}
const HtmlViewStyles = {
  p: {
    color: "#FF3366",
    fontFamily: "Montserrat",
    lineHeight: 18,
  },
};

const styles = StyleSheet.create({
  Submit: {
    width: 150,
    marginTop: 10,
    marginBottom: 30,
  },
  LogoBackground: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    width: 110,
    height: 110,
  },
  LogoImage: {
    width: 90,
    height: 90,
    resizeMode: "stretch",
  },
  LogoTitle: {
    textShadowColor: "rgba(255,255,255,0.5)",
    textShadowRadius: 0,
    textShadowOffset: { width: 0, height: 1 },
    marginBottom: 5,
    color: "#333",
    fontSize: 25,
    fontWeight: "600",
    fontFamily: "Montserrat",
  },
  TextInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#aeaeae",
    borderStyle: "solid",
    borderRadius: 5,
    width: 250,
    height: 38,
    margin: 5,
    paddingLeft: 10,
    color: "#333",
    fontFamily: "Montserrat",
  },
  LoginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fec151",
    borderColor: "#f0b35b",
    borderWidth: 1,
    borderRadius: 30,
    width: 150,
    padding: 10,
    marginHorizontal: 5,
  },
  LoginButtonText: {
    color: "rgba(0,0,0,0.7)",
    textShadowColor: "rgba(255,255,255,0.5)",
    textShadowRadius: 0,
    textShadowOffset: { width: 0, height: 1 },
    fontFamily: "MontserratSemiBold",
  },
  SignupButtonText: {
    color: "#207fe6",
    textShadowColor: "rgba(255,255,255,0.5)",
    textShadowRadius: 0,
    textShadowOffset: { width: 0, height: 1 },
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  ResetButtonText: {
    textAlign: "right",
    color: "#207fe6",
    textShadowColor: "rgba(255,255,255,0.5)",
    textShadowRadius: 0,
    textShadowOffset: { width: 0, height: 1 },
    marginBottom: 10,
    fontFamily: "Montserrat",
  },
});
