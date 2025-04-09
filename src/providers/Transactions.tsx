import React, { JSX } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { nanoid } from "nanoid/non-secure";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "../components/Icon";
import getCategoryIcon from "../utils/getCategoryIcon";
import getNumberOfDays from "../utils/getNumberOfDays";
import formatCurrency from "../utils/formatCurrency";
import formatDate from "../utils/formatDate";
import VerifiedScroll from "../assets/images/svgs/VerifiedScroll";
import Remove from "../assets/images/svgs/Remove";

export interface ITransaction {
  id: string;
  type: string;
  date: Date;
  title: string;
  description: string;
  amount: number;
  category: string;
  createdAt: Date;
}

export interface INewTransaction {
  type: string;
  date: Date;
  title: string;
  description: string;
  amount: number;
  category: string;
}

interface ITransactionsCard {
  limit?: number | undefined;
}

interface TransactionsContextData {
  expenses: ITransaction[];
  incomes: ITransaction[];
  recentTransactions: ITransaction[];
  receivablesAndPayables: ITransaction[];
  impendingIncomes: ITransaction[];
  imminentOutlays: ITransaction[];
  unsettledOutgoings: ITransaction[];
  outstandingIncomings: ITransaction[];
  walletBalance: number;
  walletSavings: number;
  elucidateTopExpenses: () => JSX.Element;
  chronicleRecentTransactions: ({ limit }: ITransactionsCard) => JSX.Element;
  catalogueReceivablesAndPayables: ({ limit }: ITransactionsCard) => JSX.Element;
  projectImpendingIncomes: ({ limit }: ITransactionsCard) => JSX.Element;
  forecastImminentOutlays: ({ limit }: ITransactionsCard) => JSX.Element;
  enumerateUnsettledOutgoings: ({ limit }: ITransactionsCard) => JSX.Element;
  tabulateOutstandingIncomings: ({ limit }: ITransactionsCard) => JSX.Element;
  recordTransaction: (data: INewTransaction) => void;
  exciseTransaction: ({ id, type }: ITransaction) => void;
  consummateTransaction: ({ id, type }: ITransaction) => void;
  enshrineWalletSavings: () => Promise<void>;
  obliterateAllData: () => Promise<void>;
  totalIncomes: number;
  totalExpenses: number;
  totalReceivables: number;
  totalPayables: number;
}

interface TransactionsProviderProps {
  children: React.ReactNode;
}

interface TransactionCardProps {
  transaction: ITransaction;
}

export const TransactionsContext = React.createContext({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps): JSX.Element {
  const [totalIncomes, setTotalIncomes] = React.useState<number>(0);
  const [totalReceivables, setTotalReceivables] = React.useState<number>(0);
  const [totalExpenses, setTotalExpenses] = React.useState<number>(0);
  const [totalPayables, setTotalPayables] = React.useState<number>(0);
  const [walletBalance, setWalletBalance] = React.useState<number>(0);
  const [walletSavings, setWalletSavings] = React.useState<number>(0);
  const [recentTransactions, setRecentTransactions] = React.useState<ITransaction[]>([]);
  const [receivablesAndPayables, setReceivablesAndPayables] = React.useState<ITransaction[]>([]);
  const [impendingIncomes, setImpendingIncomes] = React.useState<ITransaction[]>([]);
  const [imminentOutlays, setImminentOutlays] = React.useState<ITransaction[]>([]);
  const [unsettledOutgoings, setUnsettledOutgoings] = React.useState<ITransaction[]>([]);
  const [outstandingIncomings, setOutstandingIncomings] = React.useState<ITransaction[]>([]);
  const [expenses, setExpenses] = React.useState<ITransaction[]>([]);
  const [incomes, setIncomes] = React.useState<ITransaction[]>([]);
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [isLoadingInfo, setIsLoadingInfo] = React.useState<boolean>(false);

  const TransactionCard = React.memo(({ transaction }: TransactionCardProps): JSX.Element => {
    const [modalVisible, setModalVisible] = React.useState<boolean>(false);
    const {
      exciseTransaction,
      consummateTransaction,
    } = React.useContext(TransactionsContext);
    const {
      id,
      category,
      title,
      amount,
      type,
      createdAt,
      date,
      description,
    } = transaction;

    let cardColor: string;
    switch (type) {
      case "Entrada":
        cardColor = "#F6EEE0";
        break;
      case "A receber":
        cardColor = "#D9FAD9";
        break;
      case "Saída":
        cardColor = "#E8E3F3";
        break;
      case "Dívida":
        cardColor = "#FAE2D4";
        break;
      default:
        cardColor = "#F6EEE0";
        break;
    }

    return (
      <>
        <TouchableWithoutFeedback
          onPress={() => setModalVisible(true)}
        >
          <View style={[styles.container, { backgroundColor: `${cardColor}`, }]}>
            <View style={[styles.imageContainer]}>
              <Icon
                svg={getCategoryIcon(category)}
                fill="#050505"
                width="37px"
                height="37px"
              />
            </View>
            <View style={[styles.titleContainer]}>
              <Text style={[styles.text]} numberOfLines={1}>{title || "Untitled"}</Text>
            </View>
            <View style={[styles.amountContainer]}>
              <Text style={[styles.text]} numberOfLines={1}>{formatCurrency(amount)}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <ScrollView
            keyboardShouldPersistTaps="always"
            contentContainerStyle={[
              {
                marginVertical: 10,
                marginHorizontal: 20,
                justifyContent: "center",
              }
            ]}
          >
            <View style={[styles.cardModal, { marginBottom: 30 }]}>
              <View style={[styles.imageContainerModal, { marginLeft: 0, paddingHorizontal: 0 }]}>
                <Icon
                  svg={getCategoryIcon(category)}
                  fill="#050505"
                  width="37px"
                  height="37px"
                />
              </View>
              <View style={[styles.titleContainerModal]}>
                <Text
                  style={[
                    styles.text,
                    {
                      color: "#444444",
                    }
                  ]}
                  numberOfLines={1}
                >
                  {category}
                </Text>
              </View>
            </View>
            <Text
              style={[
                styles.text,
                {
                  color: `${type === "Entrada" || type === "A receber" ? "#70B657" : "#D17777"}`,
                  marginBottom: 20,
                }
              ]}
              numberOfLines={1}
            >
              {formatCurrency(amount)}
            </Text>
            <Text style={[styles.text, { fontFamily: "Poppins-Medium" }]} numberOfLines={1}>{title || "Untitled"}</Text>
            <Text
              style={[
                styles.text,
                {
                  color: "#444444",
                  marginBottom: 45,
                  marginTop: 15,
                }
              ]}
              numberOfLines={1}
            >
              {formatDate(new Date(date))}
            </Text>
            <Text style={[styles.text]}>{description}</Text>
          </ScrollView>
          <View
            style={[
              {
                flexDirection: "row",
                paddingHorizontal: 20,
                backgroundColor: "#ffffff"
              }
            ]}
          >
            {(type === "A receber" || type === "Dívida") && (
              <TouchableOpacity
                onPress={() => {
                  consummateTransaction(transaction);
                  setModalVisible(false);
                }}
              >
                <View style={[
                  styles.cardButton,
                  styles.button,
                ]}>
                  <Icon
                    fill="#050505"
                    height="37px"
                    width="37px"
                    svg={VerifiedScroll}
                  />
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                exciseTransaction(transaction);
                setModalVisible(false);
              }}
            >
              <View style={[
                styles.cardButton,
                styles.button,
              ]}>
                <Icon
                  fill="#050505"
                  height="37px"
                  width="37px"
                  svg={Remove}
                />
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </>
    );
  }, (prevProps, nextProps) => prevProps.transaction.id === nextProps.transaction.id);

  const exciseTransaction = React.useCallback(({ id, type }: ITransaction): void => {
    if (type === "Entrada" || type === "A receber") {
      setIncomes(prev => prev.filter(item => item.id !== id));
    } else if (type === "Saída" || type === "Dívida") {
      setExpenses(prev => prev.filter(item => item.id !== id));
    }
  }, [setIncomes, setExpenses]);

  const consummateTransaction = React.useCallback(({ id, type }: ITransaction): void => {
    if (type === "A receber") {
      const transactionDetails: ITransaction = incomes.find(transaction => transaction.id === id)!;
      const newId: string = nanoid();
      const newTransaction: ITransaction = {
        ...transactionDetails,
        type: "Entrada",
        id: newId,
        createdAt: new Date(Date.now())
      };
      setIncomes([ ...incomes, newTransaction ]);
      setIncomes(prev => prev.filter(item => item.id !== transactionDetails.id));
    } else if (type === "Dívida") {
      const transactionDetails: ITransaction = expenses.find(transaction => transaction.id === id)!;
      const newId: string = nanoid();
      const newTransaction: ITransaction = {
        ...transactionDetails,
        type: "Saída",
        id: newId,
        createdAt: new Date(Date.now())
      };
      setExpenses([ ...expenses, newTransaction ]);
      setExpenses(prev => prev.filter(item => item.id !== transactionDetails.id));
    }
  }, [incomes, expenses, setIncomes, setExpenses]);

  const elucidateTopExpenses = React.useCallback((): JSX.Element => {
    const sortedExpenses = [...expenses].sort((a, b) => b.amount - a.amount);
    const topCategories: ITransaction["category"][] = [];
    for (const expense of sortedExpenses) {
      if (topCategories.length === 3) break;
      if (!topCategories.includes(expense.category)) {
        topCategories.push(expense.category);
      }
    }
    return (
      <>
        {topCategories.length > 0 ? (
          topCategories.map((category, index) => (
            <View key={index} style={styles.cardRow}>
              <View style={styles.imageIcon}>
                <Icon
                  svg={getCategoryIcon(category)}
                  fill="#050505"
                  height="37px"
                  width="37px"
                />
              </View>
              <Text style={styles.text}>{category}</Text>
            </View>
          ))
        ) : (
          <View style={styles.noExpensesContainer}>
            <Text style={[styles.text, { fontSize: 16 }]}>No expenditures recorded.</Text>
          </View>
        )}
      </>
    );
  }, [expenses]);

  const chronicleRecentTransactions = React.useCallback(({ limit }: ITransactionsCard): JSX.Element => {
    const transactions = limit ? recentTransactions.slice(0, limit) : recentTransactions;
    return (
      <View>
        {transactions.map(transaction => <TransactionCard key={transaction.id} transaction={transaction} />)}
      </View>
    );
  }, [recentTransactions, TransactionCard]);

  const catalogueReceivablesAndPayables = React.useCallback(({ limit }: ITransactionsCard): JSX.Element => {
    const transactions = limit ? receivablesAndPayables.slice(0, limit) : receivablesAndPayables;
    return (
      <View>
        {transactions.map(transaction => <TransactionCard key={transaction.id} transaction={transaction} />)}
      </View>
    );
  }, [receivablesAndPayables, TransactionCard]);

  const projectImpendingIncomes = React.useCallback(({ limit }: ITransactionsCard): JSX.Element => {
    const transactions = limit ? impendingIncomes.slice(0, limit) : impendingIncomes;
    return (
      <View>
        {transactions.map(transaction => <TransactionCard key={transaction.id} transaction={transaction} />)}
      </View>
    );
  }, [impendingIncomes, TransactionCard]);

  const forecastImminentOutlays = React.useCallback(({ limit }: ITransactionsCard): JSX.Element => {
    const transactions = limit ? imminentOutlays.slice(0, limit) : imminentOutlays;
    return (
      <View>
        {transactions.map(transaction => <TransactionCard key={transaction.id} transaction={transaction} />)}
      </View>
    );
  }, [imminentOutlays, TransactionCard]);

  const enumerateUnsettledOutgoings = React.useCallback(({ limit }: ITransactionsCard): JSX.Element => {
    const transactions = limit ? unsettledOutgoings.slice(0, limit) : unsettledOutgoings;
    return (
      <View>
        {transactions.map(transaction => <TransactionCard key={transaction.id} transaction={transaction} />)}
      </View>
    );
  }, [unsettledOutgoings, TransactionCard]);

  const tabulateOutstandingIncomings = React.useCallback(({ limit }: ITransactionsCard): JSX.Element => {
    const transactions = limit ? outstandingIncomings.slice(0, limit) : outstandingIncomings;
    return (
      <View>
        {transactions.map(transaction => <TransactionCard key={transaction.id} transaction={transaction} />)}
      </View>
    );
  }, [outstandingIncomings, TransactionCard]);

  const recordTransaction = React.useCallback(async (data: INewTransaction): Promise<void> => {
    const id: string = nanoid();
    const newTransaction: ITransaction = { ...data, id, createdAt: new Date(Date.now()) };
    switch (newTransaction.type) {
      case "Entrada":
      case "A receber":
        setIncomes(prev => [...prev, newTransaction]);
        break;
      case "Saída":
      case "Dívida":
        setExpenses(prev => [...prev, newTransaction]);
        break;
    }
    setRecentTransactions(prev => [newTransaction, ...prev]);
  }, [setIncomes, setExpenses, setRecentTransactions]);

  const renderStoredSavings = React.useCallback(async (): Promise<void> => {
    try {
      const storedSavings = await AsyncStorage.getItem("@savings");
      if (storedSavings) {
        setWalletSavings(Number(JSON.parse(storedSavings)));
      }
    } catch (error) {
      console.error("Error retrieving stored savings:", error);
    }
  }, [setWalletSavings]);

  const renderStoredIncomes = React.useCallback(async (): Promise<void> => {
    try {
      const storedIncomes = await AsyncStorage.getItem("@incomes");
      if (storedIncomes) {
        setIncomes(JSON.parse(storedIncomes));
      }
    } catch (error) {
      console.error("Error retrieving stored incomes:", error);
    }
  }, [setIncomes]);

  const renderStoredExpenses = React.useCallback(async (): Promise<void> => {
    try {
      const storedExpenses = await AsyncStorage.getItem("@expenses");
      if (storedExpenses) {
        setExpenses(JSON.parse(storedExpenses));
      }
    } catch (error) {
      console.error("Error retrieving stored expenses:", error);
    }
  }, [setExpenses]);

  const enshrineWalletSavings = React.useCallback(async (): Promise<void> => {
    try {
      await AsyncStorage.setItem("@
