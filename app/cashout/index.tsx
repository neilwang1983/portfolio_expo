import React, { useState, useCallback } from "react";
import { StyleSheet, Text, Image, TouchableOpacity, View, SafeAreaView, ScrollView } from "react-native";
import { Stack, router, useFocusEffect } from "expo-router";
import { FetchAPI } from "@/functions/FetchAPI";
import { CheckSession } from "@/functions/CheckSession";
import { Wrapper } from "@/components/Wrapper";

interface profile {
  firstname: string;
  lastname: string;
  address1: string;
  address2: string;
  state: string;
  city: string;
  street: string;
  zip: string;
  mail: string;
}

export default function CashoutScreen() {
  const [profile, setProfile] = useState<profile>();
  const [cellphone, setCellphone] = useState("");

  //check login session when screen is focused
  useFocusEffect(
    useCallback(() => {
      CheckSession().then((session) => {
        session.status ? FetchProfile() : router.replace("/login");
      });
    }, [])
  );

  const FetchProfile = () => {
    FetchAPI("profile").then((data) => {
      //console.log(data);
      if (data[1].errors[0].code == "000") {
        setProfile(data[0].information[0]);
        setCellphone(data[0].information[0].cellphone);
      }
    });
  };

  const requestCashout = (method: string) => {
    router.push({
      pathname: "/tfa",
      params: {
        method: method,
        cellphone: cellphone,
        from: "Cashout",
        destination: "/cashout_result",
      },
    });
  };

  return (
    <>
      <Stack.Screen name="CashoutScreen" options={{ title: "Cashout", headerBackTitle: "Home" }} />
      <Wrapper>
        <SafeAreaView style={{ flex: 1, width: "100%" }}>
          <ScrollView style={{ width: "100%" }}>
            <View style={{ padding: 20 }}>
              <Text style={styles.Title}>Cashout</Text>
              <Text style={styles.TextContent}>
                In order for you to cashout we must have the correct mailing and email addesses assoicated with your MindField Online account.
              </Text>
              <Text style={styles.TextContent}>
                Please verify the information is correct, otherwise please update your address information in your profile settings.
              </Text>

              {profile ? (
                <View style={styles.ProfileBox}>
                  <Text style={styles.ProfileTitle}>Mailing Address:</Text>
                  <Text style={styles.ProfileTextContent}>
                    {profile.firstname} {profile.lastname}
                  </Text>
                  <Text style={styles.ProfileTextContent}>
                    {profile.address1} {profile.address2}
                  </Text>
                  <Text style={styles.ProfileTextContent}>
                    {profile.city}, {profile.state} {profile.zip}
                  </Text>
                  <Text style={styles.ProfileTitle}>Email:</Text>
                  <Text style={styles.ProfileTextContent}>{profile.mail}</Text>
                  <Text
                    style={styles.ProfileTextButton}
                    onPress={() =>
                      router.push({
                        pathname: "/profile_edit",
                        params: { from: "Cashout" },
                      })
                    }
                  >
                    Update Profile
                  </Text>
                </View>
              ) : null}

              <Text style={styles.TextContent}>
                If this information is correct, please click on the Cashout button below. You will receive an email from us that will allow you to
                finalize the cashout process. You will be able to redeem your cash out from more than 150 different online entities, like Visa
                Virtual, Amazon, Walmart, Starbucks, Apple, and other great options. Please review them carefully before making your decision.
              </Text>
              <Text style={styles.TextContent}>
                Cashouts are processed weekly, every Monday, so please look for your Cashout email accordingly. If Monday is a holiday, it will
                process on the next business day. You will also notice your Cashout amount will reset to zero after you click Cashout. You will be
                able to view this and other Cashouts in your Account Summary under Transaction History.
              </Text>

              <TouchableOpacity style={styles.CashoutButton} onPress={() => requestCashout("7")}>
                <Text style={styles.CashoutButtonText}>Cashout</Text>
              </TouchableOpacity>

              <Text style={styles.TextContent2}>Here are some of the amazing choices you have to redeem your Cashout from MindField Online:</Text>

              <View style={styles.CashoutBox}>
                <View style={styles.GiftCardBox}>
                  <View style={styles.GiftCard}>
                    <Image style={{ width: 60, height: 60 }} source={require("@/assets/images/icon-amazon.png")} />
                  </View>
                  <Text style={styles.GiftCardTitle}>Amazon</Text>
                </View>

                <View style={styles.GiftCardBox}>
                  <View style={styles.GiftCard}>
                    <Image style={{ width: 70, height: 70 }} source={require("@/assets/images/icon-visa.png")} />
                  </View>
                  <Text style={styles.GiftCardTitle}>Visa Virtual</Text>
                </View>

                <View style={styles.GiftCardBox}>
                  <View style={styles.GiftCard}>
                    <Image style={{ width: 70, height: 70 }} source={require("@/assets/images/icon-walmart.png")} />
                  </View>
                  <Text style={styles.GiftCardTitle}>Walmart</Text>
                </View>

                <View style={styles.GiftCardBox}>
                  <View style={styles.GiftCard}>
                    <Image style={{ width: 60, height: 60 }} source={require("@/assets/images/icon-bk.png")} />
                  </View>
                  <Text style={styles.GiftCardTitle}>Burger King</Text>
                </View>

                <View style={styles.GiftCardBox}>
                  <View style={styles.GiftCard}>
                    <Image style={{ width: 80, height: 80 }} source={require("@/assets/images/icon-doordash.png")} />
                  </View>
                  <Text style={styles.GiftCardTitle}>DoorDash</Text>
                </View>

                <View style={styles.GiftCardBox}>
                  <View style={styles.GiftCard}>
                    <Image style={{ width: 60, height: 60 }} source={require("@/assets/images/icon-apple.png")} />
                  </View>
                  <Text style={styles.GiftCardTitle}>Apple</Text>
                </View>

                <View style={styles.GiftCardBox}>
                  <View style={styles.GiftCard}>
                    <Image style={{ width: 100, height: 100, borderRadius: 10 }} source={require("@/assets/images/icon-nintendo.png")} />
                  </View>
                  <Text style={styles.GiftCardTitle}>Nintendo</Text>
                </View>

                <View style={styles.GiftCardBox}>
                  <View style={styles.GiftCard}>
                    <Image style={{ width: 70, height: 70 }} source={require("@/assets/images/icon-tacobell.png")} />
                  </View>
                  <Text style={styles.GiftCardTitle}>Taco Bell</Text>
                </View>

                <View style={styles.GiftCardBox}>
                  <View style={styles.GiftCard}>
                    <Image style={{ width: 80, height: 80 }} source={require("@/assets/images/icon-target.png")} />
                  </View>
                  <Text style={styles.GiftCardTitle}>Target</Text>
                </View>

                <View style={styles.GiftCardBox}>
                  <View style={styles.GiftCard}>
                    <Image style={{ width: 80, height: 80 }} source={require("@/assets/images/icon-bestbuy.png")} />
                  </View>
                  <Text style={styles.GiftCardTitle}>Best Buy</Text>
                </View>

                <View style={styles.GiftCardBox}>
                  <View style={styles.GiftCard}>
                    <Image style={{ width: 100, height: 100, borderRadius: 10 }} source={require("@/assets/images/icon-nike.png")} />
                  </View>
                  <Text style={styles.GiftCardTitle}>Nike</Text>
                </View>

                <View style={styles.GiftCardBox}>
                  <View style={styles.GiftCard}>
                    <Image style={{ width: 80, height: 80 }} source={require("@/assets/images/icon-amc.png")} />
                  </View>
                  <Text style={styles.GiftCardTitle}>AMC</Text>
                </View>

                <View style={styles.GiftCardBox}>
                  <View style={styles.GiftCard}>
                    <Image style={{ width: 90, height: 90 }} source={require("@/assets/images/icon-olivegarden.png")} />
                  </View>
                  <Text style={styles.GiftCardTitle}>Olive Garden</Text>
                </View>

                <View style={styles.GiftCardBox}>
                  <View style={styles.GiftCard}>
                    <Image style={{ width: 70, height: 70 }} source={require("@/assets/images/icon-starbucks.png")} />
                  </View>
                  <Text style={styles.GiftCardTitle}>Starbucks</Text>
                </View>

                <View style={styles.GiftCardBox}>
                  <View style={styles.GiftCard}>
                    <Image style={{ width: 60, height: 60 }} source={require("@/assets/images/icon-google.png")} />
                  </View>
                  <Text style={styles.GiftCardTitle}>Google Play</Text>
                </View>

                <View style={styles.GiftCardBox}>
                  <View style={styles.GiftCard}>
                    <Image style={{ width: 100, height: 100, borderRadius: 10 }} source={require("@/assets/images/icon-footlocker.png")} />
                  </View>
                  <Text style={styles.GiftCardTitle}>Foot Locker</Text>
                </View>

                <View style={styles.GiftCardBox}>
                  <View style={styles.GiftCard}>
                    <Image style={{ width: 80, height: 80 }} source={require("@/assets/images/icon-lowes.png")} />
                  </View>
                  <Text style={styles.GiftCardTitle}>Lowe's</Text>
                </View>

                <View style={styles.GiftCardBox}>
                  <View style={styles.GiftCard}>
                    <Image style={{ width: 80, height: 80 }} source={require("@/assets/images/icon-papajohns.png")} />
                  </View>
                  <Text style={styles.GiftCardTitle}>Papa John's</Text>
                </View>

                <Text style={styles.TextContent}>
                  Once you process your Cashout with one of the many options, please check your email to find the redemption code. You may need to
                  check junk or spam folders in case your security settings are high. MindField Online Support will assist if you have any issues.
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Wrapper>
    </>
  );
}

const styles = StyleSheet.create({
  Title: {
    fontSize: 25,
    color: "#333",
    fontFamily: "Montserrat",
    fontWeight: 600,
    marginBottom: 10,
  },
  TextContent: {
    color: "#666666",
    lineHeight: 20,
    fontFamily: "Montserrat",
    marginBottom: 10,
  },
  TextContent2: {
    color: "#666666",
    lineHeight: 20,
    fontFamily: "Montserrat",
    fontWeight: 600,
    marginBottom: 10,
  },
  ProfileBox: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "solid",
    borderRadius: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  ProfileTitle: {
    marginTop: 20,
    fontFamily: "Montserrat",
    fontWeight: 600,
  },
  ProfileTextContent: {
    color: "#666",
    fontFamily: "Montserrat",
  },
  ProfileTextButton: {
    marginVertical: 20,
    color: "#207fe6",
    fontFamily: "Montserrat",
  },
  CashoutBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginTop: 10,
  },
  GiftCardBox: {
    alignItems: "center",
    justifyContent: "center",
    height: 140,
    marginLeft: 5,
    marginRight: 5,
  },
  GiftCard: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderColor: "#e1e1e1",
    borderWidth: 1,
    borderRadius: 10,
    shadowRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 10 },
    width: 100,
    height: 100,
  },
  GiftCardTitle: {
    fontSize: 13,
    marginTop: 5,
    color: "#666",
    textAlign: "center",
    width: 100,
    height: 40,
    fontFamily: "Montserrat",
  },
  CashoutButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#fec151",
    borderColor: "#f0b35b",
    borderWidth: 1,
    borderRadius: 30,
    width: 150,
    height: 40,
    padding: 0,
    marginTop: 30,
    marginBottom: 40,
  },
  CashoutButtonText: {
    fontSize: 20,
    width: "100%",
    textAlign: "center",
    color: "rgba(0,0,0,0.7)",
    textShadowColor: "rgba(255,255,255,0.5)",
    textShadowRadius: 1,
    textShadowOffset: { width: 0, height: 1 },
    fontFamily: "Montserrat",
  },
});
