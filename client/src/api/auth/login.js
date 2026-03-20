import axios from "axios";
import url from "../url.js";

const login = async (data) => {
  const { email, password } = data;
  console.log("Login data in api/auth/login.js:", { email, password }); // Debugging line
  try {
    const response = await axios.post(`${url.baseApiUrl}/api/auth/login`, {
      email,
      password,
    });
    
    console.log("Login response api/auth/login.js:"); // Debugging line
    localStorage.setItem("authToken", response.data?.token);
   
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Login failed");
  }
};

export { login };
