import React, { JSX } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "../types/Navigator";
import { TransactionsContext } from "../providers/Transactions";

type Props = StackScreenProps<StackParamList, "NotPaid">;

const UnsettledOutgoingsScreen: React.FC<Props> = ({ navigation }) => {
  const { EnumerateUnsettledOutgoings } = React.useContext(TransactionsContext);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.transactionsContainer}>
        <EnumerateUnsettledOutgoings />
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
    marginVertical: 35, // Slightly adjusted vertical margin
    marginHorizontal: 18, // Slightly adjusted horizontal margin
  },
});

export default UnsettledOutgoingsScreen;
