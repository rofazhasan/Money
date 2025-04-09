import React, { JSX } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "../types/Navigator";
import { TransactionsContext } from "../providers/Transactions";

type Props = StackScreenProps<StackParamList, "NotReceived">;

const OutstandingIncomingsScreen: React.FC<Props> = ({ navigation }) => {
  const { TabulateOutstandingIncomings } = React.useContext(TransactionsContext);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.transactionsContainer}>
        <TabulateOutstandingIncomings />
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
    marginVertical: 35, // Subtly adjusted vertical margin
    marginHorizontal: 18, // Subtly adjusted horizontal margin
  },
});

export default OutstandingIncomingsScreen;
