import React, { useState, useCallback } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Stack, router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { FetchAPI } from "@/functions/FetchAPI";
import { PostAPI } from "@/functions/PostAPI";
import { Wrapper } from "@/components/Wrapper";
import { SubmitButton } from "@/components/SubmitButton";
import HTMLView from "react-native-htmlview";
import type { RelativePathString } from "expo-router";

export default function SecruityScreen() {
  const { from, destination } = useLocalSearchParams<{
    from: string;
    destination: RelativePathString;
  }>();

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const [loading, setLoading] = useState(false);

  //check login session when screen is focused
  useFocusEffect(
    useCallback(() => {
      FetchAPI("*").then((session) => {
        session.status == 0 ? router.replace("/login") : FetchSecurityQuestion();
      });
    }, [])
  );

  function FetchSecurityQuestion() {
    FetchAPI("*").then((data) => {
      //console.log("sq1: ", data);
      if (data) {
        setText1(data[0].sq_question_text);
        setValue1(data[0].sq_question_value);
      } else {
        setValue1("0");
      }
    });
    FetchAPI("*").then((data) => {
      //console.log("sq2: ", data);
      if (data) {
        setText2(data[0].sq_question_text);
        setValue2(data[0].sq_question_value);
      } else {
        setValue2("0");
      }
    });
  }

  function CheckSecurityQuestion() {
    setLoading(true);
    const formData = new FormData();
    formData.append("*", value1);
    formData.append("*", answer1);
    formData.append("*", value2);
    formData.append("*", answer2);
    PostAPI("*", formData).then((response) => {
      setLoading(false);
      //console.log(response[0].information);
      if (response[0].information[0].sec_status == "pass") {
        //console.log(destination);
        router.replace({
          pathname: destination,
          params: {
            from: from,
          },
        });
      } else {
        //console.log(response[1].errors);
        setMessage1(response[1].errors[0].message.replace(/\+/g, " "));
        setMessage2(response[1].errors[1].message.replace(/\+/g, " "));
      }
    });
  }

  return (
    <>
      <Stack.Screen name="SecurityScreen" options={{ headerShown: false }} />
      <Wrapper>
        <SafeAreaView style={{ flex: 1, width: "100%" }}>
          <View style={styles.Container}>
            <View style={{ marginTop: 40, marginBottom: 20, width: "100%" }}>
              <Text style={styles.Title}>Security Questions</Text>
              <Text style={styles.Subtitle}>
                Before continue, please asnwer the security questions. This is important to keep your account information secure.
              </Text>
            </View>

            {value1 && value2 ? (
              <View style={{ width: "100%" }}>
                <Text style={styles.TextLabel}>Question 1: {text1}</Text>
                <TextInput
                  style={styles.TextInput}
                  autoFocus={true}
                  autoCapitalize="none"
                  placeholderTextColor="#666"
                  onChangeText={(text) => setAnswer1(text)}
                />
                <Text style={styles.Message}>{message1}</Text>
                <Text style={styles.TextLabel}>Question 2: {text2}</Text>
                <TextInput style={styles.TextInput} autoCapitalize="none" placeholderTextColor="#666" onChangeText={(text) => setAnswer2(text)} />
                <Text style={styles.Message}>{message2}</Text>
                <SubmitButton
                  disabled={loading}
                  style={{
                    width: 180,
                    marginTop: 10,
                    marginBottom: 30,
                    alignSelf: "center",
                  }}
                  onPress={() => CheckSecurityQuestion()}
                  text="Answer"
                />
              </View>
            ) : (
              <View style={{ marginBottom: 30 }}>
                <HTMLView
                  stylesheet={HtmlViewStyles}
                  value={`<p>The system is unable to proceed because you have not established your security questions and answers. Please visit our website: <a href="https://mindfieldonline.com" target="_blank">https://mindfieldonline.com</a> to set your security questions. If you need help in setting up your security questions, please submit a request at our <a href="mailto:support@mindfieldonline.com">Help Desk</a>.</p>`}
                />
              </View>
            )}
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.GoBackButton}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Wrapper>
    </>
  );
}

const HtmlViewStyles = {
  p: {
    color: "#FF3366",
    fontFamily: "MontserratMedium",
    lineHeight: 18,
  },
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  Title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Montserrat",
  },
  Subtitle: {
    color: "#333",
    marginTop: 5,
    fontFamily: "Montserrat",
  },
  TextLabel: {
    fontFamily: "Montserrat",
    marginTop: 20,
    marginBottom: 5,
    width: "100%",
    textAlign: "left",
    color: "#666",
    fontSize: 13,
  },
  TextInput: {
    width: "100%",
    height: 30,
    marginVertical: 5,
    color: "#45638a",
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: "#aeaeae",
    borderStyle: "solid",
    fontFamily: "Montserrat",
  },
  TextInputBorder: {
    flexDirection: "row",
    alignItems: "center",
  },
  Message: {
    fontFamily: "Montserrat",
    marginTop: 20,
    width: "100%",
    textAlign: "left",
    color: "red",
    fontSize: 13,
  },
  GoBackButton: {
    color: "#666",
    textShadowColor: "rgba(255,255,255,0.5)",
    textShadowRadius: 0,
    textShadowOffset: { width: 0, height: 1 },
    fontFamily: "Montserrat",
  },
});
