import axios from "axios";

let authToken = localStorage.getItem("authToken");

const config = {
  baseApiUrl: import.meta.env.VITE_BASE_API_URL || "http://localhost:8080",
};

const getAllEvents = async () => {
  const response = await axios.get(
    `${config.baseApiUrl}/api/events/`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  console.log(response.data);
  return response;
};

export default { getAllEvents };
