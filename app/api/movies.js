import client from "./client";

import { create } from "apisauce";
import cache from "../utility/cache";
import authStorage from "../auth/storage";

const endpoint = "/movies";

export const updateLiking = async (movieObject) => {
  const response = await client.post("/movie", { movieObject });
  return response;
};

export const getMovies = () => {
  return client.get(endpoint);
};

export const getMovie = async (searchItem) => {
  const movie = await client.post(endpoint, { searchItem });
  return movie;
};

export default {
  updateLiking,
  getMovie,
  getMovies,
};
