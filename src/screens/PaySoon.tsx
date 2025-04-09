import React, { JSX } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "../types/Navigator";
import { TransactionsContext } from "../providers/Transactions";

type Props = StackScreenProps<StackParamList, "PaySoon">;

const ImminentOutlaysScreen: React.FC<Props> = ({ navigation }) => {
  const { ForecastImminentOutlays } = React.useContext(TransactionsContext);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.transactionsContainer}>
        <ForecastImminentOutlays />
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
    marginVertical: 35, // Delicately adjusted vertical margin
    marginHorizontal: 18, // Delicately adjusted horizontal margin
  },
});

export default ImminentOutlaysScreen;
