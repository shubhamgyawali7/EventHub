import axios from "axios";
import url from "./url";

// 📥 Get Organizer Events
export const getOrganizerEvents = async (orgId) => {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.get(
      `${url.baseApiUrl}/api/organizers/events`,
      {
        params: { orgId }, // optional
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch organizer events"
    );
  }
};

// ❌ Delete Event
export const deleteOrganizerEventApi = async (eventId) => {
  const token = localStorage.getItem("authToken");

  try {
    await axios.delete(
      `${url.baseApiUrl}/api/organizers/events/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return eventId;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to delete organizer event"
    );
  }
};