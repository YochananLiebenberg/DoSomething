import React from "react";
import { FlatList, StyleSheet } from "react-native";
import Card from "../components/Card";
import Screen from "../components/Screen";
import colors from "../config/colors";

const events = [
  {
    id: 1,
    title: "Movie Event 1",
    time: "20:00",
    image: require("../assets/poster.jpg"),
  },
  {
    id: 2,
    title: "Movie Event 2",
    time: "7:00",
    image: require("../assets/poster.jpg"),
  },
];

function EventsScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <FlatList
        data={events}
        keyExtractor={(singleEvent) => singleEvent.id.toStrin}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={item.time}
            image={item.image}
            onPress={() => navigation.navigate("EventDetails", item)}
          />
        )}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.screenBackground,
  },
});

export default EventsScreen;
