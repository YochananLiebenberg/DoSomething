import React, { useState } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import * as Yup from "yup";

import CategoryPickerItem from "../components/CategoryPickerItem";
import eventsApi from "../api/events";

import {
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../components/forms";
import AppFormImagePicker from "../components/forms/AppFormImagePicker";

import Screen from "../components/Screen";
import colors from "../config/colors";
import useLocation from "../Hooks/useLocation";
import SubmitScreen from "./SubmitScreen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  time: Yup.string().required().min(1).label("Time"),
  location: Yup.string().label("Location"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

const categories = [
  { label: "Movie", value: 1, backgroundColor: colors.primary, icon: "film" },
  {
    label: "Resturant",
    value: 2,
    backgroundColor: colors.secondary,
    icon: "restaurant",
  },
  {
    label: "Custom",
    value: 3,
    backgroundColor: colors.primary,
    icon: "pencil",
  },
];

function CustomEventEditScreen() {
  const location = useLocation();

  const [uploadScreenVisible, setUploadScreenVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (event, { resetForm }) => {
    setProgress(0);
    setUploadScreenVisible(true);
    const result = await eventsApi.addEvent(
      { ...event, location },
      (progress) => setProgress(progress)
    );

    if (!result.ok) {
      setUploadScreenVisible(false);
      alert("Could not submit the Event.");
      return;
    }
    resetForm();
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Create Event</Text>
      </View>
      <Screen style={styles.container}>
        <SubmitScreen
          onDone={() => setUploadScreenVisible(false)}
          progress={progress}
          visible={uploadScreenVisible}
        />
        <AppForm
          initialValues={{
            title: "",
            time: "",
            location: "",
            category: null,
            images: [],
            members: [],
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormImagePicker name="images" />
          <AppFormField maxLength={255} name="title" placeholder="Title" />
          <AppFormField
            name="time"
            maxlength={8}
            placeholder="Time"
            width={120}
          />
          <AppFormPicker
            items={categories}
            numberOfColumns={2}
            name="category"
            placeholder="Category"
            width={"50%"}
            PickerItemComponent={CategoryPickerItem}
          />
          <AppFormField
            maxLength={255}
            multiline
            name="description"
            numberOfLines={3}
            placeholder="Description"
          />
          <SubmitButton title="Create" />
        </AppForm>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    width: "100%",
    backgroundColor: colors.white,
    alignContent: "center",
    justifyContent: "center",
  },
  headerText: {
    alignSelf: "center",
    paddingTop: 60,
    paddingBottom: 8,
    fontWeight: "600",
    fontSize: 20,
    color: colors.primary,
    fontFamily: Platform.OS === "android" ? "normal" : "Copperplate",
  },
});

export default CustomEventEditScreen;
