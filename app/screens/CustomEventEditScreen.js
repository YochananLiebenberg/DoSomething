import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import * as Yup from "yup";

import CategoryPickerItem from "../components/CategoryPickerItem";

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

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Create Event</Text>
      </View>
      <Screen style={styles.container}>
        <AppForm
          initialValues={{
            title: "",
            time: "",
            location: "",
            category: null,
            images: [],
          }}
          onSubmit={(values) => console.log(location)}
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
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: "center",
  },
  headerText: {
    alignSelf: "center",
    paddingTop: 60,
    paddingBottom: 10,
    fontWeight: "600",
    fontSize: 20,
    color: colors.primary,
    fontFamily: Platform.OS === "android" ? "normal" : "Copperplate",
  },
});

export default CustomEventEditScreen;
