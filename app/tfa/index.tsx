import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, StyleSheet, SafeAreaView } from "react-native";
import { Stack, router } from "expo-router";
import { PostAPI } from "@/functions/PostAPI";
import { Wrapper } from "@/components/Wrapper";
import { SubmitButton } from "@/components/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import type { RelativePathString } from "expo-router";

export default function TFAScreen() {
  //get route params
  const { method, cellphone, from, destination } = useLocalSearchParams<{
    cellphone: string;
    method: string;
    from: string;
    destination: RelativePathString;
  }>();

  const [deviceToken, setDeviceToken] = useState("");
  const [editable, setEditable] = useState(true);
  const [phone, setPhone] = useState("");
  const [passcode, setPasscode] = useState("");
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const [counter, setCounter] = useState(299);
  const [timeup, setTimeup] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [codeRequesting, setCodeRequesting] = useState(false);
  const [codeVerifying, setCodeVerifying] = useState(false);

  useEffect(() => {
    if (cellphone) {
      setEditable(false);
      setPhone(cellphone);
    }

    //retrive push notification token from local storage
    AsyncStorage.getItem("@devicetoken").then((token) => {
      token ? setDeviceToken(token) : null;
    });

    const timer = setInterval(() => {
      setCounter((i) => i - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      clearInterval(timer);
      setTimeup(true);
    }, 300 * 1000);

    return function cleanup() {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, []);

  function secondToTime(d: number) {
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);
    return m + ":" + s;
  }

  function verifyPhone() {
    setMessage1("");
    setCodeRequesting(true);
    const formData = new FormData();
    formData.append("*", phone);
    formData.append("*", deviceToken);
    console.log(formData);
    PostAPI("*", formData).then((response) => {
      console.log(response);
      setCodeRequesting(false);
      if (response[0].tfac_status == "0") {
        setModalVisible(false);
        setCounter(300);
        setPasscode("");
        setMessage2("");
      } else {
        setMessage1(response[0].tfac_message);
      }
    });
  }

  function verifyCode() {
    setMessage2("");
    setCodeVerifying(true);
    const formData = new FormData();
    formData.append("*", phone);
    formData.append("*", deviceToken);
    formData.append("*", passcode);
    PostAPI("*", formData).then((response) => {
      console.log(response);
      setCodeVerifying(false);
      if (response[0].tfar_status == "0") {
        router.replace({
          pathname: destination,
          params: {
            cellphone: cellphone,
            method: method,
            from: from,
            destination: destination,
          },
        });
      } else {
        setMessage2(response[0].tfar_message);
      }
    });
  }

  function renderRequestScreen() {
    return (
      <View style={styles.ModalBox}>
        <Text style={styles.Title}>Authentication</Text>
        <Text style={styles.Subtitle}>Please verify your mobile phone</Text>
        <Text style={styles.TextLabel}>Mobile Phone Number</Text>
        <View style={styles.TextInputBorder}>
          <View style={{ marginLeft: "1%" }}>
            <Image style={{ width: 26, height: 26 }} source={require("@/assets/images/icon-usa.png")} />
          </View>
          <View style={{ width: "85%" }}>
            <TextInput
              style={styles.TextInput}
              editable={editable}
              value={cellphone ? cellphone.replace(/.(?=.{4})/g, "*") : cellphone}
              keyboardType="numeric"
              autoFocus={true}
              maxLength={10}
              onChangeText={(text) => setPhone(text)}
            />
          </View>
        </View>
        <Text style={styles.Message}>{message1}</Text>

        <SubmitButton
          disabled={codeRequesting}
          style={{ width: 180, marginTop: 10, marginBottom: 30 }}
          onPress={() => verifyPhone()}
          text="Request Code"
        />
      </View>
    );
  }

  function rednerAlertScreen() {
    return (
      <View style={styles.ModalBox}>
        <Text style={styles.Title}>Authentication</Text>
        <Text style={styles.Subtitle}>Please verify your mobile phone</Text>
        <Text style={styles.TextLabel}>
          To Continue, you must have a verified mobile phone number for authentication. Please visit http://mindfieldonline.com or our HelpDesk at
          support@mindfieldonline.com to update your profile.
        </Text>
        <Text onPress={() => router.back()} style={styles.TextButton}>
          Go Back
        </Text>
      </View>
    );
  }

  function renderAuthenticateScreen() {
    return (
      <View style={styles.ModalBox}>
        <Text style={styles.Title}>Authentication</Text>
        <Text style={styles.Subtitle}>Please check your mobile device and enter the Authentication code. The code will expire after 5 mintues.</Text>
        <Text style={styles.TextLabel}>Authentication Code</Text>
        <View style={styles.TextInputBorder}>
          <TextInput style={styles.TextInput} keyboardType="numeric" maxLength={6} onChangeText={(text) => setPasscode(text)} />
        </View>
        <Text style={styles.Message}>{message2}</Text>
        <SubmitButton
          disabled={codeVerifying}
          style={{ width: 200, marginTop: 10, marginBottom: 30 }}
          onPress={() => verifyCode()}
          text={timeup ? "Reqeust new code" : "Authenticate " + secondToTime(counter)}
        />

        <Text onPress={() => setModalVisible(true)} style={styles.TextButton}>
          Request New Code
        </Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen name="CashoutScreen" options={{ title: "Authentication", headerBackTitle: "Back" }} />
      <Wrapper>
        <SafeAreaView style={{ flex: 1, width: "100%" }}>
          {modalVisible ? (from == "Login" || cellphone ? renderRequestScreen() : rednerAlertScreen()) : renderAuthenticateScreen()}
        </SafeAreaView>
      </Wrapper>
    </>
  );
}

const styles = StyleSheet.create({
  ModalBox: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  Title: {
    alignSelf: "flex-start",
    fontSize: 26,
    color: "#333",
    fontFamily: "Montserrat",
    fontWeight: 600,
  },
  Subtitle: {
    alignSelf: "flex-start",
    color: "#666",
    marginTop: 5,
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  TextLabel: {
    marginTop: 20,
    marginBottom: 5,
    width: "100%",
    textAlign: "left",
    color: "#666",
    fontSize: 13,
    fontFamily: "Montserrat",
  },
  TextInput: {
    width: "100%",
    height: 30,
    marginVertical: 5,
    marginLeft: 10,
    color: "#45638a",
    fontSize: 18,
    fontFamily: "Montserrat",
    letterSpacing: 5,
  },
  TextInputBorder: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#aeaeae",
    borderStyle: "solid",
  },
  Message: {
    marginTop: 20,
    width: "100%",
    textAlign: "left",
    color: "red",
    fontSize: 13,
    fontFamily: "Montserrat",
  },
  TextButton: {
    color: "#207fe6",
    textShadowColor: "rgba(255,255,255,0.5)",
    textShadowRadius: 0,
    textShadowOffset: { width: 0, height: 1 },
    fontFamily: "Montserrat",
  },
});
