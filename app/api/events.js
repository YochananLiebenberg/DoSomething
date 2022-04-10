import client from "./client";

// Get user id from Storage
import authStorage from "../auth/storage";

const endpoint = "/events";
const getEvents = () => client.get(endpoint);

const addEvent = async (event, onUploadProgress) => {
  const user = await authStorage.getUser();
  const data = new FormData();
  data.append("title", event.title);
  data.append("time", event.time);
  data.append("userId", user.userId);
  data.append("categoryId", event.category.value);
  data.append("description", event.description);

  event.images.forEach((image, index) =>
    data.append("images", {
      name: "image" + index,
      type: "image/png",
      uri: image,
    })
  );

  if (event.location) {
    data.append("location", JSON.stringify(event.location));
  }
  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  addEvent,
  getEvents,
};
