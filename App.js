import React, { useState, useEffect } from "react";
import { View, TextInput, Text, Switch, Image, Button } from "react-native";
import AppButton from "./app/components/AppButton";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import AppText from "./app/components/AppText";
import ViewContentScreen from "./app/screens/ViewContentScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import Card from "./app/components/Card";
import EventDetailsScreen from "./app/screens/EventDetailsScreen";
import Screen from "./app/components/Screen";
import Icon from "./app/components/Icon";
import ListItem from "./app/components/ListItem";
import AccountScreen from "./app/screens/AccountScreen";
import EventsScreen from "./app/screens/EventsScreen";
import AppTextInput from "./app/components/AppTextInput";
import AppPicker from "./app/components/AppPicker";
import LoginScreen from "./app/screens/LoginScreen";
import CustomEventEditScreen from "./app/screens/CustomEventEditScreen";
import { AppForm, AppFormPicker } from "./app/components/forms";
import MessagesScreen from "./app/screens/MessagesScreen";
import ImageInput from "./app/components/ImageInput";
import ImageInputList from "./app/components/ImageInputList";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNagivator";

const Tweets = ({ navigation }) => (
  <Screen>
    <Text>Tweets</Text>
    <Button
      title="View tweet"
      onPress={() => navigation.navigate("TweetDetails")}
    />
  </Screen>
);

const TweetDetails = () => (
  <Screen>
    <Text>Tweet details</Text>
  </Screen>
);

const Stack = createStackNavigator();
const StackNavigator = () => (
  <NavigationContainer>
    <AuthNavigator />
  </NavigationContainer>
);

export default function App() {
  console.disableYellowBox = true;
  return (
    <NavigationContainer theme={navigationTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
}
