import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput, StyleSheet, Alert } from "react-native";
import { Stack, router } from "expo-router";
import { PostAPI } from "@/functions/PostAPI";
import { SubmitButton } from "@/components/SubmitButton";
import { Wrapper } from "@/components/Wrapper";

export default function PasswordChangeScreen() {
  const [message, setMessage] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [password3, setPassword3] = useState("");
  const [loading, setLoading] = useState(false);

  function ChangePassword() {
    setLoading(true);
    const formData = new FormData();
    formData.append("*", password1);
    formData.append("*", password2);
    formData.append("*", password3);
    //console.log(formData);
    PostAPI("*", formData).then((data) => {
      setLoading(false);
      //console.log(data);
      if (data[1].errors[0].code == "000") {
        Successfull();
      } else {
        setMessage(data[1].errors[0].message.replace(/\+/g, " "));
      }
    });
  }

  function Successfull() {
    Alert.alert("Congratulations!", "Your password is now updated successfully", [{ text: "OK", onPress: () => router.push("/profile") }], {
      cancelable: false,
    });
  }

  return (
    <>
      <Stack.Screen name="PasswordChangeScreen" options={{ title: "Reset Password", headerBackTitle: "Back" }} />
      <Wrapper>
        <SafeAreaView style={{ flex: 1, width: "100%" }}>
          <View style={{ flex: 1, padding: "10%" }}>
            <View>
              <Text style={styles.Title}>Change Password</Text>
              <Text style={styles.Subtitle}>Please enter your current password and the password you wish to change to below.</Text>
            </View>
            <Text style={styles.TextLabel}>Current Password</Text>
            <TextInput style={styles.TextInput} placeholderTextColor="#666" secureTextEntry={true} onChangeText={(text) => setPassword1(text)} />
            <Text style={styles.TextLabel}>New Password</Text>
            <TextInput style={styles.TextInput} placeholderTextColor="#666" secureTextEntry={true} onChangeText={(text) => setPassword2(text)} />
            <TextInput style={styles.TextInput} placeholderTextColor="#666" secureTextEntry={true} onChangeText={(text) => setPassword3(text)} />
            <Text style={styles.ErrorMessage}>{message}</Text>
            <SubmitButton disabled={loading} style={styles.SubmitButton} onPress={() => ChangePassword()} text="Change Password" />
          </View>
        </SafeAreaView>
      </Wrapper>
    </>
  );
}

const styles = StyleSheet.create({
  Title: {
    textAlign: "left",

    fontSize: 26,
    marginBottom: 20,
    fontFamily: "Montserrat",
    fontWeight: 600,
  },
  Subtitle: {
    marginBottom: 20,
    color: "#666",
    fontFamily: "Montserrat",
  },
  TextLabel: {
    marginTop: 20,
    textAlign: "left",
    color: "#333",
    fontFamily: "Montserrat",
  },
  TextInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#aeaeae",
    borderStyle: "solid",
    borderRadius: 5,
    width: "100%",
    height: 40,
    marginVertical: 10,
    padding: 10,
    color: "#333",
    fontFamily: "Montserrat",
  },
  SubmitButton: {
    width: 200,
    marginTop: 10,
    marginBottom: 30,
    alignSelf: "center",
  },
  ErrorMessage: {
    marginVertical: 10,
    color: "red",
    fontFamily: "Montserrat",
  },
});
