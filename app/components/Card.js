import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Text } from "react-native";

import colors from "../config/colors";
import AppText from "./AppText";
import { Image } from "react-native-expo-image-cache";

function Card({
  title,
  subTitle,
  imageUrl,
  onPress,
  thumbnailUrl,
  description,
}) {
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
          <View>
            {description && (
              <AppText
                style={styles.descrip}
                ellipsizeMode="tail"
                numberOfLines={4}
              >
                {description}
              </AppText>
            )}
          </View>
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
    height: 168,
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
    flex: 1,
  },
  title: {
    flex: 1,
    flexWrap: "wrap",
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    marginBottom: 10,
  },
  descrip: {
    color: colors.placeholder,
    fontSize: 12,
    flexWrap: "wrap",
    marginBottom: 5,
  },
});

export default Card;
