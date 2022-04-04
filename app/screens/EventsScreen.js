import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import Card from "../components/Card";
import Screen from "../components/Screen";
import colors from "../config/colors";
import eventsApi from "../api/events";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
/*
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
*/

function EventsScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const response = await eventsApi.getEvents();
    if (!response.ok) {
      setError(true);
    }
    setError(false);
    setEvents(response.data);
  };

  return (
    <Screen style={styles.screen}>
      {error && (
        <>
          <AppText>Events cannot be retrived from the server.</AppText>
          <AppButton title="Retry" onPress={loadEvents} />
        </>
      )}
      <FlatList
        data={events}
        keyExtractor={(singleEvent) => singleEvent.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={item.time}
            imageUrl={item.images[0].url}
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
