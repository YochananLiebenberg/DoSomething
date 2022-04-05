import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../components/AppText";
import colors from "../config/colors";
import ListItem from "../components/ListItem";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "react-native-expo-image-cache";

function EventDetailsScreen({ route }) {
  const event = route.params;
  return (
    <ScrollView bounces={false}>
      <View style={styles.container}>
        <View style={styles.imageFrame}>
          <Image
            uri={event.images[0].url}
            style={styles.image}
            preview={{ uri: event.images[0].thumbnailUrl }}
            tint="light"
          />
        </View>

        <View style={styles.descriptionContainer}>
          <AppText styles={styles.title}>{event.title}</AppText>
          <AppText styles={styles.time}>{event.time}</AppText>
          <View style={styles.membersBreak}>
            <AppText style={styles.membersTag}>Participants</AppText>
          </View>
          <View style={styles.membersContainer}>
            <ListItem
              image={require("../assets/yoch.jpg")}
              title="Yochanan"
              subTitle="Ornagiser"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "70%",
    height: 500,
  },
  descriptionContainer: {
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    marginVertical: 10,
  },
  time: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
  },
  container: {
    alignItems: "center",
    paddingTop: 55,
    width: "100%",
    height: "100%",
    backgroundColor: colors.screenBackground,
  },
  membersContainer: {
    flex: 1,
    width: "100%",
    marginVertical: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
  membersTag: {},
  membersBreak: {
    alignItems: "center",
    width: "100%",
    marginTop: 30,
    backgroundColor: colors.beigeBreak,
    borderRadius: 10,
  },
  imageFrame: {
    alignItems: "center",
    width: "100%",
    height: 500,
    shadowColor: "#470000",
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 0.2,
    elevation: 1,
  },
});

export default EventDetailsScreen;
