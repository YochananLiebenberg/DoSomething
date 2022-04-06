import client from "./client";

const endpoint = "/messages";

const send = async (message, eventId) => {
  return client.post(endpoint, { message, eventId });
};

const getMessages = () => client.get(endpoint);

export default {
  send,
  getMessages,
};
