import client from "./client";

import { create } from "apisauce";
import cache from "../utility/cache";
import authStorage from "../auth/storage";

const endpoint = "/group";

export const getRecomendationsForGroup = async (event) => {
  const id = event.id;
  const recomendations = await client.get(endpoint, { id });
  return recomendations;
};

export default {
  getRecomendationsForGroup,
};
