import api from "../api/axios";
//api => url/...
const authService = {
  /**
   * 🔑 Login User Entity
   * Authenticats a user against central data and provisions a secure session.
   */
  login: async (logindata) => {
    try {
      const response = await api.post("/api/auth/login", logindata); // (url/api/auth/login  , data)
      localStorage.setItem("authToken", response.data.token);
      return response.data;
    } catch (error) {
      // Return a structured error object
      const message = error.response?.data?.message || error.response?.data || "Login failure";
      throw new Error(message);
    }
  },

  /**
   * 📝 Register New Entity
   * Submits a registration request for a fresh user profile.
   */
  register: async (userData) => {
    try {
      const response = await api.post("/api/auth/register", userData);
      localStorage.setItem("authToken", response.data.token);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  },

  getMe: async () => {
    try {
      const response = await api.get("/api/auth/me");
      console.log("Frontedn Me data=>", response.data);
      // Only set if we actually got a token back (some setups don't return it in 'me')
      if (response.data?.token && response.data.token !== "undefined") {
        localStorage.setItem("authToken", response.data.token);
      }
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data || "Identity verification failure";
      throw new Error(message);
    }
  },

  /**
   * 🛠️ Update Profile Entity
   * Modifies the user profile metadata including profile picture upload.
   */
  updateProfile: async (formData) => {
    try {
      const response = await api.put("/api/auth/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || 
        error.response?.data?.message || 
        "Profile update failed"
      );
    }
  },

  /**
   * ❌ Terminate Session
   * Clears the current authentication token from local storage, effectively ending the user session.
   */
  logout: () => {
    localStorage.removeItem("authToken");
  },
};

export default authService;
