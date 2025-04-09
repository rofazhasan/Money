import React, { JSX } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "../types/Navigator";
import { TransactionsContext } from "../providers/Transactions";

type Props = StackScreenProps<StackParamList, "RecentTransactions">;

const RecentFinancialMovementsScreen: React.FC<Props> = ({ navigation }) => {
  const { ChronicleRecentTransactions } = React.useContext(TransactionsContext);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.transactionsContainer}>
        <ChronicleRecentTransactions />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  transactionsContainer: {
    justifyContent: "center",
    marginVertical: 35, // Subtly refined vertical margin
    marginHorizontal: 18, // Subtly refined horizontal margin
  },
});

export default RecentFinancialMovementsScreen;
