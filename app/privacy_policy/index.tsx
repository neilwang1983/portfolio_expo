import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { Wrapper } from "@/components/Wrapper";

export default function PrivacyPolicyScreen() {
  return (
    <>
      <Stack.Screen name="PrivatePolicyScreen" options={{ title: "Privacy Policy", headerBackTitle: "Profile" }} />
      <Wrapper>
        <SafeAreaView>
          <ScrollView>
            <View style={styles.box}>
              <Text style={styles.bullet}>Privacy Policy</Text>
              <Text style={styles.p}>Effective On 11/30/2017</Text>
              <Text style={styles.p}>
                This privacy policy applies to https://mindfieldonline.com owned and operated by McMillion Research. This privacy policy describes how
                McMillion Research collects and uses the personal information you provide on our web site: https://mindfieldonline.com. It also
                describes the choices available to you regarding our use of your personal information and how you can access and update this
                information.
              </Text>
              <Text style={styles.p}>
                If you have an unresolved privacy or data use concern that we have not addressed satisfactorily, please contact our U.S.-based third
                party dispute resolution provider (free of charge) at https://feedback-form.truste.com/watchdog/request
              </Text>
              <Text style={styles.p}>If you have questions or complaints regarding our privacy policy or practices, please contact us at:</Text>
              <Text style={styles.subtitle}>Email Address:</Text>
              <Text style={styles.line}>privacy@mindfieldonline.com</Text>
              <Text style={styles.subtitle}>Phone Number:</Text>
              <Text style={styles.line}>800.969.9235</Text>
              <Text style={styles.subtitle}>Fax Number:</Text>
              <Text style={styles.line}>304.343.6522</Text>
              <Text style={styles.subtitle}>Postal Address:</Text>
              <Text style={styles.line}>MindField Online c/o McMillion Research LLC</Text>
              <Text style={styles.line}>1012 Kanawha Blvd. East, Suite 301</Text>
              <Text style={styles.line}>Charleston, WV 25301</Text>

              <Text style={styles.p}>* Please note in any correspondence that the inquiry is in regard to the Privacy Policy</Text>
              <Text style={styles.bullet}>Information Collection and Use</Text>
              <Text style={styles.subtitle}>Registration</Text>
              <Text style={styles.p}>
                To use this website, first complete the registration form and create a user name and password. During registration, you are required
                to give contact information (such as name, address, date of birth, ethnicity, and email address). We use this information to contact
                you about the services on our site in which you have expressed interest such as participating in our surveys.
              </Text>
              <Text style={styles.p}>
                You have the option to provide demographic information (such as income level, gender and zip code). We encourage you to submit this
                information since omission of this information may hinder your being eligible to participate in certain surveys.
              </Text>
              <Text style={styles.p}>
                McMillion Research is the sole owner of the information collected on MindField Online. McMillion Research collects personally
                identifiable information from our users at several different points on our website.
              </Text>
              <Text style={styles.subtitle}>Surveys</Text>
              <Text style={styles.p}>
                We provide you the opportunity to participate in multiple surveys on our site. We may use a third-party service provider to conduct
                these surveys; however, we will not share the personally identifiable information you provide through a survey with other third
                parties unless we give you prior notice and choice. For example, if you agree to participate in a product test, we may need to share
                your personal information such as your name and mailing address with our client in order for the client to send you the product that
                you will be testing. In these cases you will be notified prior to our sharing the information and you can choose whether to in the
                product test. We would not allow our clients to use your information for any other purpose other than to send you the product to be
                tested. For reward purposes, a randomly generated unique identifier will be used for completion tracking.
              </Text>
              <Text style={styles.subtitle}>Facebook</Text>
              <Text style={styles.p}>
                Information obtained via Facebook integration is the sole property of McMillion Research as long as the member chooses to associate
                the information. The member has complete control within the Facebook application of what information is shared and integration with
                MindField Online. This information is not required for MindField Online membership. All privacy statements, policies, and business
                related actions with information obtained via Facebook fall under the same distinctions as the remainder of this privacy policy, in
                full and in part. You can log in to our site using sign-in services such as Facebook Connect or an Open ID provider. These services
                will authenticate your identity and provide you the option to share certain personal information with us such as your name and email
                address to pre-populate our sign up form. Services like Facebook Connect give you the option to post information about your activities
                on this Web site to your profile page to share with others within your network.
              </Text>
              <Text style={styles.bullet}>Communications from the Site</Text>
              <Text style={styles.subtitle}>Invitations</Text>
              <Text style={styles.p}>
                When you pre-qualify for a study you will be sent an invitation email from us. You may not opt-out of this email at this time without
                unsubscribing from https://mindfieldonline.com.
              </Text>
              <Text style={styles.subtitle}>Service-related Announcements</Text>
              <Text style={styles.p}>
                We will send you strictly service-related announcements on rare occasions when it is necessary to do so. For instance, if our service
                is temporarily suspended for maintenance, we might send you an email.
              </Text>
              <Text style={styles.p}>
                Generally, you may not opt-out of these communications, which are not promotional in nature. If you do not wish to receive them, you
                have the option to deactivate your account.
              </Text>
              <Text style={styles.subtitle}>Customer Service</Text>
              <Text style={styles.p}>
                Based on the personally identifiable information you provide us, we will send you a welcoming email to verify your username and
                password. We will also communicate with you in response to your inquiries, to provide the services you request, and to manage your
                account. We will communicate with you by email, telephone or text, in accordance with your wishes.
              </Text>

              <Text style={styles.bullet}>Information Sharing and Disclosure</Text>
              <Text style={styles.subtitle}>Aggregate Information (non-personally identifiable)</Text>
              <Text style={styles.p}>
                As a data collection facility, we share aggregated demographic information about our user base with our partners and advertisers. This
                information does not identify individual users. In cases where we need to link aggregate user data associated with a specific
                individual for reward purposes and the like, we will associate a randomly generated unique identifier.
              </Text>
              <Text style={styles.subtitle}>Personally Identifiable Information</Text>
              <Text style={styles.p}>
                We do not share, sell, or rent personally identifiable information with third parties only in the ways that are described in this
                privacy policy. Such information is needed for online focus groups and recruitments. If personal information is required, you will be
                notified before you participate. Your continued participation in the study after this notification acknowledges that you agree to the
                sharing of your personal information.
              </Text>
              <Text style={styles.subtitle}>Service Providers</Text>
              <Text style={styles.p}>
                We utilize Frontier Communications and Suddenlink Communications as our Internet Service Providers (ISP). These companies are
                authorized to use your personal information only as necessary to provide these services to us.
              </Text>
              <Text style={styles.subtitle}>Legal Disclaimer</Text>
              <Text style={styles.p}>
                We reserve the right to disclose your personally identifiable information as required by law and when we believe that disclosure is
                necessary to protect our rights and/or to comply with a judicial proceeding, court order, or legal process served on our website. In
                certain situations, McMillion Research may be required to disclose personal data in response to lawful requests by public authorities,
                including to meet national security or law enforcement requirements.
              </Text>

              <Text style={styles.bullet}>Opt-out</Text>
              <Text style={styles.p}>
                We provide you the opportunity to opt-out of having your personally identifiable information used for certain purposes, when we ask
                for this information.
              </Text>
              <Text style={styles.p}>
                If you no longer wish to participate in our surveys and receive survey invitations, you may opt-out of receiving them by following the
                instructions included in each newsletter or communication or by emailing us at helpdesk@mindfieldonline.com.
              </Text>
              <Text style={styles.bullet}>Log Files</Text>
              <Text style={styles.p}>
                As is true of most web sites, we gather certain information automatically and store it in log files. This information may include
                internet protocol (IP) addresses, browser type, internet service provider (ISP), referring/exit pages, operating system, date/time
                stamp, and/or clickstream data.
              </Text>
              <Text style={styles.p}>
                We may combine this automatically collected log information with other information we collect about you. We do this to improve
                services we offer you, analytics, and site functionality.
              </Text>
              <Text style={styles.bullet}>Cookies</Text>
              <Text style={styles.p}>
                We use cookies to remember users' settings and for authentication purposes. Users can control the use of cookies at the individual
                browser level. If you reject cookies, you may still use our site, but your ability to use some features or areas of our site may be
                limited. Additionally, some cookies are used to help include you in specific client surveys. You can also reject these but it would
                keep you from receiving those special opportunities.
              </Text>

              <Text style={styles.bullet}>Tracking Technology</Text>
              <Text style={styles.p}>
                Technologies such as: cookies, beacons, tags and scripts are used by McMillion Research and our marketing research partners,
                affiliates, and online customer support provider. These technologies are used in analyzing trends, administering the site, tracking
                users' movements around the site and to gather demographic information about our user base as a whole. We may receive reports based on
                the use of these technologies by these companies on an individual as well as aggregated basis.
              </Text>
              <Text style={styles.p}>
                We partner with a third party to either display advertising on our website or to manage our advertising on other sites. Our third
                party partner may use cookies or similar technologies in order to provide you advertising based upon your browsing activities and
                interests. If you wish to opt out of interest-based advertising at https://preferences-mgr.truste.com/. Please note you will continue
                to receive generic ads.
              </Text>
              <Text style={styles.bullet}>Social Media Widgets</Text>
              <Text style={styles.p}>
                Our Web site includes Social Media Features, such as the Facebook Like button [and Widgets, such as the Share this button or
                interactive mini-programs that run on our site]. These Features may collect your IP address, which page you are visiting on our site,
                and may set a cookie to enable the Feature to function properly. Social Media Features and Widgets are either hosted by a third party
                or hosted directly on our Site. Your interactions with these Features are governed by the privacy policy of the company providing it.
              </Text>
              <Text style={styles.bullet}>Links to Other Sites</Text>
              <Text style={styles.p}>
                This website may contain links to other sites that are not owned or controlled by McMillion Research. Please be aware that we,
                McMillion Research, are not responsible for the privacy practices of other such sites.
              </Text>
              <Text style={styles.p}>
                We encourage you to be aware when you leave our site and to read the privacy policies of each and every website that collects
                personally identifiable information.
              </Text>
              <Text style={styles.p}>This privacy policy applies only to information collected by this Website.</Text>
              <Text style={styles.p}>
                We may share your personal information and/or social-demographic information, including, without limitation, a unique identification
                number ("UID"), zipcode/postal code, date of birth, gender, marital status, education, ethnicity/race (where permitted by applicable
                law), employment related information, and non-personally identifiable information on household members, with third party sample/market
                research companies (individually each a "Third Party MR Company" and collectively the "Third Party MR Companies") for the purpose of
                identifying survey opportunities that you may be eligible for through the Third Party MR Companies. If you are eligible for a survey
                opportunity, the Third Party MR Company will provide your unique identification number and a survey link to us and we will invite you
                to participate in the survey. We will not share your name, email address, or phone number with the Third Party MR Companies. If you
                have any questions about this data sharing or want to opt-out of the data sharing please contact us at helpdesk@mindfieldonline.com.
                Your participation in such survey opportunities does not entitle you to any benefits offered by or membership with the Third Party MR
                Companies.
              </Text>
              <Text style={styles.bullet}>Co-branded sites</Text>
              <Text style={styles.p}>
                Co-branding is the method of having a user connect with a different website but make it appear to be the same site. In certain
                circumstance our clients may prefer to host the questionnaires themselves. If this is the case, the questionnaires may appear to be
                from https://mindfieldonline.com. Information provided to the clients is outlined in the Information Sharing and Disclosure section.
              </Text>
              <Text style={styles.bullet}>Access to Personally Identifiable Information</Text>
              <Text style={styles.p}>
                Upon request McMillion Research will provide you with information about whether we hold any of your personal information. If your
                personally identifiable information changes, or if you no longer desire our service, you may correct, update, delete or deactivate it
                by making the change on our member information page or by emailing our Customer Support at helpdesk@mindfieldonline.com or by
                contacting us by telephone or postal mail at the contact information listed below. We will respond to your request to access within a
                reasonable timeframe.
              </Text>
              <Text style={styles.p}>
                We will retain your information for as long as your account is active or as needed to provide you services. We will retain and use
                your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements
              </Text>
              <Text style={styles.bullet}>Security</Text>
              <Text style={styles.p}>
                We follow generally accepted industry standards to protect the personal information submitted to us, both during transmission and once
                we receive it. No method of transmission over the Internet, or method of electronic storage, is 100 percent secure, however.
                Therefore, while we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute
                security.
              </Text>
              <Text style={styles.p}>If you have any questions about security on our website, you can emails at privacy@mindfieldonline.com.</Text>
              <Text style={styles.bullet}>Business Transitions</Text>
              <Text style={styles.p}>
                In the event McMillion Research goes through a business transition, such as a merger, acquisition by another company, or sale of all
                or a portion of its assets, your personally identifiable information will likely be among the assets transferred. You will be notified
                via email or prominent notice on our website for 30 days of any such change in ownership or control of your personal information.
              </Text>

              <Text style={styles.bullet}>Changes in This Privacy Policy</Text>
              <Text style={styles.p}>
                If we decide to change our privacy policy, we will post those changes to this privacy policy, the homepage, and other places we deem
                appropriate so that you are aware of the information we collect, how we use it, and under what circumstances, if any, we disclose it.
              </Text>
              <Text style={styles.p}>
                We reserve the right to modify this privacy policy at any time, so please review it frequently. If we make material changes to this
                policy, we will notify you here, by email, or by means of a notice on our home page prior to the change becoming effective.
              </Text>
              <Text style={styles.bullet}>Contact Us </Text>
              <Text style={styles.p}>
                If you have any questions or suggestions regarding our privacy policy, please contact us using one of the following options below:
              </Text>
              <Text style={styles.subtitle}>Email Address:</Text>
              <Text style={styles.line}>privacy@mindfieldonline.com</Text>
              <Text style={styles.subtitle}>Phone Number:</Text>
              <Text style={styles.line}>800.969.9235</Text>
              <Text style={styles.subtitle}>Fax Number:</Text>
              <Text style={styles.line}>304.343.6522</Text>
              <Text style={styles.subtitle}>Postal Address:</Text>
              <Text style={styles.line}>MindField Online c/o McMillion Research LLC</Text>
              <Text style={styles.line}>1012 Kanawha Blvd. East, Suite 301</Text>
              <Text style={styles.line}>Charleston, WV 25301</Text>
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
    color: "#666",
    marginTop: 10,
    fontFamily: "Montserrat",
  },
  line: {
    color: "#666",
    fontFamily: "Montserrat",
  },
  title: {
    color: "#333",
    fontSize: 26,
    fontWeight: 600,
    fontFamily: "Montserrat",
  },
  subtitle: {
    color: "#333",
    marginTop: 10,
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
