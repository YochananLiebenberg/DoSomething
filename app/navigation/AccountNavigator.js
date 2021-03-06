import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { TransitionPresets } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import colors from "../config/colors";
import PreferenceScreen from "../screens/PreferenceScreen";
import MyEventsScreen from "../screens/MyEventsScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator
    options={{ headerShown: true }}
    screenOptions={{
      headerShown: true,
      headerTitleStyle: {
        fontFamily: Platform.OS === "android" ? "normal" : "Copperplate",
        fontWeight: "600",
        fontSize: 20,
        color: colors.primary,
      },
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.white,
      },
    }}
  >
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="Preferences" component={PreferenceScreen} />
    <Stack.Screen name="My Events" component={MyEventsScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
