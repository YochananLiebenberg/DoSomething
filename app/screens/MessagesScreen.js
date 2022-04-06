import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ListItem from "../components/ListItem";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import ListItemSeperator from "../components/ListItemSeperator";
import Screen from "../components/Screen";
import colors from "../config/colors";

import useApi from "../Hooks/useApi";
import messagesApi from "../api/messages";

// Dummy Data
const initialMessages = [
  {
    id: 1,
    title: "Yochanan Liebenberg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: require("../assets/yoch.jpg"),
  },
  {
    id: 2,
    title: "Yochanan Liebenberg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: require("../assets/yoch.jpg"),
  },
];

function MessagesScreen(props) {
  // Get the messages from the server using the Api
  const getMessagesApi = useApi(messagesApi.getMessages);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getMessagesApi.request();
  }, []);

  const [messages, setMessages] = useState(initialMessages);
  const handleDelete = (message) => {
    // Delete the message from messages
    // Call the server (Do later...)
    const newMessages = messages.filter((m) => m.id !== message.id);
    setMessages(newMessages);
  };
  return (
    <Screen>
      <FlatList
        data={getMessagesApi.data}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.fromUser.name}
            subTitle={item.content}
            image={item.image}
            onPress={() => console.log("Message selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeperator}
        refreshing={refreshing}
        onRefresh={() => {
          getMessagesApi.request();
        }}
        style={styles.container}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    height: "100%",
    width: "100%",
    flex: 1,
  },
});

export default MessagesScreen;
