import React from "react";
import LottieView from "lottie-react-native";
import AnimatedLottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";

function ActivityIndicator({ visible = false }) {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <AnimatedLottieView
        source={require("../assets/animations/waiting.json")}
        autoplay={true}
        loop={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
    opacity: 0.8,
    backgroundColor: colors.screenBackground,
  },
});

export default ActivityIndicator;
