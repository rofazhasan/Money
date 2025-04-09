import React, { JSX } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import Datepicker from "../components/Datepicker";
import Icon from "../components/Icon";
import Select, { IOption } from "../components/Select";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "../types/Navigator";
import { INewTransaction, TransactionsContext } from "../providers/Transactions";

import MonetaryBag from "../assets/images/svgs/MoneyBag";
import TagLabel from "../assets/images/svgs/TagWindow";
import Quill from "../assets/images/svgs/Pencil";

import TransactionKindOptions from "../settings/TransactionOptions";
import ExpenseCategoryOptions from "../settings/CategoryOptions";

type Props = StackScreenProps<StackParamList, "Transaction">;

const TransactionEntryScreen: React.FC<Props> = ({ route, navigation }) => {
  const { defaultTransaction } = route.params;
  const { registerTransaction } = React.useContext(TransactionsContext);

  const [kind, setKind] = React.useState<string>(defaultTransaction);
  const [category, setCategory] = React.useState<string>("Others");
  const [amount, setAmount] = React.useState<string>("");
  const [subject, setSubject] = React.useState<string>("");
  const [notation, setNotation] = React.useState<string>("");
  const [transactionDate, setTransactionDate] = React.useState<Date>(new Date());

  const handleAmountChange = React.useCallback((text: string) => {
    setAmount(text);
  }, []);

  const handleSubjectChange = React.useCallback((text: string) => {
    setSubject(text);
  }, []);

  const handleNotationChange = React.useCallback((text: string) => {
    setNotation(text);
  }, []);

  const handleDateChange = React.useCallback((date: Date) => {
    setTransactionDate(date);
  }, []);

  const handleKindSelection = React.useCallback((option: IOption) => {
    setKind(option.description);
  }, []);

  const handleCategorySelection = React.useCallback((option: IOption) => {
    setCategory(option.description);
  }, []);

  const submitTransaction = React.useCallback(() => {
    const numericalAmount: number = Number(String(amount).replace(/\D/g, ""));
    const conciseSubject: string = subject.trim() !== "" ? subject : "Untitled";

    const newTransaction: INewTransaction = {
      type: kind,
      title: conciseSubject,
      description: notation,
      amount: numericalAmount,
      category,
      date: transactionDate,
    };

    registerTransaction(newTransaction);
    navigation.navigate("Home");
  }, [kind, subject, notation, amount, category, transactionDate, registerTransaction, navigation]);

  return (
    <>
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <View style={styles.spacingBuffer} />
        <Select
          options={TransactionKindOptions}
          defaultOption={defaultTransaction}
          onSelect={handleKindSelection}
          shouldSort={false}
        />

        <View style={styles.inputCard}>
          <View style={styles.iconWrapper}>
            <Icon svg={MonetaryBag} fill="#050505" height={37} width={37} />
          </View>
          <View style={styles.inputField}>
            <TextInput
              style={styles.inputText}
              placeholder="Amount (e.g., 0.00)"
              placeholderTextColor="#777777"
              keyboardType="number-pad"
              value={amount}
              onChangeText={handleAmountChange}
            />
          </View>
        </View>

        <View style={styles.inputCard}>
          <View style={styles.iconWrapper}>
            <Icon svg={TagLabel} fill="#050505" height={37} width={37} />
          </View>
          <View style={styles.inputField}>
            <TextInput
              style={styles.inputText}
              keyboardType="default"
              placeholder="Subject"
              placeholderTextColor="#777777"
              value={subject}
              onChangeText={handleSubjectChange}
            />
          </View>
        </View>

        <View style={styles.inputCard}>
          <View style={styles.iconWrapper}>
            <Icon svg={Quill} fill="#050505" height={37} width={37} />
          </View>
          <View style={styles.inputField}>
            <TextInput
              style={styles.inputText}
              keyboardType="default"
              placeholder="Description (Optional)"
              placeholderTextColor="#777777"
              value={notation}
              onChangeText={handleNotationChange}
            />
          </View>
        </View>

        <Datepicker onDateChange={handleDateChange} />

        <Select
          options={ExpenseCategoryOptions}
          defaultOption={"Others"}
          onSelect={handleCategorySelection}
          shouldSort={true}
        />
      </ScrollView>

      <View style={styles.actionButtonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={submitTransaction}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Register</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
  },
  spacingBuffer: {
    height: 35,
  },
  iconWrapper: {
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  inputCard: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    backgroundColor: "#f7f7f7", // Light background for input fields
    borderRadius: 6,
    paddingHorizontal: 12,
  },
  inputText: {
    flex: 1,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    textAlignVertical: "center",
    color: "#333333",
  },
  inputField: {
    flex: 1,
    justifyContent: "center",
  },
  actionButtonContainer: {
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    paddingBottom: 20, // Added padding at the bottom
  },
  actionButton: {
    marginTop: 14,
    backgroundColor: "#8FBC8F", // A more inviting color for the action button
    height: 55,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2, // Subtle shadow
  },
  buttonContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 18,
    color: "#ffffff",
  },
});

export default TransactionEntryScreen;
