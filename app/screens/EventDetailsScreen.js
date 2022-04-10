import React, { useState, useEffect } from "react";
import { View, StyleSheet, Platform, FlatList } from "react-native";
import AppText from "../components/AppText";
import colors from "../config/colors";
import ListItem from "../components/ListItem";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "react-native-expo-image-cache";
import { KeyboardAvoidingView } from "react-native";
import ContactOrganiserForm from "../components/ContactOrganiserForm";
import ListItemDeleteAction from "../components/ListItemDeleteAction";

import ListItemSeperator from "../components/ListItemSeperator";
import useApi from "../Hooks/useApi";
import membersApi from "../api/members";
import AppButton from "../components/AppButton";

import authStorage from "../auth/storage";

function EventDetailsScreen({ route }) {
  const event = route.params;
  const getMembersApi = useApi(membersApi.getMembers);
  const attendanceApi = useApi(membersApi.updateAttendance);

  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getMembersApi.request(event.id);
  }, []);

  const checkAttendance = () => {
    const members = getMembersApi.data;
    for (var i = 0; i < members.length; i++) {
      if (members[i].id === user.userId) {
        return "Count me out";
      }
    }
    return "Count me in";
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
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
            <AppButton
              title={checkAttendance()}
              onPress={() => {
                attendanceApi.request(event.id);
                getMembersApi.request(event.id);
              }}
            />
            <View style={styles.membersBreak}>
              <AppText style={styles.membersTag}>Participants</AppText>
            </View>
            <View style={styles.membersContainer}>
              <FlatList
                data={getMembersApi.data}
                keyExtractor={(member) => member.id}
                renderItem={({ item }) => (
                  <ListItem
                    title={item.name}
                    subTitle={item.email}
                    image={require("../assets/profile.jpg")}
                    onPress={() => console.log("Member selected", item)}
                    renderRightActions={() => (
                      <ListItemDeleteAction
                        onPress={() => handleDelete(item)}
                      />
                    )}
                  />
                )}
                ItemSeparatorComponent={ListItemSeperator}
                refreshing={refreshing}
                onRefresh={() => {
                  getMembersApi.request(event.id);
                }}
                style={styles.container}
              />
            </View>
            <View style={styles.contact}>
              <ContactOrganiserForm event={event} />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    paddingTop: 20,
    width: "100%",
    height: "100%",
    backgroundColor: colors.screenBackground,
  },
  membersContainer: {
    flex: 1,
    width: "100%",
    borderRadius: 15,
    overflow: "hidden",
  },
  contact: {
    paddingTop: 20,
    width: "100%",
  },
  membersBreak: {
    alignItems: "center",
    width: "100%",
    marginTop: 20,
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
  },
});

export default EventDetailsScreen;
