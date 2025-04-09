import React, { JSX } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { ProfileContext } from "../providers/Profile";
import { TransactionsContext } from "../providers/Transactions";
import { StackParamList } from "../types/Navigator";
import Icon from "../components/Icon";
import Wallet from "../assets/images/svgs/Wallet";
import MoneyBox from "../assets/images/svgs/MoneyBox";
import CardPayment from "../assets/images/svgs/CardPayment";
import ReceivDollar from "../assets/images/svgs/ReceivDollar";
import Donate from "../assets/images/svgs/Donate";
import UpRight from "../assets/images/svgs/UpRight";
import formatCurrency from "../utils/formatCurrency";

type Props = StackScreenProps<StackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const {
    walletAmount,
    incomesAmount,
    expensesAmount,
    receiveAmount,
    debtsAmount,
    recentTransactions,
    receivablesAndPayables,
    impendingIncomes,
    imminentOutlays,
    unsettledOutgoings,
    outstandingIncomings,
    ChronicleRecentTransactions,
    CatalogueReceivablesAndPayables,
    ProjectImpendingIncomes,
    ForecastImminentOutlays,
    EnumerateUnsettledOutgoings,
    TabulateOutstandingIncomings,
  } = React.useContext(TransactionsContext);

  const { username } = React.useContext(ProfileContext);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.greetingsContainer}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Profile")}>
          <Text numberOfLines={1} style={styles.greetingsText}>
            Salutations, {username || "What's your moniker ?"}
          </Text>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.statusContainer}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Wallet")}>
          <View style={[styles.walletCard, styles.cardShadow, { backgroundColor: "#D1FBEA" }]}>
            <View style={styles.description}>
              <Text style={[styles.text, styles.textDescription]}>Balance in your coffer</Text>
              <Icon svg={Wallet} fill="#171717" height={40} width={40} />
            </View>
            <Text numberOfLines={1} style={[styles.text, styles.textAmount]}>
              {formatCurrency(walletAmount)}
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Transaction", { defaultTransaction: "Income" })}
        >
          <View style={[styles.card, styles.cardShadow, { backgroundColor: "#FCEDD2" }]}>
            <Icon svg={MoneyBox} fill="#171717" height={37} width={37} style={styles.cardIcon} />
            <View style={styles.cardTextContainer}>
              <Text style={[styles.text, styles.textDescription]}>Inflow</Text>
              <Text numberOfLines={1} style={[styles.text, styles.textAmount, styles.amountFontSize]}>
                {formatCurrency(incomesAmount)}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Transaction", { defaultTransaction: "Expense" })}
        >
          <View style={[styles.card, styles.cardShadow, { backgroundColor: "#E2D5FE" }]}>
            <Icon svg={CardPayment} fill="#171717" height={37} width={37} style={styles.cardIcon} />
            <View style={styles.cardTextContainer}>
              <Text style={[styles.text, styles.textDescription]}>Outlay</Text>
              <Text numberOfLines={1} style={[styles.text, styles.textAmount, styles.amountFontSize]}>
                {formatCurrency(expensesAmount)}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Transaction", { defaultTransaction: "To Receive" })}
        >
          <View style={[styles.card, styles.cardShadow, { backgroundColor: "#CFF4CF" }]}>
            <Icon svg={ReceivDollar} fill="#171717" height={37} width={37} style={styles.cardIcon} />
            <View style={styles.cardTextContainer}>
              <Text style={[styles.text, styles.textDescription]}>Receivable Amount</Text>
              <Text numberOfLines={1} style={[styles.text, styles.textAmount, styles.amountFontSize]}>
                {formatCurrency(receiveAmount)}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Transaction", { defaultTransaction: "Debt" })}
        >
          <View style={[styles.card, styles.cardShadow, { backgroundColor: "#F3DACC" }]}>
            <Icon svg={Donate} fill="#171717" height={37} width={37} style={styles.cardIcon} />
            <View style={styles.cardTextContainer}>
              <Text style={[styles.text, styles.textDescription]}>Liability</Text>
              <Text numberOfLines={1} style={[styles.text, styles.textAmount, styles.amountFontSize]}>
                {formatCurrency(debtsAmount)}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>

      {recentTransactions.length > 0 && (
        <View style={styles.sectionContainer}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate("RecentTransactions")}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Financial Movements</Text>
              <Icon svg={UpRight} fill="#050505" height={16} width={16} />
            </View>
          </TouchableWithoutFeedback>
          <View>
            <ChronicleRecentTransactions limit={5} />
          </View>
        </View>
      )}

      {receivablesAndPayables.length > 0 && (
        <View style={styles.sectionContainer}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate("ReceiveAndDebts")}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Outstanding Receivables and Payables</Text>
              <Icon svg={UpRight} fill="#050505" height={16} width={16} />
            </View>
          </TouchableWithoutFeedback>
          <View>
            <CatalogueReceivablesAndPayables limit={5} />
          </View>
        </View>
      )}

      {impendingIncomes.length > 0 && (
        <View style={styles.sectionContainer}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate("ReceiveSoon")}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Impending Incomes</Text>
              <Icon svg={UpRight} fill="#050505" height={16} width={16} />
            </View>
          </TouchableWithoutFeedback>
          <View>
            <ProjectImpendingIncomes limit={5} />
          </View>
        </View>
      )}

      {imminentOutlays.length > 0 && (
        <View style={styles.sectionContainer}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate("PaySoon")}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Expenditures</Text>
              <Icon svg={UpRight} fill="#050505" height={16} width={16} />
            </View>
          </TouchableWithoutFeedback>
          <View>
            <ForecastImminentOutlays limit={5} />
          </View>
        </View>
      )}

      {unsettledOutgoings.length > 0 && (
        <View style={styles.sectionContainer}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate("NotPaid")}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Unsettled Outgoings</Text>
              <Icon svg={UpRight} fill="#050505" height={16} width={16} />
            </View>
          </TouchableWithoutFeedback>
          <View>
            <EnumerateUnsettledOutgoings limit={5} />
          </View>
        </View>
      )}

      {outstandingIncomings.length > 0 && (
        <View style={styles.sectionContainer}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate("NotReceived")}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Outstanding Incomings</Text>
              <Icon svg={UpRight} fill="#050505" height={16} width={16} />
            </View>
          </TouchableWithoutFeedback>
          <View>
            <TabulateOutstandingIncomings limit={5} />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  statusContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    justifyContent: "center",
  },
  greetingsContainer: {
    height: 48,
    marginVertical: 30, // Adjusted margin
    marginHorizontal: 20,
    justifyContent: "center",
  },
  greetingsText: {
    fontFamily: "Poppins-Medium",
    fontSize: 24,
    textAlignVertical: "center",
    color: "#050505",
  },
  sectionContainer: {
    marginVertical: 30, // Adjusted margin
    marginHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    alignItems: "center", // Align items vertically in the header
  },
  sectionTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#050505",
  },
  walletCard: {
    padding: 20,
    borderRadius: 8,
    marginBottom: 14,
  },
  card: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 14,
  },
  cardIcon: {
    marginRight: 20,
  },
  cardTextContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  description: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 21,
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    textAlignVertical: "center",
    color: "#171717",
  },
  textAmount: {
    fontFamily: "Poppins-Medium",
    fontSize: 24,
  },
  textDescription: {
    fontSize: 14,
    color: "#161618",
  },
  amountFontSize: {
    fontSize: 20,
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default HomeScreen;
