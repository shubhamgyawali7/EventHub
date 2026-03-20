import axios from "axios";
import url from "./url";

// 📥 Events
export const getAdminEvents = async () => {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.get(
      `${url.baseApiUrl}/api/admin/events`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch admin events"
    );
  }
};

// 👥 Users
export const getAdminUsers = async () => {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.get(
      `${url.baseApiUrl}/api/admin/users`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch admin users"
    );
  }
};

// ✅ Approve
export const approveAdminEvent = async (eventId) => {
  const token = localStorage.getItem("authToken");

  try {
    await axios.put(
      `${url.baseApiUrl}/api/admin/events/${eventId}/approve`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return eventId;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to approve event"
    );
  }
};

// ❌ Delete user
export const removeAdminUser = async (userId) => {
  const token = localStorage.getItem("authToken");

  try {
    await axios.delete(
      `${url.baseApiUrl}/api/admin/users/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return userId;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to remove user"
    );
  }
};