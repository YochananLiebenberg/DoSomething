import client from "./client";

import { create } from "apisauce";
import cache from "../utility/cache";
import authStorage from "../auth/storage";

const endpoint = "/members";

export const updateAttendance = (eventId) => {
  return client.post(endpoint, { eventId });
};

const getMembers = (eventId) => {
  return client.get(endpoint, { eventId });
};

export default {
  getMembers,
  updateAttendance,
};
