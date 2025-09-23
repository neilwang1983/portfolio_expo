import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Modal } from "react-native";
import { Wrapper } from "@/components/Wrapper";
import { FetchAPI } from "@/functions/FetchAPI";
import { PostAPI } from "@/functions/PostAPI";
import { Stack, router } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";
import type { ItemType } from "react-native-dropdown-picker";
import HTMLView from "react-native-htmlview";
import { useLocalSearchParams } from "expo-router";
import { SubmitButton } from "@/components/SubmitButton";

interface sq {
  sq_question_text: string;
  sq_question_value: number;
}

export default function RegisterScreen() {
  //get route params
  const { cellphone, from } = useLocalSearchParams<{
    cellphone: string;
    from: string;
  }>();

  const formData = new FormData();
  //basic register info
  const [sms, setSMS] = useState(true);
  const [agreement, setAgreement] = useState(true);
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [phone, setPhone] = useState("");
  const [sq1List, setSQ1List] = useState<ItemType<number>[]>();
  const [sq2List, setSQ2List] = useState<ItemType<number>[]>();
  const [sq1, setSQ1] = useState(0);
  const [sq2, setSQ2] = useState(0);
  const [a1, setA1] = useState("");
  const [a2, setA2] = useState("");

  //system states
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPhone(cellphone);

    FetchAPI("sq1").then((data) => {
      //console.log(data);
      let res1: ItemType<number>[] = [];
      data.map((item: sq) => {
        res1.push({
          label: item.sq_question_text,
          value: item.sq_question_value,
        });
      });
      setSQ1List(res1);
    });
    FetchAPI("sq2").then((data) => {
      //console.log(data);
      let res2: ItemType<number>[] = [];
      data.map((item: sq) => {
        res2.push({
          label: item.sq_question_text,
          value: item.sq_question_value,
        });
      });
      setSQ2List(res2);
    });
  }, []);

  function Register() {
    setLoading(true);
    formData.append("email1", email1);
    formData.append("email2", email2);
    formData.append("password", password1);
    formData.append("password2", password2);
    formData.append("cphone", phone);
    formData.append("sq1", sq1.toString());
    formData.append("a1", a1);
    formData.append("sq2", sq2.toString());
    formData.append("a2", a2);
    formData.append("agreement", agreement && sms ? "1" : "0");

    console.log(formData);

    PostAPI("register", formData).then((data) => {
      setLoading(false);
      setModalVisible(true);
      let message = decodeURIComponent(data[1].errors[0].message.replace(/\+/g, " "));
      setModalMessage(message);
      //console.log(message);
    });
  }

  return (
    <>
      <Stack.Screen name="RegisterScreen" options={{ title: "Sign Up", headerBackTitle: from }} />
      <Wrapper>
        <SafeAreaView style={{ flex: 1, width: "100%" }}>
          <Modal animationType="fade" transparent={true} visible={modalVisible}>
            <View style={styles.ModalBackground}>
              <View style={styles.ModalBox}>
                <View style={styles.ModalTitleBox}>
                  <Text style={styles.ModalTitle}>Registeration</Text>
                </View>
                <HTMLView stylesheet={HtmlViewStyles} value={"<p>" + modalMessage + "</p>"} />
                <View style={{ width: "50%", alignSelf: "center", marginTop: 20 }}>
                  <TouchableOpacity style={styles.SubmitButton} onPress={() => setModalVisible(false)}>
                    <Text>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <ScrollView>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 50,
              }}
            >
              <View style={styles.Section}>
                <Text style={styles.SectionText}>Account Setup</Text>
              </View>

              <Text style={styles.TextLabel}>Email</Text>
              <TextInput style={styles.TextInput} value={email1} autoCapitalize="none" onChangeText={(text) => setEmail1(text)} />

              <Text style={styles.TextLabel}>Confirm Email</Text>
              <TextInput style={styles.TextInput} value={email2} autoCapitalize="none" onChangeText={(text) => setEmail2(text)} />

              <Text style={styles.TextLabel}>Password</Text>
              <TextInput
                style={styles.TextInput}
                value={password1}
                secureTextEntry={true}
                autoCorrect={false}
                textContentType={"oneTimeCode"}
                onChangeText={(text) => setPassword1(text)}
              />

              <Text style={styles.TextLabel}>Confirm Password</Text>
              <TextInput
                style={styles.TextInput}
                value={password2}
                secureTextEntry={true}
                autoCorrect={false}
                textContentType={"oneTimeCode"}
                onChangeText={(text) => setPassword2(text)}
              />

              <View style={styles.Section}>
                <Text style={styles.SectionText}>Account Security</Text>
              </View>

              <View style={{ width: "100%" }}>
                <Text style={styles.TextLabel}>Security Question 1</Text>
                <View style={{ marginVertical: 10 }}>
                  <DropDownPicker
                    listMode="MODAL"
                    modalProps={{ animationType: "fade" }}
                    modalContentContainerStyle={{
                      marginHorizontal: 30,
                      marginVertical: 30,
                    }}
                    listItemContainerStyle={{
                      marginTop: 30,
                    }}
                    style={{ borderColor: "#ccc" }}
                    textStyle={{
                      color: "#666",
                      fontSize: 16,
                      fontFamily: "Montserrat",
                    }}
                    open={dropdownOpen1}
                    value={sq1}
                    items={sq1List ? sq1List : [{ label: "", value: 0 }]}
                    setOpen={setDropdownOpen1}
                    setValue={setSQ1}
                  />
                </View>
              </View>

              <View style={{ width: "100%" }}>
                <Text style={styles.TextLabel}>Answer 1</Text>
                <TextInput style={styles.TextInput} autoCapitalize="none" value={a1} onChangeText={(text) => setA1(text)} />
              </View>

              <View style={{ width: "100%" }}>
                <Text style={styles.TextLabel}>Security Quesion 2</Text>
                <View style={{ marginVertical: 10 }}>
                  <DropDownPicker
                    listMode="MODAL"
                    listItemContainerStyle={{
                      marginTop: 30,
                    }}
                    selectedItemLabelStyle={{
                      color: "#347deb",
                      fontFamily: "Montserrat",
                    }}
                    modalProps={{ animationType: "fade" }}
                    modalContentContainerStyle={{
                      marginHorizontal: 30,
                      marginVertical: 30,
                    }}
                    style={{ borderColor: "#ccc" }}
                    textStyle={{
                      color: "#666",
                      fontSize: 16,
                      fontFamily: "Montserrat",
                    }}
                    open={dropdownOpen2}
                    value={sq2}
                    items={sq2List ? sq2List : [{ label: "", value: 0 }]}
                    setOpen={setDropdownOpen2}
                    setValue={setSQ2}
                  />
                </View>
              </View>

              <View style={{ width: "100%", marginBottom: 30 }}>
                <Text style={styles.TextLabel}>Answer 2</Text>
                <TextInput style={styles.TextInput} autoCapitalize="none" value={a2} onChangeText={(text) => setA2(text)} />
              </View>

              <View style={styles.CheckBoxWrapper}>
                <TouchableOpacity style={styles.CheckBox} onPress={() => setSMS(!sms)}>
                  <View>{sms ? <View style={styles.CheckBoxSelected}></View> : null}</View>
                </TouchableOpacity>
                <Text style={{ marginLeft: 15, color: "#666", fontFamily: "Montserrat" }}>
                  You agree to receive text message for survey reminders.
                </Text>
              </View>

              <View style={styles.CheckBoxWrapper}>
                <TouchableOpacity style={styles.CheckBox} onPress={() => setAgreement(!agreement)}>
                  <View>{agreement ? <View style={styles.CheckBoxSelected}></View> : null}</View>
                </TouchableOpacity>
                <View style={styles.AgreementTextWrapper}>
                  <Text style={{ color: "#666", fontFamily: "Montserrat" }}>I have read and accepted the </Text>
                  <TouchableOpacity onPress={() => router.push("/privacy_policy")}>
                    <Text style={styles.AgreementLinks}>Privacy Policy</Text>
                  </TouchableOpacity>
                  <Text style={{ color: "#666", fontFamily: "Montserrat" }}>, </Text>
                  <TouchableOpacity onPress={() => router.push("/term_of_use")}>
                    <Text style={styles.AgreementLinks}>Terms of Use</Text>
                  </TouchableOpacity>
                  <Text style={{ color: "#666", fontFamily: "Montserrat" }}>, and </Text>
                  <TouchableOpacity onPress={() => router.push("/data_quality_statement")}>
                    <Text style={styles.AgreementLinks}>Data Quality Statement</Text>
                  </TouchableOpacity>
                  <Text style={{ color: "#666", fontFamily: "Montserrat" }}>.</Text>
                </View>
              </View>

              <SubmitButton style={{ marginTop: 30 }} disabled={loading} text={"Register"} onPress={() => Register()} />

              <TouchableOpacity style={{ marginTop: 10, marginBottom: 150 }} onPress={() => router.replace("/login")}>
                <Text style={{ color: "#347deb", fontFamily: "Montserrat" }}>Already a member? Sign In</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Wrapper>
    </>
  );
}
const HtmlViewStyles = {
  p: {
    color: "#FF3366",
    fontFamily: "Montserrat",
    lineHeight: 18,
  },
};

const styles = StyleSheet.create({
  ModalBackground: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  ModalBox: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#fff",
    alignSelf: "center",
    width: "90%",
  },
  ModalTitleBox: {
    alignSelf: "center",
    borderStyle: "solid",
    borderColor: "orange",
    borderBottomWidth: 3,
    marginTop: 10,
    marginBottom: 20,
  },
  ModalTitle: {
    alignSelf: "center",
    fontSize: 20,
    fontFamily: "Montserrat",
    fontWeight: 600,
  },
  SubmitButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fec151",
    borderColor: "#f0b35b",
    borderWidth: 1,
    borderRadius: 30,
    width: "100%",
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  Section: {
    marginTop: 40,
    marginBottom: 20,
    alignSelf: "flex-start",
    borderColor: "orange",
    borderStyle: "solid",
    borderBottomWidth: 3,
  },
  SectionText: {
    fontSize: 26,
    color: "#333",
    fontFamily: "Montserrat",
    fontWeight: 600,
  },
  TextLabel: {
    textTransform: "uppercase",
    marginTop: 20,
    width: "100%",
    textAlign: "left",
    color: "#666",
    fontSize: 13,
    fontFamily: "Montserrat",
  },
  TextInput: {
    borderBottomWidth: 1,
    borderColor: "#aeaeae",
    borderStyle: "solid",
    width: "100%",
    height: 30,
    marginVertical: 5,
    color: "#45638a",
    fontSize: 18,
    fontFamily: "Montserrat",
  },
  CheckBoxWrapper: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginTop: 15,
  },
  CheckBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#aaa",
    borderStyle: "solid",
    borderRadius: 5,
  },
  CheckBoxSelected: {
    width: 12,
    height: 12,
    margin: 2,
    backgroundColor: "#5ab32e",
    borderRadius: 3,
  },
  Radio: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: "#aaa",
    borderStyle: "solid",
    borderRadius: 10,
  },
  RadioSelected: {
    width: 10,
    height: 10,
    margin: 2,
    backgroundColor: "#5ab32e",
    borderRadius: 6,
  },
  AgreementLinks: {
    color: "#207fe6",
    fontFamily: "Montserrat",
  },
  AgreementTextWrapper: {
    marginLeft: 15,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
