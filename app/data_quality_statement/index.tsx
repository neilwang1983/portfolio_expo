import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { Wrapper } from "@/components/Wrapper";

export default function DQSScreen() {
  return (
    <>
      <Stack.Screen
        name="DQSScreen"
        options={{
          title: "Data Quality Statement",
          headerBackTitle: "Profile",
        }}
      />
      <Wrapper>
        <SafeAreaView>
          <ScrollView>
            <View style={styles.box}>
              <Text style={styles.bullet}>Data Quality Statement</Text>
              <Text style={styles.p}>
                McMillion Research and MindField Online are members of CASRO and other industry affiliations and therefore have very high standards
                and expectations with regards to the data we provide our clientele. Unfortunately, not all companies or respondents hold to these high
                standards so we must put guidelines in place to keep our members honest. Data is reviewed by a quality assurance team and several
                items are considered before turning data over to our clients who also have a quality process to follow. Everything from the time spent
                on the survey compared to the average time spent, integrity of the data &#40;straight-lining or pattern responses&#41;, conflicting
                answers, trap questions, and much more are reviewed. Any survey which fails the quality standards are removed from the aggregate data
                and not rewarded the advertised amount. The panelist will be notified which will be considered a first warning but no further action
                will be taken at that time. If a second instance is recorded, the panelist will also not be rewarded and will be warned for the second
                time and participation will be limited for a specific period of time. Upon a third violation, the reward will once again be withheld
                but more importantly the panelist's membership will be terminated. Please be encouraged to provide thoughtful and accurate data at all
                times.
              </Text>

              <Text style={styles.p}>If you have any questions regarding the Data Quality Statement, please contact us.</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Wrapper>
    </>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    padding: 20,
  },
  p: {
    marginTop: 10,
    color: "#333",
    fontFamily: "Montserrat",
  },
  title: {
    color: "#333",
    fontSize: 26,
    fontFamily: "Montserrat",
    fontWeight: 600,
  },
  bullet: {
    color: "#333",
    marginTop: 10,
    fontSize: 20,
    fontFamily: "Montserrat",
    fontWeight: 600,
  },
});
