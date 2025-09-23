import React from "react";
import type { PropsWithChildren } from "react";
import { Platform } from "react-native";
import { StyleSheet, KeyboardAvoidingView } from "react-native";

export function Wrapper({ children }: PropsWithChildren) {
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      {children}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
