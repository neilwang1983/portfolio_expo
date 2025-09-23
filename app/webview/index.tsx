import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { Loading } from "@/components/Loading";

export default function WebViewScreen() {
  const { url } = useLocalSearchParams<{ url: string }>();
  const [visible, setVisible] = useState(true);
  return (
    <>
      <Stack.Screen name="WebViewScreen" options={{ title: "Survey", headerBackTitle: "Home" }} />
      <View style={{ flex: 1 }}>
        <WebView
          style={{ flex: 1 }}
          originWhitelist={["*"]}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{ uri: url }}
          onLoadStart={() => setVisible(true)}
          onLoad={() => setVisible(false)}
        />
        {visible ? (
          <View style={styles.container}>
            <Loading>Loading Survey...</Loading>
          </View>
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    alignItems: "center",
    alignContent: "center",
  },
});
