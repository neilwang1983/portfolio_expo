import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TextInput } from "react-native";
import { Stack, router } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { SubmitButton } from "@/components/SubmitButton";
import { FetchAPI } from "@/functions/FetchAPI";

export default function PasswordResetScreen() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function ResetPassword() {
    FetchAPI("forgot/" + email).then((data) => {
      //console.log(data);
      setMessage(data[0].Message);
    });
  }

  return (
    <>
      <Stack.Screen name="PasswordResetScreen" options={{ title: "Reset Password", headerBackTitle: "Back" }} />
      <Wrapper>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <View style={styles.logo_box}>
            <Image style={styles.logo} source={require("@/assets/images/logo.png")} />
          </View>
          <View style={styles.title_box}>
            <Text style={styles.title}>MindField Online</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#666"
            autoCapitalize="none"
            autoComplete="email"
            onChangeText={(email) => setEmail(email)}
          />

          <Text style={{ width: 250, lineHeight: 20, color: "red" }}>{message}</Text>

          <SubmitButton disabled={false} style={styles.button} onPress={() => ResetPassword()} text="Reset Password" />
        </View>
      </Wrapper>
    </>
  );
}

const styles = StyleSheet.create({
  logo_box: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    width: 110,
    height: 110,
  },
  logo: {
    width: 90,
    height: 90,
    resizeMode: "stretch",
  },
  title_box: {
    borderBottomWidth: 2,
    borderBottomColor: "#ffb027",
    margin: 20,
  },
  title: {
    textShadowColor: "rgba(255,255,255,0.5)",
    textShadowRadius: 0,
    textShadowOffset: { width: 0, height: 1 },
    marginBottom: 5,
    color: "#333",
    fontSize: 25,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#aeaeae",
    borderStyle: "solid",
    borderRadius: 5,
    width: 220,
    height: 34,
    margin: 10,
    paddingLeft: 10,
    color: "#333",
    fontFamily: "Montserrat",
  },
  button: {
    width: 160,
    marginBottom: 100,
  },
});
