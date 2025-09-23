import React, { useState, useCallback } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import { Stack, router, useFocusEffect } from "expo-router";
import { FetchAPI } from "@/functions/FetchAPI";
import { Wrapper } from "@/components/Wrapper";
import { Loading } from "@/components/Loading";

interface history {
  study: string;
  study_title: string;
  disposition: string;
  dispo_title: string;
  start: string;
  start_title: string;
  finish: string;
  finish_title: string;
  payout: string;
  credited: string;
  credited_title: string;
}

export default function StudyHistoryScreen() {
  const [history, setHistory] = useState<history[]>();
  const [loading, setLoading] = useState(true);

  //check login session when screen is focused
  useFocusEffect(
    useCallback(() => {
      FetchAPI("login_check").then((session) => {
        session.status == 0
          ? router.replace("/login")
          : FetchAPI("history").then((data) => {
              setHistory(data);
              setLoading(false);
            });
      });
    }, [])
  );

  return (
    <>
      <Stack.Screen name="StudyHistoryScreen" options={{ title: "Study History", headerBackTitle: "Profile" }} />
      <Wrapper>
        <SafeAreaView style={{ flex: 1, width: "100%" }}>
          {loading ? (
            <Loading>Loading Study History...</Loading>
          ) : (
            <ScrollView style={{ flex: 1, width: "100%" }}>
              {history?.map((item) => (
                <View key={item.study} style={styles.Box}>
                  <View style={{ width: "25%", marginLeft: "2%" }}>
                    <Text style={styles.Label}>Incentive</Text>
                    <Text style={styles.Incentive}>${item.payout}</Text>
                    <Text style={styles.Label}>{item.credited}</Text>
                  </View>
                  <View style={{ width: "38%" }}>
                    <Text style={styles.Label}>Study:</Text>
                    <Text style={styles.Jobcode}>{item.study}</Text>
                    <Text style={styles.Label}>{item.disposition}</Text>
                  </View>

                  <View style={{ width: "30%" }}>
                    <Text style={styles.Label}>Start:</Text>
                    <Text style={styles.SurveyTime}>{item.start}</Text>
                    <Text style={styles.Label}>Finish:</Text>
                    <Text style={styles.SurveyTime}>{item.finish}</Text>
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
  Box: {
    padding: 10,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    borderColor: "#ccc",
    borderStyle: "solid",
    borderBottomWidth: 1,
  },
  Incentive: {
    fontSize: 20,
    fontWeight: 600,
    color: "#4ca14e",
    lineHeight: 32,
  },
  Jobcode: {
    fontSize: 14,
    fontWeight: 500,
    color: "#333",
    lineHeight: 32,
    fontFamily: "Montserrat",
  },
  Label: {
    fontSize: 11,
    color: "#999",
    fontFamily: "Montserrat",
  },
  SurveyTime: {
    lineHeight: 16,
    fontSize: 11,
    color: "#333",
    marginTop: 1,
    fontFamily: "Montserrat",
  },
});
