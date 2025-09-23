import { Stack, router, useFocusEffect } from "expo-router";
import React, { useState, useCallback } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import { FetchAPI } from "@/functions/FetchAPI";
import { Wrapper } from "@/components/Wrapper";
import { Loading } from "@/components/Loading";

interface balance {
  Balance: string;
  "Credit Count": number;
  Credits: history[];
}

interface history {
  "Survey Number": string;
  Amount: number;
  message: string;
  "Credit Date": string;
}

export default function CreditHistoryScreen() {
  const [history, setHistory] = useState<history[]>();
  const [loading, setLoading] = useState(true);

  //check login session when screen is focused
  useFocusEffect(
    useCallback(() => {
      FetchAPI("login_check").then((session) => {
        session.status == 0
          ? router.replace("/login")
          : FetchAPI("balance").then((data: balance[]) => {
              setHistory(data[0].Credits);
              setLoading(false);
            });
      });
    }, [])
  );

  return (
    <>
      <Stack.Screen name="CreditHistoryScreen" options={{ title: "Credit History", headerBackTitle: "Profile" }} />
      <Wrapper>
        <SafeAreaView style={styles.Container}>
          {loading ? (
            <Loading>Loading Cashout History...</Loading>
          ) : (
            <ScrollView style={styles.Container}>
              {history?.map((history) => (
                <View key={history["Survey Number"]} style={styles.Box}>
                  <View>
                    <Text style={styles.Label}>Credit</Text>
                    <Text style={styles.Incentive}>${history["Amount"]}</Text>
                  </View>
                  <View>
                    <Text style={styles.Label}>Survey Number</Text>
                    <Text style={styles.Content}>{history["Survey Number"]}</Text>
                  </View>
                  <View>
                    <Text style={styles.Label}>Credit Date</Text>
                    <Text style={styles.Content}>{history["Credit Date"]}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
        </SafeAreaView>
      </Wrapper>
    </>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    width: "100%",
  },
  Box: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    borderColor: "#ddd",
    borderStyle: "solid",
    borderBottomWidth: 1,
  },
  Label: {
    fontSize: 11,
    color: "#999",
    fontFamily: "Montserrat",
  },
  Incentive: {
    fontSize: 20,
    color: "#4ca14e",
    lineHeight: 32,
    fontWeight: 600,
  },
  Content: {
    lineHeight: 32,
    color: "#666",
    fontWeight: 500,
    fontFamily: "Montserrat",
  },
});
