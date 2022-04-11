import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

import colors from "../config/colors";
import AppText from "./AppText";
import { Image } from "react-native-expo-image-cache";

function Card({ title, subTitle, imageUrl, onPress, thumbnailUrl }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          preview={{ uri: thumbnailUrl }}
          uri={imageUrl}
          tint="light"
        />
        <View style={styles.descriptionContainer}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.subTitle}>{subTitle}</AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.screenCards,
    width: "100%",
    overflow: "hidden",
    marginBottom: 20,
    flexDirection: "row",
  },
  image: {
    width: "35%",
    height: undefined,
    aspectRatio: 139 / 206,
  },
  descriptionContainer: {
    padding: 20,
  },
  title: {
    marginBottom: 10,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
});

export default Card;
