import { useEffect, useState } from "react";
import { ScrollView, View, Text, Image, ImageBackground, ActivityIndicator, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack, router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FetchAPI } from "@/functions/FetchAPI";
import { PostAPI } from "@/functions/PostAPI";
import { SignOut } from "@/functions/SignOut";
import { CheckSession } from "@/functions/CheckSession";
import { ClickableTile } from "@/components/ClickableTile";
import { ToggleableTile } from "@/components/ToggleableTile";
import { Wrapper } from "@/components/Wrapper";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const TopBarHeights = insets.top;

  const [username, setUsername] = useState("");
  const [deviceToken, setDeviceToken] = useState("");
  const [deviceType, setDeviceType] = useState("");

  const [notificationStatus, setNotificationStatus] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(false);

  //check login session when screen is focused
  useFocusEffect(
    useCallback(() => {
      CheckSession().then((session) => {
        session.status == 0 ? router.replace("/login") : null;
      });
    }, [])
  );

  useEffect(() => {
    setDeviceType(Platform.OS);

    //retrive user name from local storage
    AsyncStorage.getItem("@username").then((username) => {
      username ? setUsername(username) : null;
    });
    //retrive push notification token from local storage
    AsyncStorage.getItem("@devicetoken").then((token) => {
      token ? setDeviceToken(token) : null;
    });

    if (deviceToken) {
      const formData = new FormData();
      formData.append("*", deviceToken);
      formData.append("*", deviceType);
      PostAPI("*", formData).then((pnsc) => {
        if (pnsc[0].status_ups) {
          setNotificationStatus(true);
        } else {
          setNotificationStatus(false);
        }
      });
    }
  }, [deviceToken]);

  function SetPushNotificationStatus() {
    setUpdating(true);
    const formData = new FormData();
    formData.append("*", deviceToken);
    formData.append("*", deviceType);
    notificationStatus ? formData.append("UserPreferenceSettings", "0") : formData.append("UserPreferenceSettings", "1");
    PostAPI("*", formData).then((pnsu) => {
      setUpdating(false);
      console.log(pnsu[0].message_ups);
      setNotificationStatus(pnsu[0].status_ups);
    });
  }

  function gotoEditProfile() {
    setLoading(true);
    FetchAPI("*").then((data) => {
      setLoading(false);
      if (data[1].errors[0].code == "000") {
        router.push({
          pathname: "/profile_edit",
          params: { from: "Profile" },
        });
      } else {
        router.push({
          pathname: "/security_questions",
          params: { from: "Profile", destination: "profile_edit" },
        });
      }
    });
  }

  return (
    <>
      <Stack.Screen name="ProfileScreen" options={{ headerShown: false }} />
      <Wrapper>
        <View style={{ width: "100%" }}>
          <ImageBackground source={require("@/assets/images/banner.png")} style={styles.bannerWrapper}>
            <View style={{ height: TopBarHeights, width: "100%" }} />
            <View style={styles.BannerBox}>
              <TouchableOpacity style={styles.BannerBackButton} onPress={() => router.back()}>
                <IconSymbol size={20} name={"chevron.left"} color={"white"} />
                <Text style={{ color: "white", fontSize: 19 }}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.BannerEditProfileButton} onPress={() => gotoEditProfile()}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Image style={styles.BannerIcon} source={require("@/assets/images/icon-avatar-white.png")} />
                  <View style={{ marginLeft: 20 }}>
                    <Text style={styles.NameText}>{username}</Text>
                    <Text style={styles.EditProfileText}>Edit Profile</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <ActivityIndicator animating={loading} style={{ marginRight: 10 }} size="small" color="#fff" />
                  <Image style={{ width: 15, height: 15, opacity: 0.9 }} source={require("@/assets/images/icon-chevron-right-white.png")} />
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <ScrollView style={{ width: "100%" }}>
          <View style={{ marginTop: 2 }}>
            <ToggleableTile
              icon="bell"
              onPress={() => SetPushNotificationStatus()}
              color="grey"
              toggle={notificationStatus}
              loading={updating}
              text="Push Notification"
            />
            <ClickableTile onPress={() => router.push("/study_history")} icon="clock" color="grey" text="Study History" />

            <ClickableTile icon="creditcard" color="grey" onPress={() => router.push("/credit_history")} text="Credit History" />

            <ClickableTile onPress={() => router.push("/faq")} icon="questionmark.bubble" color="grey" text="FAQ" />

            <ClickableTile onPress={() => router.push("/term_of_use")} icon="list.clipboard" color="grey" text="Term of Use" />

            <ClickableTile onPress={() => router.navigate("/privacy_policy")} icon="list.clipboard" color="grey" text="Private Policy" />

            <ClickableTile
              onPress={() => router.push("/data_quality_statement")}
              icon="checkmark.shield"
              color="grey"
              text=" Data Quality Statement"
            />

            <ClickableTile onPress={() => router.push("/sweepstakes_rules")} icon="gift" color="grey" text="Sweepstakes Rules" />

            {false ? <ClickableTile onPress={() => router.push("/test")} icon="lightbulb.max" color="grey" text="Test Info" /> : null}
          </View>

          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity
              style={styles.LogoutBox}
              onPress={() => {
                SignOut().then(() => {
                  router.replace("/login");
                });
              }}
            >
              <Text style={styles.LogoutText}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.LogoutBox}
              onPress={() => {
                router.push("/unregister");
              }}
            >
              <Text style={styles.UnregisterText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.VersionBox}>
            <Text style={styles.VersionLabel}>Powered by &copy; MindField Tech 2021.</Text>
            <Text style={styles.VersionLabel}>Version:</Text>
            <Text style={styles.VersionValue}>{Constants.expoConfig?.version}</Text>
          </View>
        </ScrollView>
      </Wrapper>
    </>
  );
}

const styles = StyleSheet.create({
  bannerWrapper: {
    width: "100%",
    paddingBottom: 30,
    backgroundColor: "#bc1b1c",
  },
  BannerBox: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  BannerIcon: {
    width: 50,
    height: 50,
    opacity: 0.9,
  },
  BannerBackButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 30,
  },
  BannerEditProfileButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  NameText: {
    fontSize: 20,
    color: "#fff",
    lineHeight: 26,
    fontFamily: "Montserrat",
    fontWeight: 600,
  },
  EditProfileText: {
    color: "#fff",
    lineHeight: 30,
    marginLeft: 1,
    fontFamily: "Montserrat",
    fontWeight: 500,
  },
  ClickableTile: {
    marginBottom: 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderTopColor: "#ccc",
    borderBottomColor: "#ccc",
  },
  LogoutText: {
    fontSize: 18,
    color: "#348feb",
    textAlign: "center",
    lineHeight: 46,
    fontFamily: "Montserrat",
    fontWeight: 600,
  },
  UnregisterText: {
    fontSize: 18,
    color: "#FF3366",
    textAlign: "center",
    lineHeight: 46,
    fontFamily: "Montserrat",
    fontWeight: 500,
  },
  LogoutBox: {
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    paddingVertical: 6,
    borderStyle: "solid",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  VersionBox: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    marginBottom: 100,
  },
  VersionLabel: {
    marginLeft: 5,
    lineHeight: 25,
    fontSize: 11,
    color: "#999",
    fontFamily: "Montserrat",
  },
  VersionValue: {
    marginLeft: 5,
    lineHeight: 25,
    fontSize: 11,
    color: "#666",
    fontFamily: "Montserrat",
    fontWeight: 500,
  },
});
