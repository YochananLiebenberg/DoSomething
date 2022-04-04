import client from "./client";

const endpoint = "/events";
const getEvents = () => client.get(endpoint);

export default {
  getEvents,
};
