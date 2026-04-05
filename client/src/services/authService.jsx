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
      throw new Error(error.response?.data?.message || "Login failure");
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

  /**
   * 📥 Get Current Identity
   * Retrieves the current user profile metadata for active session verification.
   */
  getMe: async () => {
    try {
      const response = await api.get("/api/auth/me");
      console.log("Frontedn Me data=>", response.data);
      localStorage.setItem("authToken", response.data.token);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Identity verification failure",
      );
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
