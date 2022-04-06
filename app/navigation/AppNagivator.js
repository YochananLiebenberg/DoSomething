import React, { useEffect, useState, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import expoPushTokensApi from "../api/expoPushTokens";

import AccountScreen from "../screens/AccountScreen";
import CustomEventEditScreen from "../screens/CustomEventEditScreen";
import EventsScreen from "../screens/EventsScreen";
import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigator";
import colors from "../config/colors";
import NewEventButton from "./NewEventButton";
import {
  NavigationHelpersContext,
  StackActions,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Permissions from "expo-permissions";
import navigation from "./rootNavigation";
import * as Notifications from "expo-notifications";

const Tab = createBottomTabNavigator();

const registerForPushNotifications = async () => {
  try {
    const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (!permission.granted) return;

    const token = await Notifications.getExpoPushTokenAsync();
    expoPushTokensApi.register(token);
    console.log(token);
  } catch (error) {
    console.log("Error getting a push token", error);
  }
};

const AppNavigator = () => {
  useEffect(() => {
    registerForPushNotifications();

    const Lisner = Notifications.addNotificationResponseReceivedListener(
      (notification) => {
        console.log("Notification tapped!\n");
        navigation.navigate("Account");
      }
    );
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Events"
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="EventEdit"
        component={CustomEventEditScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewEventButton onPress={() => navigation.navigate("EventEdit")} />
          ),
        })}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
