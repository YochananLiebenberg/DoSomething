import client from "./client";

import { create } from "apisauce";
import cache from "../utility/cache";
import authStorage from "../auth/storage";

const endpoint = "/movies";

export const updateLiking = (movieId) => {
  return client.post("/movie", { movieId });
};

export const getMovies = () => {
  return client.get(endpoint);
};

export const getMovie = async (searchItem) => {
  return await client.post(endpoint, { searchItem });
};

export default {
  updateLiking,
  getMovie,
  getMovies,
};
