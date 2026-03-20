
import axios from "axios";
import url from "./url";

export const getAllEvents = async () => {
  const response = await axios.get(`${url}/api/events`);
  return response.data;
};

export const createEventApi = async (eventData) => {
  const token = localStorage.getItem("authToken");

  const response = await axios.post(
    `${url}/api/events`,
    eventData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateEventApi = async (eventId, updatedData) => {
  const token = localStorage.getItem("authToken");

  const response = await axios.put(
    `${url}/api/events/${eventId}`,
    updatedData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteEventApi = async (eventId) => {
  const token = localStorage.getItem("authToken");

  await axios.delete(`${url}/api/events/${eventId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return eventId;
};