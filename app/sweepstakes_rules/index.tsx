import React from "react";
import { Stack } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { View, ScrollView, Text, StyleSheet, Platform } from "react-native";

export default function SweepstakesScreen() {
  return (
    <>
      <Stack.Screen name="SweepstakesScreen" options={{ title: "Sweepstakes Rules", headerBackTitle: "Profile" }} />
      <Wrapper>
        <ScrollView>
          <View style={styles.box}>
            <Text style={styles.title}>Official Sweepstakes Rules</Text>
            <Text style={styles.bullet}>Who Can Enter</Text>
            <Text style={styles.p}>
              The Sweepstakes is open to any legal U. S. resident, age 18 or older and is registered/activated at https://mindfieldonline.com.
              Employees of MindField Online or McMillion Research or their subsidiaries and members of their households or immediate families are not
              eligible to participate. By participating in the Sweepstakes, each entrant accepts and agrees to comply with these official rules,
              including notification via email only. VOID WHERE PROHIBITED BY LAW.
            </Text>

            <Text style={styles.bullet}>How to Enter</Text>
            <Text style={styles.p}>
              For those not currently a registered/activated member in joining the MindField Online internet panels, a sweepstakes entry may be
              obtained by sending a postcard with the entrant's full name, postal address, phone number, and email address to the postal address
              below.
            </Text>
            <Text style={styles.p}>All other entries will be awarded for those who complete our monthly Poller Bear survey.</Text>
            <Text style={{ fontWeight: "bold", marginTop: 10, color: "#333" }}>Postal Address:</Text>
            <Text style={{ color: "#333" }}>MindField Online Drawing</Text>
            <Text style={{ color: "#333" }}>1012 Kanawha Blvd. East, Suite 301</Text>
            <Text style={{ color: "#333" }}>Charleston, WV 25301</Text>

            <Text style={styles.bullet}>Sweepstakes Dates</Text>
            <Text style={styles.p}>
              The sweepstakes will begin on the first calendar day of the month, or at the time the Poller Bear survey is launched, and conclude on
              the final calendar day of the month, or at such time the survey is closed.
            </Text>
            <Text style={styles.bullet}>Prizes</Text>
            <Text style={styles.p}>
              The total retail value of all sweepstakes prize is $50.00. All federal, state, and/or local taxes are the sole responsibility of the
              winner. The winner may be required to complete an affidavit of eligibility.
            </Text>
            <Text style={styles.bullet}>Odds of Winning</Text>
            <Text style={styles.p}>
              The odds of winning the sweepstakes depends on the number of eligible entries received during the Poller Bear survey period.
            </Text>
            <Text style={styles.bullet}>Selection of Winners</Text>
            <Text style={styles.p}>
              A random electronic drawing will take place within 10 days of the conclusion of each month's Poller Bear survey.
            </Text>
            <Text style={styles.bullet}>Notification</Text>
            <Text style={styles.p}>
              The winner will receive the $50 winnings into their Mindfield Account. Anyone winning from a mail entry will be required to choose an
              electronic means provided for receiving their winnings.
            </Text>
            <Text style={styles.bullet}>Release of Liability</Text>
            <Text style={styles.p}>
              MindField Online and McMillion Research (sponsor) have no responsibility for any injuries, losses, and/or damages of any kind that
              result from acceptance, possession, or use of any prize. MindField Online and McMillion Research assume no liability for technical or
              computer malfunctions of any kind resulting in lost registration forms. MindField Online reserves the right to suspend, modify or
              terminate the Sweepstakes at any time if it is determined that technical or computer malfunctions have occurred which effect the
              integrity of the sweepstakes.
            </Text>
            <Text style={styles.bullet}>Governing Law</Text>
            <Text style={styles.p}>
              These official rules and the obligations resulting from them are to be governed by the laws of the State of West Virginia.
            </Text>
            <Text style={styles.bullet}>Publicity</Text>
            <Text style={styles.p}>
              MindField Online respects its members' privacy rights. For more information, please refer to our Privacy Statement. No public
              notification will be provided of the winner. Email inquiries will receive a confirmation of the date of the drawing occurrence but no
              information on the winner.
            </Text>
            <Text style={styles.bullet}>Copy of Rules and Prize Winners</Text>
            <Text style={styles.p}>
              For a copy of these official sweepstakes rules, or a list of prize winners, send a self-addressed stamped envelope to the postal address
              below.
            </Text>
            <Text style={styles.subtitle}>Postal Address:</Text>
            <Text style={styles.line}>MindField Online Drawing</Text>
            <Text style={styles.line}>1012 Kanawha Blvd. East, Suite 301</Text>
            <Text style={styles.line}>Charleston, WV 25301</Text>
            <Text style={styles.bullet}>Sponsor</Text>

            {Platform.OS == "ios" ? (
              <Text style={styles.p}>
                This Sweepstakes is sponsored by McMillion Research LLC. Apple is not the sponsor nor envolved anyway in this Sweepstakes.
              </Text>
            ) : (
              <Text style={styles.p}>This Sweepstakes is sponsored by McMillion Research LLC.</Text>
            )}
          </View>
        </ScrollView>
      </Wrapper>
    </>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    padding: 20,
    marginBottom: 100,
  },
  p: {
    color: "#333",
    marginTop: 10,
    fontFamily: "Montserrat",
  },
  line: {
    color: "#333",
    fontFamily: "Montserrat",
  },

  span: {
    color: "#333",
    fontFamily: "Montserrat",
  },
  title: {
    fontSize: 24,
    fontFamily: "Montserrat",
    fontWeight: 600,
  },
  subtitle: {
    fontFamily: "Montserrat",
    fontWeight: 600,
    marginTop: 10,
  },
  bullet: {
    color: "#333",
    marginTop: 10,
    fontSize: 20,
    fontFamily: "Montserrat",
    fontWeight: 600,
  },
  bold: {
    fontFamily: "Montserrat",
    fontWeight: 600,
  },
});
