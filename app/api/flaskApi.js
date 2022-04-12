import client from "./client";

import { create } from "apisauce";
import cache from "../utility/cache";
import authStorage from "../auth/storage";

const endpoint = "/movie";

export const getRecomendations = async () => {
  const recomendations = await client.get(endpoint);
  console.log("RESULT: " + recomendations.data);
  return recomendations;
};

export default {
  getRecomendations,
};
