import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import AppText from "./AppText";
import colors from "../config/colors";

import { MaterialCommunityIcons } from "@expo/vector-icons";

function ListItem({
  title,
  subTitle,
  image,
  description,
  IconComponent,
  onPress,
  renderRightActions,
}) {
  return (
    <Swipeable overshootRight={false} renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.beigeBreak} onPress={onPress}>
        <View style={styles.container}>
          {IconComponent}
          {image && (
            <View style={styles.imageFrame}>
              <Image source={image} style={styles.image} />
            </View>
          )}
          <View style={styles.detailsContainer}>
            <AppText numberOfLines={1} style={styles.title}>
              {title}
            </AppText>
            {subTitle && (
              <AppText style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </AppText>
            )}
            {description && (
              <AppText style={styles.description} numberOfLines={4}>
                {subTitle}
              </AppText>
            )}
          </View>
          <MaterialCommunityIcons
            color={colors.placeholder}
            name="chevron-right"
            size={25}
          />
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: colors.screenCards,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  imageFrame: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.frameBeige,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#470000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    elevation: 1,
  },
  title: {
    color: colors.textDark,
    fontWeight: "500",
  },
  subTitle: {
    color: colors.placeholder,
    fontSize: 12,
  },
  description: {
    color: colors.placeholder,
    fontSize: 12,
  },
});
