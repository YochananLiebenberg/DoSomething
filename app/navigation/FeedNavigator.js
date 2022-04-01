import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventsScreen from "../screens/EventsScreen";
import EventDetailsScreen from "../screens/EventDetailsScreen";
import { TransitionPresets } from "@react-navigation/stack";
import { Platform } from "react-native";
import colors from "../config/colors";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator
    mode="modal"
    screenOptions={{
      headerShown: true,
      headerTitleStyle: {
        fontFamily: Platform.OS === "android" ? "normal" : "Copperplate",
        fontWeight: "600",
        fontSize: 20,
        color: colors.primary,
      },
    }}
  >
    <Stack.Screen name="Events" component={EventsScreen} />
    <Stack.Screen
      name="EventDetails"
      component={EventDetailsScreen}
      options={{
        title: "Event Details",
        ...TransitionPresets.ModalTransition,
      }}
    />
  </Stack.Navigator>
);

export default FeedNavigator;
