import React, { useState, useCallback } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Stack, router, useLocalSearchParams, useFocusEffect } from "expo-router";
import { FetchAPI } from "@/functions/FetchAPI";
import { CheckSession } from "@/functions/CheckSession";
import { Wrapper } from "@/components/Wrapper";
import { SubmitButton } from "@/components/SubmitButton";

function CashoutResultScreen() {
  const { method } = useLocalSearchParams<{
    method: string;
  }>();

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  //check login session when screen is focused
  useFocusEffect(
    useCallback(() => {
      CheckSession().then((session) => {
        session.status == 0 ? router.replace("/login") : cashout();
      });
    }, [])
  );

  const cashout = () => {
    if (method !== "undefined") {
      FetchAPI("cashout/" + method).then((response) => {
        console.log(response);
        setMessage(response[1].errors[0].message.replace(/\+/g, " "));
        if (response[1].errors[0].code == "000") {
          setSuccess(true);
        }
      });
    } else {
      setMessage("Payment method is not specified, please try agian.");
    }
  };

  return (
    <>
      <Stack.Screen name="CashoutResultScreen" options={{ headerShown: false }} />
      <Wrapper>
        <SafeAreaView style={{ flex: 1, width: "100%" }}>
          <View style={styles.Contianer}>
            <View style={{ width: "100%" }}>
              <Text style={styles.Title}>Cashout</Text>
              <Text style={styles.Content}>
                Please note the weekly automation of payaments take place every Monday. If monday is a holiday then they are processed on the next
                business day. All payment are in the U.S. Dollar denomination.
              </Text>
              <Text style={styles.Message}>{message}</Text>
            </View>

            {success ? (
              <SubmitButton disabled={false} style={styles.SubmitButton} onPress={() => router.replace("/")} text="OK" />
            ) : (
              <SubmitButton disabled={false} style={styles.SubmitButton} onPress={() => router.replace("/cashout")} text="Try Again" />
            )}
          </View>
        </SafeAreaView>
      </Wrapper>
    </>
  );
}

export default CashoutResultScreen;

const styles = StyleSheet.create({
  Contianer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  Title: {
    fontSize: 26,
    color: "#333",
    fontFamily: "Montserrat",
    fontWeight: 600,
    marginBottom: 20,
  },
  Content: {
    color: "#333",
    marginTop: 5,
    fontFamily: "Montserrat",
  },
  Message: {
    color: "red",
    marginTop: 10,
    fontFamily: "Montserrat",
    fontWeight: 400,
  },
  SubmitButton: {
    width: 200,
    marginTop: 20,
    marginBottom: 30,
  },
  TextButton: {
    marginTop: 50,
    fontSize: 16,
    color: "#666",
    textShadowColor: "rgba(255,255,255,0.5)",
    textShadowRadius: 0,
    textShadowOffset: { width: 0, height: 1 },
    fontFamily: "Montserrat",
    fontWeight: 400,
  },
});
