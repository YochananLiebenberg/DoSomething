import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ListItem from "../components/ListItem";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import ListItemSeperator from "../components/ListItemSeperator";
import Screen from "../components/Screen";
import colors from "../config/colors";

import AppText from "../components/AppText";
import useApi from "../Hooks/useApi";
import moviesApi from "../api/movies";
import flaskApi from "../api/flaskApi";
import * as Yup from "yup";

import {
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../components/forms";
import { ErrorMessage } from "../components/forms";

const validationSchema = Yup.object().shape({
  Title: Yup.string().required().min(2).label("Title"),
});

function PreferenceScreen(props) {
  // Get the movies from the server using the Api
  const getMoviesApi = useApi(moviesApi.getMovies);
  const getMovieApi = useApi(moviesApi.getMovie);
  const updateLikingApi = useApi(moviesApi.updateLiking);

  // Get string from the Flask Api
  const getRecomendationsApi = useApi(flaskApi.getRecomendations);

  const [refreshing, setRefreshing] = useState(false);
  const [searchFailed, setSearchFailed] = useState(false);
  const [movie, setMovie] = useState();
  const [recomendations, setRecomendations] = useState(getRecomendations);

  useEffect(() => {
    getMoviesApi.request();
    getRecomendations();
  }, []);

  const handleSubmit = async (searchItem, { resetForm }) => {
    const result = await moviesApi.getMovie(searchItem);

    if (!result.ok) {
      setSearchFailed(true);
      return;
    }
    setSearchFailed(false);
    setMovie(result.data);
    resetForm();
    Keyboard.dismiss();
  };

  const handleUpdateLiking = async (movieObject) => {
    const response = await updateLikingApi.request(movieObject);
    getMoviesApi.request();
    getRecomendations();
  };

  const getRecomendations = async () => {
    const result = await flaskApi.getRecomendations();
    setRecomendations(result.data);
  };

  return (
    <Screen>
      <ScrollView bounces={false}>
        <View style={styles.searchBox}>
          <AppForm
            initialValues={{
              Title: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppFormField maxLength={255} name="Title" placeholder="Title" />
            {searchFailed && (
              <ErrorMessage
                error="Could not find Movie"
                visible={searchFailed}
              />
            )}
            <SubmitButton title="Search" style={{ width: 20 }} />
          </AppForm>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            handleUpdateLiking(movie);
          }}
        >
          <View style={styles.frame}>
            {movie && (
              <Image source={{ uri: movie.Poster }} style={styles.poster} />
            )}
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.break}>
          <AppText style={styles.membersTag}>Liked Movies</AppText>
        </View>
        <FlatList
          data={getMoviesApi.data}
          keyExtractor={(movie) => movie.id}
          renderItem={({ item }) => (
            <ListItem
              title={item.Title}
              subTitle={item.Plot}
              onPress={() => setMovie(item)}
              renderRightActions={() => (
                <ListItemDeleteAction
                  onPress={() => handleUpdateLiking(item)}
                />
              )}
            />
          )}
          ItemSeparatorComponent={ListItemSeperator}
          refreshing={refreshing}
          onRefresh={() => {
            getMoviesApi.request();
          }}
          style={styles.container}
        />
        <View style={styles.break2}>
          <AppText style={styles.membersTag}>Reccomended for you</AppText>
        </View>
        <FlatList
          data={recomendations}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  height: 100,
                  width: 1,
                  backgroundColor: "white",
                }}
              />
            );
          }}
          horizontal={true}
          keyExtractor={(movie) => movie.id}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() => {
                console.log("Pressed!");
                handleUpdateLiking(item);
              }}
            >
              <Image source={{ uri: item.Poster }} style={styles.poster2} />
            </TouchableWithoutFeedback>
          )}
          directionalLockEnabled
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
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
  break2: {
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    marginBottom: 10,
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
  poster2: {
    alignSelf: "center",
    width: 100,
    height: undefined,
    aspectRatio: 139 / 206,
    paddingTop: 20,
  },
  frame: {
    shadowColor: "#470000",
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 0.2,
  },
  recomendations: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 15,
  },
});

export default PreferenceScreen;
