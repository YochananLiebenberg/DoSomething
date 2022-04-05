import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import Card from "../components/Card";
import Screen from "../components/Screen";
import colors from "../config/colors";
import eventsApi from "../api/events";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import ActivityIndicator from "../components/ActivityIndicator";
import useApi from "../Hooks/useApi";
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
  const getEventsApi = useApi(eventsApi.getEvents);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getEventsApi.request();
  }, []);

  return (
    <Screen style={styles.screen}>
      {getEventsApi.error && (
        <>
          <AppText>Events cannot be retrived from the server.</AppText>
          <AppButton title="Retry" onPress={getEventsApi.request} />
        </>
      )}
      <ActivityIndicator visible={getEventsApi.loading} />

      <FlatList
        data={getEventsApi.data}
        keyExtractor={(singleEvent) => singleEvent.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={item.time}
            imageUrl={item.images[0].url}
            onPress={() => navigation.navigate("EventDetails", item)}
            style={styles.card}
            thumbnailUrl={item.images[0].thumbnailUrl}
          />
        )}
        refreshing={refreshing}
        onRefresh={() => {
          getEventsApi.request();
        }}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.screenBackground,
  },
  card: {
    shadowColor: "#470000",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    elevation: 1,
  },
});

export default EventsScreen;
