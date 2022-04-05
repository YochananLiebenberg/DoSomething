import React from "react";
import LottieView from "lottie-react-native";
import AnimatedLottieView from "lottie-react-native";

function ActivityIndicator({ visible = false }) {
  if (!visible) {
    return null;
  }

  return (
    <AnimatedLottieView
      source={require("../assets/animations/waiting.json")}
      autoplay={true}
      loop={true}
    />
  );
}

export default ActivityIndicator;
