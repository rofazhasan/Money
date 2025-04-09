import React, { JSX } from "react";
import {
  StatusBar
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { ProfileProvider } from "./providers/Profile";
import { TransactionsProvider } from "./providers/Transactions";
import { StackParamList } from "./types/Navigator";

// Import screen components with their more descriptive and impressive names
import DashboardScreen from "./screens/Home";
import UserProfileSettingsScreen from "./screens/Profile";
import ApplicationInformationScreen from "./screens/About";
import GratitudeInitiationScreen from "./screens/Donate";
import LedgerManagementScreen from "./screens/Wallet";
import TransactionRecordScreen from "./screens/Transaction";
import RecentFinancialChronicleScreen from "./screens/RecentTransactions";
import OutstandingBalancesOverviewScreen from "./screens/ReceiveAndDebts";
import AnticipatedInflowsScreen from "./screens/ReceiveSoon";
import UpcomingExpendituresScreen from "./screens/PaySoon";
import UnsettledObligationsScreen from "./screens/NotPaid";
import PendingIncomingsScreen from "./screens/NotReceived";

const Stack = createStackNavigator<StackParamList>();

const App: React.FC = (): JSX.Element => {
  const [fontsLoaded] = useFonts({
    "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <TransactionsProvider>
        <ProfileProvider>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="#ffffff"
          />
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={DashboardScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Profile"
              component={UserProfileSettingsScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="About"
              component={ApplicationInformationScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Donate"
              component={GratitudeInitiationScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Wallet"
              component={LedgerManagementScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Transaction"
              component={TransactionRecordScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="RecentTransactions"
              component={RecentFinancialChronicleScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ReceiveAndDebts"
              component={OutstandingBalancesOverviewScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ReceiveSoon"
              component={AnticipatedInflowsScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="PaySoon"
              component={UpcomingExpendituresScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="NotPaid"
              component={UnsettledObligationsScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="NotReceived"
              component={PendingIncomingsScreen}
            />
          </Stack.Navigator>
        </ProfileProvider>
      </TransactionsProvider>
    </NavigationContainer>
  );
};

export default App;
