import React from "react";
import { Alert, Keyboard } from "react-native";
import * as Notifications from "expo-notifications";
import * as Yup from "yup";

import { AppForm, AppFormField, SubmitButton } from "./forms";
import messagesApi from "../api/messages";

function ContactOrganiserAppForm({ event }) {
  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();

    let result = await messagesApi.send(message, event.id);

    if (!result.ok) {
      console.log("Error", result);
      return Alert.alert(
        "Error",
        "Could not send the message to the organiser."
      );
    }

    resetForm();

    // First, set the handler that will cause the notification
    // to show the alert

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    // Second, call the method

    Notifications.scheduleNotificationAsync({
      content: {
        title: "Awesome!",
        body: "Your message was sent to the organiser.",
      },
      trigger: null,
    });
  };

  return (
    <AppForm
      initialValues={{ message: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <AppFormField
        maxLength={255}
        multiline
        name="message"
        numberOfLines={3}
        placeholder="Message..."
      />
      <SubmitButton title="Contact Organiser" />
    </AppForm>
  );
}

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label("Message"),
});

export default ContactOrganiserAppForm;
