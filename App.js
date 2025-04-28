import "react-native-gesture-handler";
import "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { initDatabase } from "./utilities/data";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import WeekContxtProvider from "./store/WeekContext";

import HomeScreen from "./screens/Home";
import ManageExpenseScreen from "./screens/ManageExpense";
import HistoryScreen from "./screens/HistoryScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#2dbd85" },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Entypo name="home" size={24} color="#fff" />,
          tabBarLabelStyle: {
            color: "#fff",
          },
        }}
      />
      <BottomTab.Screen
        name="ManageExpense"
        component={ManageExpenseScreen}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="manage-history" size={24} color="#fff" />
          ),
          tabBarLabelStyle: {
            color: "#fff",
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitle: "Spendly",
        headerStyle: { backgroundColor: "#2dbd85" },
        headerTintColor: "#fff",
        drawerStyle: { backgroundColor: "#2dbd85" },
        drawerActiveBackgroundColor: "#fff",
        drawerActiveTintColor: "#2dbd85",
        drawerInactiveTintColor: "#fff",
      }}
    >
      <Drawer.Screen
        name="BottomTabs"
        component={BottomTabNavigation}
        options={{ title: "Home" }}
      />
      <Drawer.Screen
        name="History"
        component={HistoryScreen}
        options={{ title: "History" }}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <WeekContxtProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Drawer" component={DrawerNavigation} />
          </Stack.Navigator>
        </NavigationContainer>
      </WeekContxtProvider>
    </>
  );
}
