import React from "react";
import { StyleSheet } from "react-native";

import colors from "../../config/colors";
import AppText from "../AppText";

function ErrorMessage({ error }) {
  if (!error) return null;
  return <AppText style={styles.error}>{error}</AppText>;
}

const styles = StyleSheet.create({
  error: {
    color: colors.danger,
    alignSelf: "center",
    fontSize: 15,
  },
});

export default ErrorMessage;
