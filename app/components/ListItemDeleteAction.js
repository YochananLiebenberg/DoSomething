import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import colors from "../config/colors";
import { Ionicons } from "@expo/vector-icons";

function ListItemDeleteAction({ onPress }) {
  return (
    <TouchableHighlight
      style={styles.container}
      underlayColor={colors.dangerPressed}
      onPress={onPress}
    >
      <Ionicons name="trash" size={35} color="white" />
    </TouchableHighlight>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.danger,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListItemDeleteAction;
