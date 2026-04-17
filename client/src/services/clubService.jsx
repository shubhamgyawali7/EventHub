import api from "../api/axios";

const clubService = {
  /**
   * 🏗️ Register Organizational Node
   * Submits a registration request for a new club/organization entity.
   */
  registerClub: async (clubData) => {
    try {
      console.log("Club sending Data to backend =", clubData);
      const response = await api.post("/api/clubs/register", clubData);
      console.log("Club came Data =", response.data);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error(
        error.response?.data?.error || "Organizational registration failed",
      );
    }
  },

  /**
   * 📉 Get Club Status
   * Retrieves the current organizational status for the provisioned manager identity.
   */
  getClubStatus: async () => {
    try {
      const response = await api.get("/api/clubs/status");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Status retrieval failure",
      );
    }
  },

  getAllCreatedEvents: async () => {
    try {
      const response = await api.get("api/clubs/my-events");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Event retrieval failure",
      );
    }
  },

  /**
   * 🔄 Update Organizational Profile
   * Synchronizes updated metadata for an organizational profile into the central node.
   */
  updateClubProfile: async (formData) => {
    try {
      const response = await api.put("/api/clubs/profile", formData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Metadata synchronization failure",
      );
    }
  },

  /**
   * ❌ Delete Event
   * Deletes an event by its ID
   */
  deleteEvent: async (eventId) => {
    try {
      const response = await api.delete(`/api/clubs/events/${eventId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Event deletion failed");
    }
  },

  /**
   * 🎟️ Get Club Registrations
   * Fetches all registrations for events owned by the club
   */
  getClubRegistrations: async () => {
    try {
      const response = await api.get("/api/registrations/club/all");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch registrations"
      );
    }
  },
};

export default clubService;
