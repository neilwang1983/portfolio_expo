import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { Wrapper } from "@/components/Wrapper";

export default function TermOfUseScreen() {
  return (
    <>
      <Stack.Screen name="PrivatePolicyScreen" options={{ title: "Privacy Policy", headerBackTitle: "Profile" }} />
      <Wrapper>
        <SafeAreaView>
          <ScrollView>
            <View style={styles.box}>
              <Text style={styles.bullet}>Policies and Membership Terms of Agreement</Text>
              <Text style={styles.p}>
                MindField Online is pleased that you have chosen to join our online panel for survey research. It is our intent to offer you an honest
                way of earning additional income by participating in our online surveys. Below are some brief terms, which you must read and agree to
                prior to completing our registration process. Your registration confirms your willingness to abide by these terms, the terms to
                follow, and all eligibility determinations as prescribed by MindField Online, it's clients, or other parties pertinent to our
                research.
              </Text>
              <Text style={styles.p}>
                MindField Online is an equal opportunity provider. However, by statute the following persons, their immediate family (spouse,
                children, sibling, parent, grandparent) or other household members must be considered ineligible for participation in our surveys;
                employees and management of McMillion Research, LLC and MindField Online; certain affiliates; public relation firms; advertising
                firms; marketing firms; and marketing research and analysis firms, consultants, and contractors.
              </Text>
              <Text style={styles.bullet}>How to Register:</Text>
              <Text style={styles.p}>
                Registration is a must and is the initial phase of becoming a MindField Online panel member. Only one registration per person will be
                accepted and all required information must be provided as a means of validating your membership. After completing the initial required
                information questionnaire, you will receive an email with our panel participant survey which will allow us to best choose the surveys
                most suited for you and/or your household members.
              </Text>
              <Text style={styles.bullet}>Conditions:</Text>
              <Text style={styles.p}>
                Individuals are invited to register to become a member of the MindField Online member community. Eligibility to participate in online
                surveys varies per project and is determined by MindField Online's clientele. Surveys are targeted towards panel members with similar
                qualifying criteria as provided during registration. Cash incentives are offered to panel members for completing each survey.
                McMillion Research, LLC and MindField Online reserves the right to change, add or dissimulate these conditions at their discretion and
                at any time. The content and stimuli (pictures, videos, question verbiage, etc.) used in our surveys is the property of McMillion
                Research, L.L.C, our companies, and our clients.
              </Text>
              <Text style={styles.bullet}>Eligibility:</Text>
              <Text style={styles.p}>
                By law, all registrants must be no less than 15 years old. You must also be a legal resident of the country you designate during the
                registration process. Upon registering you must create a unique user name , password and a viable, working email address. Registering
                gives MindField Online permission to send you related emails which pertain to but may not be limited to messages regarding your
                participation in surveys.
              </Text>
              <Text style={styles.p}>
                By providing additional information pertaining to the other members of your household, MindField Online may contact you regarding the
                participation of the other members of your household in other surveys. This will always be explained in the text of the email to make
                certain the proper household member responds. Their participation will be garnered using your unique user name and password.
              </Text>
              <Text style={styles.p}>
                Unless it is under the previous terms regarding the other members of your household, no panel member may provide any other person to
                use their unique user name and password to complete surveys that were not intended for them. If it is determined that individuals
                other than the panel member or other invited household members are completing surveys using the member's unique user name and
                password, payments for these surveys will not be made. Such abuse of the terms of agreement may constitute in the removal of your
                membership and disqualification of any future participation. You are provided an opportunity to provide a commercial service to
                MindField Online and you agree not to use, disclose, duplicate, sell, or distribute the information contained in our surveys for any
                purpose.
              </Text>
              <Text style={styles.bullet}>Disqualification:</Text>
              <Text style={styles.p}>
                MindField Online and McMillion Research, LLC assume no responsibility for any connection losses and/or difficulties; transmission
                failures either via telephone or computer; technical failures; or any other human, software, hardware, or electronic errors of any
                type. Anyone abusing or altering any aspect of the websites associated with MindField Online will be eliminated and disqualified from
                participating in surveys and their membership will be dissolved as well as proper legal action taken as necessary.
              </Text>
              <Text style={styles.p}>
                MindField Online and/or their clients reserve the right to disqualify a panel member's participation in any survey if it is believed
                that the information provided was not accurate or was fabricated in any way. Payment will not be awarded in such cases. See Data
                Quality Statement for more information.
              </Text>

              <Text style={styles.bullet}>Incentives:</Text>
              <Text style={styles.p}>
                Cash incentives are provided for full participation in most MindField Online surveys. Cash payments are only made if the panel member
                is in good standing and there were not validation or data quality problems. As part of the membership process you permit MindField
                Online and/or it's affiliates to contact you to validate your participation and the accuracy of your responses.
              </Text>

              <Text style={styles.bullet}>Privacy:</Text>
              <Text style={styles.p}>
                All information provided during registration is considered entirely private and confidential and will never be reported on an
                individual basis, which directly identifies the panel member. No third party is ever sold any information provided to MindField
                Online. For more information, please refer to our Privacy Policy.
              </Text>

              <Text style={styles.bullet}>Sweepstakes Rules:</Text>
              <Text style={styles.p}>The offical sweepstakes rules can be found on the Sweepstakes Page.</Text>
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
    color: "#333",
    marginTop: 10,
    fontFamily: "Montserrat",
  },
  title: {
    color: "#333",
    fontSize: 26,
    fontWeight: 600,
    fontFamily: "Montserrat",
  },
  bullet: {
    color: "#333",
    marginTop: 10,
    fontSize: 20,
    fontWeight: 600,
    fontFamily: "Montserrat",
  },
});
