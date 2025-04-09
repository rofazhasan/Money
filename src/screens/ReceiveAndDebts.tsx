import React, { JSX } from "react";

import {
  StyleSheet,
  View,
  ScrollView,
} from "react-native";

import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "../types/Navigator";

import { TransactionsContext } from "../providers/Transactions";

type Props = StackScreenProps<StackParamList, "ReceiveAndDebts">; // Corrected here

export default function ReceiveAndDebtsScreen({ navigation }: Props): JSX.Element {
  const { ReceiveAndDebts } = React.useContext(TransactionsContext);

  return(
    <ScrollView style={[ styles.container ]}>
      <View style={[ styles.transactionsContainer ]}>
        <ReceiveAndDebts />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#ffffff",
  },

  transactionsContainer: {
    justifyContent: "center",

    marginVertical: 45,
    marginHorizontal: 20,
  }
});