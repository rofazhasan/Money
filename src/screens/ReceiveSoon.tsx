import React, { JSX } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "../types/Navigator";
import { TransactionsContext } from "../providers/Transactions";

type Props = StackScreenProps<StackParamList, "ReceiveSoon">;

const ImpendingIncomesScreen: React.FC<Props> = ({ navigation }) => {
  const { ProjectImpendingIncomes } = React.useContext(TransactionsContext);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.transactionsContainer}>
        <ProjectImpendingIncomes />
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
    marginVertical: 35, // Gracefully adjusted vertical margin
    marginHorizontal: 18, // Gracefully adjusted horizontal margin
  },
});

export default ImpendingIncomesScreen;
