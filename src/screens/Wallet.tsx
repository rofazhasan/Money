import React, { JSX } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import Icon from "../components/Icon";
import WalletIcon from "../assets/images/svgs/Wallet";
import BlossomIcon from "../assets/images/svgs/Bloom";
import VerifiedScrollIcon from "../assets/images/svgs/VerifiedScroll";
import { TransactionsContext } from "../providers/Transactions";
import formatCurrency from "../utils/formatCurrency";

const WalletManagementScreen: React.FC = () => {
  const {
    walletAmount,
    persistMonthlySnapshot,
    purgeAllFinancialRecords,
  } = React.useContext(TransactionsContext);

  const [isMonthClosureModalVisible, setIsMonthClosureModalVisible] = React.useState<boolean>(false);
  const [isDataPurgeModalVisible, setIsDataPurgeModalVisible] = React.useState<boolean>(false);

  const handleMonthClosureInitiation = React.useCallback(() => {
    setIsMonthClosureModalVisible(true);
  }, []);

  const handleDataPurgeInitiation = React.useCallback(() => {
    setIsDataPurgeModalVisible(true);
  }, []);

  const handleMonthClosureConfirmation = React.useCallback(() => {
    persistMonthlySnapshot();
    setIsMonthClosureModalVisible(false);
  }, [persistMonthlySnapshot]);

  const handleDataPurgeConfirmation = React.useCallback(() => {
    purgeAllFinancialRecords();
    setIsDataPurgeModalVisible(false);
  }, [purgeAllFinancialRecords]);

  const handleModalDismiss = React.useCallback(() => {
    setIsMonthClosureModalVisible(false);
    setIsDataPurgeModalVisible(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.spacingBuffer} />

      <TouchableWithoutFeedback onPress={handleMonthClosureInitiation}>
        <View style={styles.actionCard}>
          <View style={styles.iconWrapper}>
            <Icon svg={WalletIcon} fill="#050505" height={37} width={37} />
          </View>
          <View style={styles.actionDescription}>
            <Text style={styles.actionText}>Conclude the Month</Text>
            <View style={styles.amountDisplay}>
              <Text numberOfLines={1} style={[styles.actionText, styles.amountText]}>
                {formatCurrency(walletAmount)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={handleDataPurgeInitiation}>
        <View style={styles.actionCard}>
          <View style={styles.iconWrapper}>
            <Icon svg={BlossomIcon} fill="#050505" height={37} width={37} />
          </View>
          <View style={styles.actionDescription}>
            <Text style={styles.actionText}>Eradicate All Data</Text>
            <View style={styles.amountDisplay}>
              <Text numberOfLines={1} style={[styles.actionText, styles.amountText]}>
                {formatCurrency(0)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* Month Closure Modal */}
      <Modal
        animationType="slide"
        visible={isMonthClosureModalVisible}
        onRequestClose={handleModalDismiss}
      >
        <SafeAreaView style={[styles.modalContainer, { justifyContent: "space-between" }]}>
          <Text style={[styles.modalText, styles.modalInstruction]}>
            Initiating this action will archive all financial entries prior to today's date, preserving your current
            wallet balance. Subsequent entries will commence anew.
          </Text>
          <TouchableOpacity onPress={handleMonthClosureConfirmation}>
            <View style={[styles.modalButton, { backgroundColor: "#CFF4CF", marginBottom: 45 }]}>
              <Text style={[styles.modalButtonText]}>Confirm Month Closure</Text>
              <View style={[styles.iconWrapper, styles.buttonIcon]}>
                <Icon svg={VerifiedScrollIcon} fill="#171717" height={37} width={37} />
              </View>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      {/* Data Purge Modal */}
      <Modal
        animationType="slide"
        visible={isDataPurgeModalVisible}
        onRequestClose={handleModalDismiss}
      >
        <SafeAreaView style={[styles.modalContainer, { justifyContent: "space-between" }]}>
          <Text style={[styles.modalText, styles.modalInstruction]}>
            Executing this irreversible operation will expunge all recorded income, expenses, receivables, and debts,
            effectively resetting your financial ledger to its genesis.
          </Text>
          <TouchableOpacity onPress={handleDataPurgeConfirmation}>
            <View style={[styles.modalButton, { backgroundColor: "#E2D5FE", marginBottom: 45 }]}>
              <Text style={[styles.modalButtonText]}>Affirm Data Eradication</Text>
              <View style={[styles.iconWrapper, styles.buttonIcon]}>
                <Icon svg={BlossomIcon} fill="#171717" height={37} width={37} />
              </View>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </View>
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
  actionCard: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#f7f7f7", // Light background for action cards
    borderRadius: 6,
    paddingHorizontal: 12,
  },
  actionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    textAlignVertical: "center",
    color: "#333333",
  },
  amountText: {
    flex: 1,
    textAlign: "right",
    color: "#70B657",
  },
  actionDescription: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  modalText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#333333",
    textAlign: "center",
  },
  modalInstruction: {
    marginBottom: 30,
  },
  modalButton: {
    width: "100%",
    height: 55,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  modalButtonText: {
    flex: 1,
    fontFamily: "Poppins-Medium",
    fontSize: 18,
    color: "#171717",
    textAlign: "center",
  },
  buttonIcon: {
    marginLeft: 16,
    marginRight: 0,
  },
  amountDisplay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});

export default WalletManagementScreen;
