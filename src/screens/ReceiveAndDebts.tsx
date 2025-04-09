import React, { JSX } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "../types/Navigator";
import { TransactionsContext } from "../providers/Transactions";

type Props = StackScreenProps<StackParamList, "ReceiveAndDebts">;

const OutstandingBalancesScreen: React.FC<Props> = ({ navigation }) => {
  const { CatalogueReceivablesAndPayables } = React.useContext(TransactionsContext);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.transactionsContainer}>
        <CatalogueReceivablesAndPayables />
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
    marginVertical: 35, // Elegantly adjusted vertical margin
    marginHorizontal: 18, // Elegantly adjusted horizontal margin
  },
});

export default OutstandingBalancesScreen;
