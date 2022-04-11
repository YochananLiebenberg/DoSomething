import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import ListItem from "../components/ListItem";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import ListItemSeperator from "../components/ListItemSeperator";
import Screen from "../components/Screen";
import colors from "../config/colors";

import useApi from "../Hooks/useApi";
import eventsApi from "../api/events";

function MyEventsScreen(props) {
  // Get the events from the server using the Api
  const getEventsApi = useApi(eventsApi.getEvents);
  const deleteEventApi = useApi(eventsApi.deleteEvent);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getEventsApi.request();
  }, []);

  const deleteEvent = async (eventObject) => {
    const response = await deleteEventApi.request(eventObject);
    getEventsApi.request();
  };

  return (
    <Screen>
      <FlatList
        data={getEventsApi.data}
        keyExtractor={(singleEvent) => singleEvent.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.time}
            onPress={() => console.log("Event selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => deleteEvent(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeperator}
        refreshing={refreshing}
        onRefresh={() => {
          getEventsApi.request();
        }}
        style={styles.container}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    height: "100%",
    width: "100%",
    flex: 1,
  },
  break: {
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    backgroundColor: colors.beigeBreak,
    borderRadius: 10,
  },
  searchBox: {
    width: "100%",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  poster: {
    alignSelf: "center",
    width: "30%",
    height: undefined,
    aspectRatio: 139 / 206,
    paddingTop: 20,
  },
  frame: {
    shadowColor: "#470000",
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 0.2,
  },
});

export default MyEventsScreen;
