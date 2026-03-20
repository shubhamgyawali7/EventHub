import axios from "axios";
import url from "../url.js";

const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${url}/api/auth/login`, {
      email,
      password,
    });

    // localStorage.setItem("authToken", response.data?.token);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Login failed");
  }
};

export default login;
