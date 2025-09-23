import React from "react";
import type { PropsWithChildren } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

export function Loading({ children }: PropsWithChildren) {
  return (
    <View style={styles.background}>
      <ActivityIndicator color="#333333" size="large" />
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    minHeight: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#666",
    marginTop: 20,
    fontFamily: "Montserrat",
  },
});
