import api from "../api/axios";

const eventService = {
  /**
   * 📥 Get All Events
   * Retrieves a list of all publicly available events.
   */
  getAllEvents: async (params = {}) => {
    try {
      const response = await api.get("/api/events", { params });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch events",
      );
    }
  },

  /**
   * 📥 Get Event By ID
   * Retrieves detailed metadata for a specific event node.
   */
  getEventById: async (eventId) => {
    try {
      const response = await api.get(`/api/events/${eventId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Event retrieval failure",
      );
    }
  },

  /**
   * 📤 Create New Event
   * Submits a fresh event manifest to the central oversight node.
   */
  createEvent: async (eventData) => {
    try {
      console.log("🔌 [SERVICE] createEvent called");
      console.log("📤 [SERVICE] POST /api/events/create - sending FormData");
      const response = await api.post("/api/events/create", eventData, {
        headers: {
          "Content-Type": "multipart/form-data", // Often optional, but good to be explicit
        },
      });
      console.log("✅ [SERVICE] Response status:", response.status);
      console.log("✅ [SERVICE] Response data:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ [SERVICE] API Error:");
      console.error("❌ Status:", error.response?.status);
      console.error("❌ Data:", error.response?.data);
      console.error("❌ Message:", error.message);
      throw new Error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Event deployment failure",
      );
    }
  },

  /**
   * 🔄 Update Event Interface
   * Synchronizes updated metadata for a provisioned event node.
   */
  updateEvent: async (eventId, updatedData) => {
    try {
      const response = await api.put(`/api/events/${eventId}`, updatedData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Metadata synchronization failure",
      );
    }
  },

  /**
   * ❌ Terminate Event Node
   * Permanently decommissions an active event from the network.
   */
  deleteEvent: async (eventId) => {
    try {
      await api.delete(`/api/events/${eventId}`);
      return eventId;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Decommissioning failed",
      );
    }
  },

  /**
   * 🎟️ Enroll in Event
   * Subscribes the current user entity to an event's participation registry.
   */
  enrollInEvent: async (eventId) => {
    try {
      const response = await api.post(`/api/events/${eventId}/register`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Enrollment request rejected",
      );
    }
  },

  /**
   * 📊 Get Events by Organizer
   * Retrieves events created by a specific organizer
   */
  getEventsByOrganizer: async (organizerId) => {
    try {
      const response = await api.get(`/api/events/organizer/${organizerId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch organizer events",
      );
    }
  },

  /**
   * 🔍 Search Events
   * Search events by title, description, tags, or location
   */
  searchEvents: async (searchParams) => {
    try {
      const response = await api.get("/api/events/search", {
        params: searchParams,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Search failed");
    }
  },
};

export default eventService;
