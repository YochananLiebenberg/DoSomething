import React, { useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";
import useAuth from "../auth/useAuth";
import Icon from "../components/Icon";

import ListItem from "../components/ListItem";
import ListItemSeperator from "../components/ListItemSeperator";
import Screen from "../components/Screen";
import colors from "../config/colors";

const menueItems = [
  {
    title: "My Events",
    icon: {
      name: "albums",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "My Messages",
    icon: {
      name: "chatbox",
      backgroundColor: colors.secondary,
    },
    targetScreen: "Messages",
  },
  {
    title: "My Preferences",
    icon: {
      name: "heart",
      backgroundColor: colors.primary,
    },
  },
];

function AccountScreen({ navigation }) {
  const { user, logout } = useAuth();

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
          image={require("../assets/yoch.jpg")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menueItems}
          keyExtractor={(menueItem) => menueItem.title}
          ItemSeparatorComponent={ListItemSeperator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>

      <ListItem
        title="Logout"
        IconComponent={<Icon name="exit" backgroundColor={colors.secondary} />}
        onPress={() => logout()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  screen: {
    backgroundColor: colors.screenBackground,
  },
});

export default AccountScreen;
