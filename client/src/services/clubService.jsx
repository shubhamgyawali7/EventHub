import api from "../api/axios";

const clubService = {
  /**
   * 🏗️ Register Organizational Node
   * Submits a registration request for a new club/organization entity.
   */
  registerClub: async (clubData) => {
    try {
      console.log("🔌 [SERVICE] registerClub called");
      console.log("📤 [SERVICE] POST /api/clubs/register - sending FormData");
      const response = await api.post("/api/clubs/register", clubData, {
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

  updateGoogleSheetLink: async (eventId, googleSheetResponseLink) => {
    try {
      const cleanEventId = eventId.toString().trim().replace(/\/+$/, "");
      const response = await api.patch(`/api/events/integration/google-sheet/${cleanEventId}`, {
        googleSheetResponseLink,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Failed to update Google Sheet link"
      );
    }
  },
};

export default clubService;
