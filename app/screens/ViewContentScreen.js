import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import colors from "../config/colors";

function ViewContentScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.backButton}>
        <FontAwesome name="close" color={colors.textDark} size={27} />
      </View>
      <View style={styles.seenButton}>
        <Ionicons name="eye" color={colors.textDark} size={30} />
      </View>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={require("../assets/poster.jpg")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  container: {
    backgroundColor: colors.screenBackground,
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 40,
  },
  seenButton: {
    position: "absolute",
    top: 40,
    right: 40,
  },
});

export default ViewContentScreen;
