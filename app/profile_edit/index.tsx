import React, { useState, useEffect } from "react";
import { Alert, View, Text, SafeAreaView, ScrollView, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Stack, router } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { FetchAPI } from "@/functions/FetchAPI";
import { PostAPI } from "@/functions/PostAPI";
import { SubmitButton } from "@/components/SubmitButton";
import DropDownPicker from "react-native-dropdown-picker";
import type { ItemType } from "react-native-dropdown-picker";
import { IconSymbol } from "@/components/ui/IconSymbol";

interface Ethnicity {
  ethnicity_text: string;
  ethnicity_value: number;
}

export default function EditProfileScreen() {
  const formData = new FormData();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [homephone, setHomephone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [message, setMessage] = useState("");
  const [gender, setGender] = useState(1);
  const [ethnicity, setEthnicity] = useState(1);
  const [ethnicityList, setEthnicityList] = useState<ItemType<number>[]>();
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    FetchAPI("ethnicity").then((data) => {
      //console.log(data);
      let res: ItemType<number>[] = [];
      data.map((item: Ethnicity) => {
        res.push({ label: item.ethnicity_text, value: item.ethnicity_value });
      });
      setEthnicityList(res);
    });
    const FetchData = fetchProfile();
    return () => {
      FetchData;
    };
  }, []);

  function fetchProfile() {
    FetchAPI("profile").then((data) => {
      //console.log(data[0]);
      if (data[1].errors[0].code == "000") {
        const p = data[0].information[0];
        isValid(p.mail) ? setEmail(p.mail) : setEmail("");
        isValid(p.firstname) ? setFirstname(p.firstname) : setFirstname("");
        isValid(p.lastname) ? setLastname(p.lastname) : setLastname("");
        isValid(p.address1) ? setAddress1(p.address1) : setAddress1("");
        isValid(p.address2) ? setAddress2(p.address2) : setAddress2("");
        isValid(p.city) ? setCity(p.city) : setCity("");
        isValid(p.state) ? setState(p.state) : setState("");
        isValid(p.country) ? setCountry(p.country) : setCountry("");
        isValid(p.zip.toString()) ? setZip(p.zip.toString()) : setZip(p.zip);
        setGender(p.gender);
        setEthnicity(p.race);

        isValid(p.homephone) ? setHomephone(p.homephone.toString()) : setHomephone("");
        isValid(p.cellphone) ? setCellphone(p.cellphone.toString()) : setCellphone("");

        const birthday = new Date(p.birthday);
        //console.log(birthday);
        if (p.birthday == 0 || p.birthday == "null" || p.birthday == null || birthday.getFullYear() <= 1900) {
          setYear("");
          setMonth("");
          setDay("");
        } else {
          setYear(birthday.getFullYear() + "");
          setMonth(birthday.getMonth() + 1 + "");
          setDay(birthday.getDate() + "");
        }
      }
    });
  }

  function isValid(value: any) {
    //console.log(value);
    if (value.toString().trim() == "") return false;
    if (value == undefined || value == null || value == "null" || value == 0) return false;
    return true;
  }

  function UpdateProfile() {
    setSubmitting(true);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("mail", email);
    formData.append("cphone", cellphone);
    formData.append("hphone", homephone);
    formData.append("address1", address1);
    formData.append("address2", address2);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("country", country);
    formData.append("zip", zip);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("gender", gender.toString());
    formData.append("ethnicity", ethnicity.toString());
    formData.append("ydob", year);
    formData.append("mdob", month);
    formData.append("ddob", day);

    //console.log(formData);

    PostAPI("profileupdate", formData).then((data) => {
      setSubmitting(true);
      //console.log(data[0]);
      //console.log(data[1]);
      if (data[1].errors[0].code == "000") {
        Successfull();
      } else {
        setSubmitting(false);
        //console.log(data[1].errors[0].message.replace(/\+/g, " "));
        setMessage(data[1].errors[0].message.replace(/\+/g, " "));
      }
    });
  }

  function Successfull() {
    Alert.alert(
      "Congratulations!",
      "Your profile is now updated successfully",
      [
        {
          text: "OK",
          onPress: () => {
            router.push("/profile");
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <>
      <Stack.Screen name="EditProfileScreen" options={{ title: "Edit Profile", headerBackTitle: "Back" }} />
      <Wrapper>
        <SafeAreaView style={{ flex: 1, width: "100%" }}>
          <ScrollView style={{ flex: 1, backgroundColor: "#f3f3f3" }}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 50,
              }}
            >
              <Text style={styles.TextLabel}>Member Name</Text>
              <Text style={styles.Name}>
                {firstname} {lastname}
              </Text>

              <TouchableOpacity
                style={styles.Tile}
                onPress={() => {
                  router.push({
                    pathname: "/password_change",
                    params: { from: "Profile" },
                  });
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.TileText}>Change Password</Text>
                  <IconSymbol style={{ marginLeft: 20, opacity: 0.7 }} size={16} name="chevron.right" color="blue" />
                </View>
              </TouchableOpacity>

              <Text style={styles.TextLabel}>Email</Text>
              <TextInput editable={false} style={styles.TextInput} value={email} />

              <View style={{ flexDirection: "row", width: "100%" }}>
                <View style={{ width: "49%", marginRight: "2%" }}>
                  <Text style={styles.TextLabel}>Home Phone</Text>
                  <TextInput editable={false} style={styles.TextInput} value={homephone} />
                </View>
                <View style={{ width: "49%" }}>
                  <Text style={styles.TextLabel}>Cell Phone</Text>
                  <TextInput editable={false} style={styles.TextInput} value={cellphone} />
                </View>
              </View>

              <View style={styles.SupportNote}>
                <Text style={{ color: "#666", fontFamily: "Montserrat" }}>
                  If you would like to update your email address or cell phone number please contact our HelpDesk at support@mindfieldonline.com to
                  open a ticket in our HelpDesk system.
                </Text>
              </View>

              <View style={styles.Section}>
                <Text style={styles.SectionText}>Panel Information</Text>
              </View>

              <View
                style={{
                  width: "100%",
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    alignSelf: "flex-start",
                    color: "#666",
                    fontSize: 14,
                    fontFamily: "Montserrat",
                  }}
                >
                  Our clients often require proper representation of all demographics in their surveys.. Having this information allow us to properly
                  sample our surveys and provide everyone an equal opportunity to participate.
                </Text>
              </View>

              <View style={{ flexDirection: "row", width: "100%" }}>
                <View style={{ width: "49%", marginRight: "2%" }}>
                  <Text style={styles.TextLabel}>First Name</Text>
                  <TextInput style={styles.TextInput} value={firstname} onChangeText={(text) => setFirstname(text)} />
                </View>
                <View style={{ width: "49%" }}>
                  <Text style={styles.TextLabel}>Last Name</Text>
                  <TextInput style={styles.TextInput} value={lastname} onChangeText={(text) => setLastname(text)} />
                </View>
              </View>

              <Text style={styles.TextLabel}>Gender</Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  paddingVertical: 5,
                }}
              >
                <TouchableOpacity style={styles.Radio} onPress={() => setGender(1)}>
                  <View>{gender == 1 ? <View style={styles.RadioSelected}></View> : null}</View>
                </TouchableOpacity>
                <Text style={styles.RadioText}>Male</Text>
                <TouchableOpacity style={styles.Radio} onPress={() => setGender(2)}>
                  <View>{gender == 2 ? <View style={styles.RadioSelected}></View> : null}</View>
                </TouchableOpacity>
                <Text style={styles.RadioText}>Female</Text>
              </View>

              <Text style={styles.TextLabel}>Your Birthday</Text>
              <View style={{ flexDirection: "row", width: "100%" }}>
                <View style={{ width: "32%", marginRight: "2%" }}>
                  <Text style={styles.TextLabel}>Month</Text>
                  <TextInput style={styles.TextInput} value={month} keyboardType="numeric" maxLength={2} onChangeText={(text) => setMonth(text)} />
                </View>
                <View style={{ width: "32%", marginRight: "2%" }}>
                  <Text style={styles.TextLabel}>Day</Text>
                  <TextInput style={styles.TextInput} value={day} keyboardType="numeric" maxLength={2} onChangeText={(text) => setDay(text)} />
                </View>
                <View style={{ width: "32%" }}>
                  <Text style={styles.TextLabel}>Year</Text>
                  <TextInput style={styles.TextInput} value={year} keyboardType="numeric" maxLength={4} onChangeText={(text) => setYear(text)} />
                </View>
              </View>

              <View style={{ width: "100%" }}>
                <Text style={styles.TextLabel}>Ethnicity</Text>
                <View style={{ marginVertical: 10 }}>
                  <DropDownPicker
                    listMode="MODAL"
                    modalProps={{ animationType: "fade" }}
                    modalContentContainerStyle={{
                      marginHorizontal: 30,
                      marginVertical: 10,
                    }}
                    itemSeparator={true}
                    itemSeparatorStyle={{
                      marginVertical: 10,
                      backgroundColor: "none",
                    }}
                    style={{ borderColor: "#ccc" }}
                    textStyle={{
                      color: "#666",
                      fontSize: 16,
                      fontFamily: "Montserrat",
                    }}
                    open={open}
                    value={ethnicity}
                    items={ethnicityList ? ethnicityList : [{ label: "", value: 0 }]}
                    setOpen={setOpen}
                    setValue={setEthnicity}
                  />
                </View>
              </View>

              <Text style={styles.TextLabel}>Address1</Text>
              <TextInput style={styles.TextInput} value={address1} onChangeText={(text) => setAddress1(text)} />
              <Text style={styles.TextLabel}>Address2</Text>
              <TextInput style={styles.TextInput} value={address2} onChangeText={(text) => setAddress2(text)} />

              <View style={{ flexDirection: "row", width: "100%" }}>
                <View style={{ width: "49%", marginRight: "2%" }}>
                  <Text style={styles.TextLabel}>City</Text>
                  <TextInput style={styles.TextInput} value={city} onChangeText={(text) => setCity(text)} />
                </View>
                <View style={{ width: "49%" }}>
                  <Text style={styles.TextLabel}>State</Text>
                  <TextInput style={styles.TextInput} value={state} onChangeText={(text) => setState(text)} />
                </View>
              </View>
              <View style={{ flexDirection: "row", width: "100%" }}>
                <View
                  style={{
                    width: "49%",
                    marginRight: "2%",
                  }}
                >
                  <Text style={styles.TextLabel}>Zip</Text>
                  <TextInput style={styles.TextInput} value={zip} onChangeText={(text) => setZip(text)} />
                </View>
                <View style={{ width: "49%" }}>
                  <Text style={styles.TextLabel}>Country</Text>
                  <TextInput style={styles.TextInput} value={country} onChangeText={(text) => setCountry(text)} />
                </View>
              </View>

              <View
                style={{
                  width: "100%",
                  marginVertical: 10,
                  justifyContent: "flex-start",
                }}
              >
                <Text style={{ color: "red" }}>{message}</Text>
              </View>

              <SubmitButton disabled={submitting} style={styles.SubmitButton} onPress={() => UpdateProfile()} text="Update Profile" />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Wrapper>
    </>
  );
}

const styles = StyleSheet.create({
  Name: {
    width: "100%",
    height: 30,
    margin: 5,
    color: "#333",
    fontSize: 18,
    fontWeight: 600,
    fontFamily: "Montserrat",
  },
  Tile: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
    marginVertical: 10,
    padding: 10,
  },
  TileText: {
    color: "#348feb",
    textAlign: "center",
    lineHeight: 26,
    fontSize: 16,
    fontFamily: "Montserrat",
    fontWeight: 600,
  },
  Button: {
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
  ButtonText: {
    color: "#333",
    fontWeight: 700,
    textAlign: "center",
    lineHeight: 30,
    textShadowColor: "rgba(255,255,255,0.5)",
    textShadowRadius: 0,
    textShadowOffset: { width: 0, height: 1 },
    fontFamily: "Montserrat",
  },
  SubmitButton: {
    width: "100%",
    marginTop: 10,
    marginBottom: 150,
  },
  TextLabel: {
    textTransform: "none",
    marginTop: 20,
    width: "100%",
    textAlign: "left",
    color: "#999",
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
    color: "#333",
    fontSize: 18,
    fontFamily: "Montserrat",
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
  RadioText: {
    marginLeft: 5,
    marginRight: 20,
    color: "#666",
    fontSize: 17,
    fontFamily: "Montserrat",
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
    fontWeight: 600,
    color: "#333",
    fontFamily: "Montserrat",
  },
  SupportNote: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
  },
});
