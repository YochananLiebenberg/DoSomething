import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ListItem from "../components/ListItem";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import ListItemSeperator from "../components/ListItemSeperator";
import Screen from "../components/Screen";
import colors from "../config/colors";

import useApi from "../Hooks/useApi";
import messagesApi from "../api/messages";

function MessagesScreen(props) {
  // Get the messages from the server using the Api
  const getMessagesApi = useApi(messagesApi.getMessages);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getMessagesApi.request();
  }, []);

  const [messages, setMessages] = useState();
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
