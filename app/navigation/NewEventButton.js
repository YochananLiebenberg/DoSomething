import React from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

function NewEventButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Ionicons name="add" color={colors.white} size={35} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    height: 80,
    width: 80,
    borderRadius: 40,
    bottom: 20,
    borderWidth: 7,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.white,
  },
});

export default NewEventButton;
