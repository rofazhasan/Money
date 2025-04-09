import React, { JSX } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { ProfileContext } from "../providers/Profile";
import { TransactionsContext } from "../providers/Transactions";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "../types/Navigator";
import Icon from "../components/Icon";
import ProfileIcon from "../assets/images/svgs/Profile";
import AboutIcon from "../assets/images/svgs/About";
import DonationIcon from "../assets/images/svgs/Donation";

type Props = StackScreenProps<StackParamList, "Profile">;

const ProfileSettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { handleUsername, username } = React.useContext(ProfileContext);
  const { elucidateTopExpenses } = React.useContext(TransactionsContext);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.spacingBuffer} />
      <View style={styles.usernameInput}>
        <View style={styles.iconContainer}>
          <Icon svg={ProfileIcon} fill="#050505" height={37} width={37} />
        </View>
        <TextInput
          style={styles.nameInput}
          onChangeText={handleUsername}
          value={username}
          placeholder="Enter your appellation..."
        />
      </View>

      <View style={styles.spendingInsights}>
        <Text style={styles.insightsTitle}>Top Expenditure Categories</Text>
        <View style={styles.topExpensesContainer}>
          <elucidateTopExpenses />
        </View>
      </View>

      <TouchableWithoutFeedback onPress={() => navigation.navigate("About")}>
        <View style={styles.navigationCard}>
          <View style={styles.iconContainer}>
            <Icon svg={AboutIcon} fill="#000000" height={37} width={37} />
          </View>
          <Text style={styles.navigationText}>About Application</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableOpacity style={styles.donateButtonContainer} onPress={() => navigation.navigate("Donate")}>
        <View style={[styles.navigationCard, styles.actionButton]}>
          <Text style={[styles.navigationText, styles.actionText]}>Extend Gratitude</Text>
          <View style={[styles.iconContainer, styles.actionIcon]}>
            <Icon svg={DonationIcon} fill="#171717" height={37} width={37} />
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.spacingBuffer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
  },
  spacingBuffer: {
    height: 35,
  },
  usernameInput: {
    height: 48, // Slightly increased for better touch target
    flexDirection: "row",
    alignItems: "center", // Vertically align icon and input
  },
  iconContainer: {
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  nameInput: {
    flex: 1,
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    textAlignVertical: "center",
    color: "#050505",
  },
  spendingInsights: {
    marginVertical: 35,
  },
  insightsTitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 18, // Slightly increased for emphasis
    color: "#050505",
    marginBottom: 12,
  },
  topExpensesContainer: {
    flexDirection: "column",
  },
  navigationCard: {
    height: 50, // Slightly increased for better touch target
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 8, // Added padding
    borderRadius: 6, // Subtle rounding
    backgroundColor: "#f7f7f7", // Light background for visual separation
  },
  navigationText: {
    flex: 1, // Allow text to take up space
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    textAlignVertical: "center",
    color: "#050505",
  },
  actionButton: {
    marginTop: 20,
    backgroundColor: "#D1FBEA",
    flexDirection: "row-reverse", // Icon on the right
    alignItems: "center",
    justifyContent: "flex-end", // Push icon to the right
    paddingHorizontal: 15, // Add some padding to the button
  },
  actionText: {
    color: "#171717",
    textAlign: "left", // Align text to the left
    marginRight: 15, // Add some margin to the text
  },
  actionIcon: {
    marginLeft: 15,
  },
});

export default ProfileSettingsScreen;
