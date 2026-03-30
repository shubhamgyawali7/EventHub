// Before every request, this runs automatically.
//Frontend → Interceptor → Server → Interceptor → Frontend
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL || "http://localhost:5173",
  withCredentials: true,
});

// Request Interceptor (Gets token from localStorage)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
//Auto logout on token expiry
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login"; // redirect
    }
    return Promise.reject(error);
  },
);
export default api;
