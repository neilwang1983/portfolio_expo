import React, { useState, useCallback } from "react";
import { Alert, ActivityIndicator, Image, ImageBackground, StyleSheet, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { Loading } from "@/components/Loading";
import { CheckVersion } from "@/components/CheckVersion";
import { CheckSession } from "@/functions/CheckSession";
import { FetchAPI } from "@/functions/FetchAPI";
import { IconSymbol } from "@/components/ui/IconSymbol";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";

interface study {
  redir: string;
  incentive: string;
  job_code: string;
  start: string;
  end: string;
}

export default function StartScreen() {
  const insets = useSafeAreaInsets();
  const TopBarHeights = insets.top;

  //display on screen
  const [pageLoading, setPageLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileCheck, setProfileCheck] = useState(false);
  const [profileComplete, setProfileComplete] = useState(true);
  const [username, setUsername] = useState("");
  const [premier, setPremier] = useState<study[]>();
  const [global, setGlobal] = useState<study[]>();
  const [balance, setBalance] = useState();
  const [loading, setLoading] = useState(false);

  //check login session when screen is focused
  useFocusEffect(
    useCallback(() => {
      CheckVersion().then((url) =>
        url
          ? UpdateAlert(url)
          : CheckSession().then((session) => {
              setPageLoading(false);
              //redirect to login page if user session expired
              //otherwise fetch study data
              session.status == 0 ? router.replace("/login") : FetchData();
              session.username ? setUsername(session.username) : setUsername("User");
            })
      );
    }, [])
  );

  const UpdateAlert = (url: string) => {
    Alert.alert(
      "Update Available",
      "A newer version of MindField Online is available. To use the latest features of MindField Online, please update to the latest version.",
      [
        { text: "Cancel", onPress: () => CheckSession() },
        { text: "Update", onPress: () => Linking.openURL(url) },
      ]
    );
  };

  const FetchData = () => {
    setLoading(true);

    //check profile completion
    FetchAPI("profilecheck")
      .then((json) => json.json())
      .then((data) => setProfileComplete(data.completed));

    FetchAPI("balance").then((data) => {
      setBalance(data[0].Balance);
      //console.log(data[0]);
    });
    FetchAPI("premier").then((data) => {
      data[0].message ? setPremier([]) : setPremier(data);
      //console.log(data);
    });
    FetchAPI("global").then((data) => {
      data[0].message ? setGlobal([]) : setGlobal(data);
      setLoading(false);
      //console.log(data);
    });
  };

  function gotoCashout() {
    setProfileCheck(true);
    FetchAPI("profile").then((data) => {
      //console.log(data);
      setProfileCheck(false);
      if (data[1].errors[0].code == "000") {
        router.push("/cashout");
      } else {
        router.push({
          pathname: "/security_questions",
          params: {
            from: "Home",
            destination: "/cashout",
          },
        });
      }
    });
  }

  function gotoEditProfile() {
    setProfileLoading(true);
    FetchAPI("profile").then((data) => {
      setProfileLoading(false);
      if (data[1].errors[0].code == "000") {
        router.push({ pathname: "/profile_edit", params: { from: "/" } });
      } else {
        router.push({
          pathname: "/security_questions",
          params: {
            from: "Home",
            destination: "/profile_edit",
          },
        });
      }
    });
  }

  function renderSurvey(type: string, item: study, index: number) {
    return (
      <View key={index} style={styles.SurveyItem}>
        <TouchableOpacity style={styles.SurveyElement} onPress={() => router.push({ pathname: "/webview", params: { url: item.redir } })}>
          <View style={styles.SurveyBox}>
            {type == "premier" ? (
              <Image style={styles.SurveyIcon} source={require("@/assets/images/icon-premier.png")} />
            ) : (
              <Image style={styles.SurveyIcon} source={require("@/assets/images/icon-global.png")} />
            )}
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.SurveySubtitle}>Incentive</Text>
              <Text style={styles.SurveyIncentive}>${item.incentive}</Text>
            </View>
          </View>
          <View style={{ width: "35%" }}>
            <Text style={styles.SurveySubtitle}>Jobcode</Text>
            <Text style={styles.SurveyTitle}>{item.job_code}</Text>
          </View>
          <View style={{ marginRight: 10 }}>
            <Text style={styles.SurveySubtitle}>Length</Text>
            <Text style={styles.SurveyTitle}>
              {item.start}-{item.end} min
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  const renderHome = () => {
    return (
      <Wrapper>
        <ImageBackground source={require("@/assets/images/banner.png")} style={styles.bannerWrapper}>
          <View style={{ height: TopBarHeights, width: "100%" }} />
          <View style={styles.LogoRow}>
            <View style={styles.LogoBox}>
              <Image style={styles.LogoImage} source={require("@/assets/images/logo.png")} />
            </View>
            <Text style={styles.Username}>Hi! {username}</Text>
            <TouchableOpacity onPress={() => router.push("/profile")}>
              <IconSymbol size={24} name={"square.and.pencil"} color={"white"} style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          </View>

          <View style={{ marginLeft: 100 }}>
            <Text style={styles.BalanceLabel}>Earnings</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.BalanceText}>${balance}</Text>
              <TouchableOpacity style={styles.CashoutButton} disabled={profileCheck} onPress={() => gotoCashout()}>
                <ActivityIndicator animating={profileCheck} style={{ marginLeft: 5 }} size="small" color="#000" />
                <Text style={styles.CashoutButtonText}>Cashout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        <ScrollView style={{ flex: 1, alignSelf: "stretch" }}>
          {profileComplete ? null : (
            <TouchableOpacity onPress={() => gotoEditProfile()}>
              <View style={styles.ProfileItem}>
                <View style={{ width: "85%" }}>
                  <Text style={styles.ProfileText}>The get better opportunities to participate surveys, Please click to complete your profile.</Text>
                </View>
                <View style={styles.ProfileChevronWrapper}>
                  <ActivityIndicator animating={profileLoading} style={{ marginRight: 10 }} size="small" color="#999" />
                  <Image style={styles.Arrow} source={require("@/assets/images/icon-chevron-right.png")} />
                </View>
              </View>
            </TouchableOpacity>
          )}

          {premier?.map((item, index) => renderSurvey("premier", item, index))}

          {global?.map((item, index) => renderSurvey("global", item, index))}

          {loading ? (
            <Loading>Loading Studies...</Loading>
          ) : premier?.length == 0 && global?.length == 0 ? (
            <View style={styles.NoSurveyWrapper}>
              <Text style={styles.NoSurveyText}>You have no live studies available at this time, please check back often!</Text>
            </View>
          ) : null}
          <View style={{ height: 50, width: "100%" }}></View>
        </ScrollView>
      </Wrapper>
    );
  };

  const renderPageLoading = () => {
    return (
      <Wrapper>
        <View>
          <ActivityIndicator size="large" />
        </View>
      </Wrapper>
    );
  };

  return pageLoading ? renderPageLoading() : renderHome();
}

const styles = StyleSheet.create({
  bannerWrapper: {
    width: "100%",
    paddingBottom: 30,
    backgroundColor: "#bc1b1c",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  LogoRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  LogoBox: {
    width: 60,
    height: 60,
    backgroundColor: "#ededed",
    borderRadius: 35,
    resizeMode: "stretch",
    marginLeft: 20,
  },
  LogoImage: {
    width: 50,
    height: 50,
    marginLeft: 7,
    marginTop: 5,
  },
  Username: {
    fontFamily: "Montserrat",
    fontWeight: 600,
    color: "#fff",
    height: 60,
    lineHeight: 60,
    fontSize: 22,
    marginLeft: 20,
  },
  BalanceLabel: {
    fontFamily: "Montserrat",
    fontSize: 12,
    color: "#fff",
  },
  BalanceText: {
    marginTop: 0,
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: 26,
    color: "#fff",
  },
  SurveyBox: {
    flexDirection: "row",
    width: "35%",
    alignItems: "center",
  },
  SurveyIcon: {
    width: 36,
    height: 36,
    marginLeft: 15,
  },
  SurveyItem: {
    borderColor: "#ddd",
    borderStyle: "solid",
    borderWidth: 1,
    resizeMode: "stretch",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 80,
  },
  SurveyElement: {
    flex: 1,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  SurveySubtitle: {
    fontSize: 10,
    color: "#999",
    fontFamily: "Montserrat",
  },
  SurveyIncentive: {
    fontSize: 25,
    fontWeight: 600,
    color: "#666",
    height: 32,
    lineHeight: 32,
    fontFamily: "Montserrat",
  },
  SurveyTitle: {
    color: "#666",
    fontSize: 14,
    height: 32,
    lineHeight: 32,
    fontFamily: "Montserrat",
  },
  CashoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fec151",
    borderColor: "#f0b35b",
    borderWidth: 1,
    borderRadius: 30,
    width: 100,
    height: 26,
    marginLeft: 10,
  },
  CashoutButtonText: {
    width: "100%",
    textAlign: "center",
    marginLeft: -23,
    color: "rgba(0,0,0,0.6)",
    textShadowColor: "rgba(255,255,255,0.5)",
    textShadowRadius: 1,
    textShadowOffset: { width: 0, height: 1 },
    fontWeight: 600,
    fontFamily: "Montserrat",
  },
  ProfileItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#ddd",
    borderStyle: "solid",
    borderWidth: 1,
    resizeMode: "stretch",
    backgroundColor: "#f5f5eb",
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingHorizontal: 20,
    height: 80,
  },
  ProfileText: {
    fontSize: 13,
    color: "#666",
    fontFamily: "Montserrat",
  },
  ProfileChevronWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "15%",
  },
  Arrow: {
    width: 12,
    height: 12,
    opacity: 0.6,
  },
  NoSurveyText: {
    fontFamily: "Montserrat",
    color: "#666",
    alignSelf: "center",
  },
  NoSurveyWrapper: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
