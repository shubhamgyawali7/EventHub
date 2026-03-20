import axios from "axios";
import url from "../url.js";

const register = async ({ name, email, password, confirmPassword }) => {
  try {
    const response = await axios.post(`${url.baseApiUrl}/api/auth/register`, {
      name,
      email,
      password,
      confirmPassword,
    });

    // localStorage.setItem("authToken", response.data?.token);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Register failed");
  }
};

export { register };
