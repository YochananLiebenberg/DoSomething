import React, { useContext, useState } from "react";
import { StyleSheet, Image, Platform } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";
import authApi from "../api/auth";
import jwtDecode from "jwt-decode";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

function LoginScreen(props) {
  const { login } = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);

    if (!result.ok) {
      return setLoginFailed(true);
    }
    setLoginFailed(false);
    login(result.data);
  };

  return (
    <Screen style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />

      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <>
          <ErrorMessage
            error="Invalid email and/or password."
            visible={loginFailed}
          />
          <AppFormField
            name="email"
            placeholder="Email"
            icon="email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
            style={{
              fontFamily: Platform.OS === "android" ? "normal" : "Helvetica",
            }}
          />
          <AppFormField
            name="password"
            placeholder="Password"
            icon="lock"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            secureTextEntry={true}
            style={{
              fontFamily: Platform.OS === "android" ? "normal" : "Helvetica",
            }}
          />
          <SubmitButton title="Login" />
        </>
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 160,
    height: 160,
    alignSelf: "center",
    marginTop: 10,
    shadowColor: "#470000",
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 0.2,
  },
});

export default LoginScreen;
