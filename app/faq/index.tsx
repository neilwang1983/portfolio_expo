import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { Collapsible } from "@/components/Collapsible";

export default function FAQScreen() {
  return (
    <>
      <Stack.Screen name="FAQScreen" options={{ title: "FAQ", headerBackTitle: "Profile" }} />
      <Wrapper>
        <ScrollView style={{ width: "100%" }}>
          <View style={{ padding: 20 }}>
            <View style={styles.titleBox}>
              <Text style={styles.title}>General</Text>
            </View>
            <Collapsible title="How Much Does It Cost to Join?">
              <Text style={styles.text}>
                It is absolutely free to join! All you need to do is register with MindField Online to be eligible to participate in our surveys and
                projects to earn cash and win prizes. We will never ask you for money or attempt to sell you anything. We advise you to be suspicious
                of acompanies or their agents who request a fee for you to join panels like ours, as we have no such affiliations.
              </Text>
            </Collapsible>

            <Collapsible title="What must I do to become a member? ">
              <Text style={styles.text}>
                It's simple. Complete the registration process and fill out the brief profile survey. When we have a study we feel would be of
                interest to you, we will email you an invitation to participate.
              </Text>
            </Collapsible>

            <Collapsible title="How does the overall process operate?">
              <Text>
                We have created a page that details each step of the MindField Online survey process. You may view it by clicking How It Works.
              </Text>
            </Collapsible>

            <Collapsible title="Can I join if I live somewhere other than the United States?">
              <Text style={styles.text}>
                We are currently only accepting residents within the United States and Canada. We expect this to change in the near future.
              </Text>
            </Collapsible>

            <Collapsible title="How many people can sign up using the same email address? ">
              <Text style={styles.text}>
                Only one person should register per email address. The information we maintain on your account should be specific to you and your
                immediate family or household. We also suggest that only one membership per household be registered to eliminate potential duplication
                and data quality issues.
              </Text>
            </Collapsible>

            <Collapsible title="How many times can I participate?">
              <Text style={styles.text}>
                You can participate once per survey invitation. Our clients occasionally set restrictions on the amount of time that must pass between
                participation in certain research studies. This varies from project to project and is determined by our clientele. From time to time,
                we have projects available in our Take A Survey area on our website. So, if you haven't received an email invitation for a survey, you
                may find opportunities there.
              </Text>
            </Collapsible>

            <Collapsible title="I have more than one computer, which one should I refer to when answering any questions that refer to my computer? ">
              <Text style={styles.text}>Please select the computer you use most often when completing our surveys.</Text>
            </Collapsible>

            <Collapsible title="How much time will I spend completing a survey?">
              <Text style={styles.text}>
                The length of time is different per survey, but we try to keep all of our projects as brief as possible. Most surveys are generally
                very short and take between 5 and 15 minutes. Your email invitation will always describe each survey and note its expected length. Of
                course, connection speed and other things beyond our control may have an effect on overall time spent.
              </Text>
            </Collapsible>

            <Collapsible title="What must I do to be entered in a sweepstakes?">
              <Text style={styles.text}>
                Every survey that you take, you account will be entered into our sweepstakes drawling. For a list of the prizes that we give out
                during our sweepstakes, please visit our Prizes Page. For more information about our sweepstakes and rules on the sweepstakes, please
                visit our Sweepstakes Page.
              </Text>
            </Collapsible>

            <Collapsible title="What if I opt-out or cancel my membership?">
              <Text style={styles.text}>
                If you no longer wish to receive emails from MindField Online you can request to be opted-out by emailing support@mindfieldonline.com.
                This will allow you to stop receiving emails but maintain your account status as live. Activated members can choose to log in to their
                account and Cancel Membership. Keep in mind, this will delete all personal information and study history information as well as
                forfeit any unclaimed monies. There is no way to recover this information once deleted.
              </Text>
            </Collapsible>

            <View style={styles.titleBox}>
              <Text style={styles.title}>Account</Text>
            </View>
            <Collapsible title="Can I change my email address?">
              <Text style={styles.text}>
                You may do so at any time by logging into the member area. Please note that your account will temporarily be deactivated until you
                respond to the activation email sent to the new email.
              </Text>
            </Collapsible>

            <Collapsible title="What if I forget my password? ">
              <Text style={styles.text}>
                Your original password is encrypted and cannot be retrieved from our database. We can, however, issue you a new password and send it
                to the email you registered with. Visit, Reset Password to do this.
              </Text>
            </Collapsible>

            <Collapsible title="It says I haven't activated / I never received my activation email. / My activation email was unreadable?">
              <Text style={styles.text}>
                Make sure that email has not been caught in your email providers spam filter. Most web based email providers (hotmail, yahoo, msn,
                aol, etc.) have a special spam or bulk mail folder to which this message may have been dumped to. Make sure that
                support@mindfieldonline.com and surveys@mindfieldonline.com are in either your address book or 'whitelist' before having your email
                resent. If you receive an unreadable email, then your client does not support inline html properly. The resend activation page will
                send a plain text version of the activation email for you to read. Make sure that you change your email options to plain text once you
                have successfully logged in to avoid this in the future. Visit, Resend Activation to have a new activation email sent to you.
              </Text>
            </Collapsible>

            <Collapsible title="How is my privacy protected?">
              <Text style={styles.text}>
                Your email address is used to identify you and your account information. Your mailing address is needed to send your incentives when
                requested. Your password allows you and only you access to this information. To understand more of our commitment to your privacy,
                please read our Privacy Policy.
              </Text>
            </Collapsible>

            <Collapsible title="How do I submit a question or a complaint? ">
              <Text style={styles.text}>
                You can always contact us at support@mindfieldonline.com. Please provide as much information as possible, including the four digit
                study number from the subject line of your survey invitation, if applicable. It is our intent to respond to you within 24-48 hours.
              </Text>
            </Collapsible>

            <Collapsible title="If I have several email addresses, which one should I use?">
              <Text style={styles.text}>
                Please use the email address you entered when registering. Our system will recognize you only when you use your registered address.
                Remaining consistent helps us keep better track of you, your participation, and your incentives. If at any time you would like to
                change your registered email address, you can do so in the member area.
              </Text>
            </Collapsible>

            <Collapsible title="Why did I receive an email after registering saying I needed to activate my account?">
              <Text style={styles.text}>
                By law, you must double opt-in to fully register as a member of our panel. It is also important that you take a brief survey for us
                learn more about you so we can best choose surveys that are appropriate for you. To make certain that we do not contact you again in
                the event that you are not interested, we will remove your information from our records after 30 days if you do not complete the
                activation process.
              </Text>
            </Collapsible>

            <View style={styles.titleBox}>
              <Text style={styles.title}>Surveys</Text>
            </View>
            <Collapsible title="What do I do when I experience technical difficulties during a survey? ">
              <Text style={styles.text}>
                If you experience any problems, please email us at support@mindfieldonline.com . In the email provide as much information about your
                problem as possible. Providing additional information such as the browser and Internet service provider you are using may be helpful.
                When possible, always provide the four digit study number from your email invitation.
              </Text>
            </Collapsible>

            <Collapsible title="What happens when I attempt to complete a survey but not all of the information downloads properly to my computer screen?">
              <Text style={styles.text}>
                Occasionally a survey may not load correctly. Issues within your Internet settings or provider can create these instances. When
                possible, click on your refresh button to redisplay the page. When that is not an option, you can close your internet browser and
                click the invitation link to resume where you left off.
              </Text>
            </Collapsible>

            <Collapsible title="Why can't I find/use the back button on a survey?">
              <Text style={styles.text}>
                We disable the "back" feature in order to protect the integrity of the data on some surveys. Moving back and forth in a survey can
                cause your data to conflict and disqualify you from the survey.
              </Text>
            </Collapsible>

            <Collapsible title="What do I do when the link in my invitation does not work? ">
              <Text style={styles.text}>
                If you copied and pasted the link into your browser, make certain that the entire link was captured. If the link is correct, it may
                have simply been a loading problem. Refresh the button and see if the site loads properly. If it does not, it is possible that we are
                experiencing difficulties beyond our control. Normally these problems correct themselves in a minimal amount of time. Please wait a
                few minutes and try again.
              </Text>
            </Collapsible>

            <Collapsible title="Many surveys ask for some of the same information I have already provided. Why?">
              <Text style={styles.text}>
                MindField Online maintains a very strict privacy policy regarding our panel members' profile information. We use this information to
                match your interests with projects and surveys suited to your tastes. To ensure that it is indeed you that is returning to take a
                survey, it is sometimes necessary to include profile questions in the surveys themselves. Also, when you sign up with MindField
                Online, we ask about other people living in your household, so we can include their participation in upcoming projects as well.
                Surveys for which others in your home qualify may require some profile information since we do not always have their info in our
                database. Additionaly, we will never provide your profile information to our third party clients without your knowledge.
              </Text>
            </Collapsible>

            <Collapsible title="Why am I told that I do not qualify for a survey that I am trying to complete? ">
              <Text style={styles.text}>
                It simply means the project's requirements do not match your responses or that we already have enough participants for that particular
                study. Many times a study will be targeted at specific demographics, such as males age 18 to 30 or females who work in a specific
                field. There is usually a limit on how many qualified participants we can accept. If you do not meet the requirements of the study, or
                if the maximum amount of respondents have completed it already, you will not qualify to complete it. You will, however, be entered
                into our monthly prize drawing in return for your participation.
              </Text>
            </Collapsible>

            <Collapsible title="How long do I have to complete a survey after I receive my email invitation?">
              <Text style={styles.text}>
                A survey's duration varies. Some last only 24 hours while others can last up to two weeks or more. We strongly encourage you to
                complete each invitation at your earliest convenience because respondents are accepted on a first-come, first serve basis. Cnce the
                targeted number of completes are achieved the project will be closed.
              </Text>
            </Collapsible>

            <Collapsible title="What is the Live Now! Section on my member page?">
              <Text style={styles.text}>
                These are real surveys that are currently available to you because you have associated your account with Facebook. You can access
                these surveys by simply clicking on the link provided. Why wait for the email rotation when you can participate Now!
              </Text>
            </Collapsible>

            <View style={styles.titleBox}>
              <Text style={styles.title}>Payment</Text>
            </View>
            <Collapsible title="What do I receive in terms of compensation?">
              <Text>
                Every project offers eligible panelists a chance to receive or win valuable rewards. In order to make it faster and easier to receive
                your prizes, domestic panelists will automatically have a MindField Online account established into which any cash rewards will be
                deposited. All advertised incentives are in U.S. currency and will be distributed accordingly.
              </Text>
            </Collapsible>

            <Collapsible title="How do I collect my earnings?">
              <Text style={styles.text}>
                It couldn't be easier. Once you have earned a minimum of $5.00, simply login to the member page and click "Click Here to Cashout!!!"
                under Member Summary on the right navigation panel. After you confirm your mailing and email address, your payment will be processed
                within 1-2 weeks depending on the day of the week it is submitted and sent by the method that you select on the cashout page.
              </Text>
            </Collapsible>

            <Collapsible title="How long will it take to receive my earnings via PayPal? ">
              <Text style={styles.text}>
                PayPal Payments are processed the same day and submitted to PayPal every Monday. PayPal will process the payments to your PayPal
                account within 5-10 business days. PayPal payment is not instant , however, and can take an additional week to process in PayPal's
                system.
              </Text>
            </Collapsible>

            <Collapsible title="If I already have a PayPal account, how do I collect my earnings?">
              <Text style={styles.text}>
                PayPal allows for multiple email addresses to share the same PayPal account. To add your MindField Online email address to your PayPal
                account, log into your PayPal account and go to 'Profile'. There will be a section allowing you to add up to seven additional email
                addresses to your already created PayPal account.
              </Text>
            </Collapsible>

            <Collapsible title="How long will it take to be credited for completing a survey? ">
              <Text style={styles.text}>
                Survey credits are made to accounts 10-14 days after a study closes, not after individual survey completion. When a study will close
                varies and depends on how quickly the various demographics and quotas are filled. In the case of in-home product tests, crediting is
                not done until any element that must be returned is also received. Other surveys require a very large user base, and sometimes this
                takes longer than normal to fill the quota. This being said, some surveys can take longer than a week and up to several months (which
                is very rare) before your account is credited. If you have questions regarding crediting or would like an estimate when you will
                receive the credit, simply email us at support@mindfieldonline.com and include the specific study number.
              </Text>
            </Collapsible>

            <Collapsible title="Do you accept Paypal or other forms of payment? ">
              <Text style={styles.text}>Currently we offer two forms of payment, Standard Check and PayPal.</Text>
            </Collapsible>

            <Collapsible title="What are your polices on Refunds? ">
              <Text style={styles.text}>
                Refunds can be issued if the method of payment is Standard Check. If the timeframe of the check request has been over 90 days and the
                check has not been cashed, then a support ticket can be submitted for a re-issue of earnings. Written confirmation of updated address
                must be sent along with the support ticket to have the standard check re-issued. PayPal refunds will only be issued if the error falls
                on MindField Online. If PayPal payment is sent to an address that is on file, it then becomes the responsibility of the panel member
                to create a PayPal account to access those funds.{" "}
              </Text>
            </Collapsible>

            <View style={styles.titleBox}>
              <Text style={styles.title}>Member Panel</Text>
            </View>
            <Collapsible title="Why do I have to answer all of these questions?">
              <Text style={styles.text}>
                The member questionnaires gather basic background information about you. Information you provide is strictly confidential and will be
                used for marketing research purposes only. Once you submit your questionnaire, you can participate in any of our projects. This
                information is used to predetermine the surveys, which may be appropriate for you. For example, if we are doing a survey regarding pet
                food and you have pets, we can send an invite which you will have a greater chance of qualifying for. These questionnaires are
                optional and are unpaid but they will help us to determine which paid surveys you are most likely to qualify for so that we can send
                them to you.
              </Text>
            </Collapsible>

            <Collapsible title="What is the information I provide used for?">
              <Text style={styles.text}>
                The information is stored in our internal and secure database and is used to determine which people match up with specific survey
                requirements. Your profile information is highly confidential and will be used solely by our company for the intent of survey
                research. The only personal information we will ever share with an outside party is the information required to participate in a
                specific study. Please refer to our Privacy Policy.
              </Text>
            </Collapsible>

            <Collapsible title="Why do you ask for my address, age, and income?">
              <Text style={styles.text}>
                In order to establish a MindField Online account for you, we must have a valid address to send you any incentives that you accumulate.
                Also, federal regulations require that we ask your age because contacting anyone under 15 without parental consent is illegal. For
                questions that some panelists may feel are too sensitive to answer, we provide a "prefer not to say" option.
              </Text>
            </Collapsible>
          </View>
          <View style={{ height: 100 }}></View>
        </ScrollView>
      </Wrapper>
    </>
  );
}
const styles = StyleSheet.create({
  title: {
    color: "#333",
    fontSize: 26,
    fontWeight: 600,
    fontFamily: "Montserrat",
  },
  titleBox: {
    padding: 20,
  },
  text: {
    color: "#666",
  },
});
