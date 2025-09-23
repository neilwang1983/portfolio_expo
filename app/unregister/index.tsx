import React from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Stack, router } from "expo-router";
import { Unregister } from "@/functions/Unregister";
import { Wrapper } from "@/components/Wrapper";

export default function UnregisterScreen() {
  return (
    <>
      <Stack.Screen name="ResetPasswordScreen" options={{ title: "Reset Password" }} />
      <Wrapper>
        <ScrollView>
          <View style={styles.box}>
            <Text style={styles.title}>Delete Account</Text>
            <Text style={styles.p}>
              Cancelling this account will delete all saved information for the account which includes your personal information as well as your study
              history. Additionally, any monies earned and not requested will be forfeited. There is no way to recover this information once the
              account is deleted. If you prefer to keep the account live and opt out of receiving future emails, please send an email to
              support@mindfieldonline.com specifying your request.
            </Text>

            <Text style={styles.p}>
              Keep in mind that you might be in a sample for studies already in the field so it may take as long as two weeks to be completely removed
              from our system.
            </Text>

            <Text style={[styles.p, { fontWeight: "bold" }]}>Are you sure you want to cancel your membership?</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                Unregister().then((response) => {
                  console.log(response);
                  router.replace("/login");
                });
              }}
            >
              <Text style={styles.label}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Wrapper>
    </>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    padding: 20,
  },
  p: {
    color: "#333",
    marginTop: 20,
    fontFamily: "Montserrat",
  },
  span: {
    color: "#333",
    fontFamily: "Montserrat",
  },
  title: {
    fontSize: 24,
    fontFamily: "Montserrat",
    fontWeight: 600,
  },
  bullet: {
    color: "#333",
    marginTop: 10,
    fontSize: 20,
    fontFamily: "Montserrat",
    fontWeight: 600,
  },
  bold: {
    fontFamily: "Montserrat",
    fontWeight: 600,
  },
  button: {
    marginVertical: 30,
    marginHorizontal: 0,
    backgroundColor: "#fff",
    paddingVertical: 6,
    borderStyle: "solid",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    color: "#ff222c",
    textAlign: "center",
    lineHeight: 40,
    fontFamily: "Montserrat",
    fontWeight: 600,
  },
});
