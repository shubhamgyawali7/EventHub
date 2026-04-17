import api from "../api/axios";

/**
 * 💳 Consolidated Payment Service
 * Handles all communication with the backend payment endpoints for both Khalti and eSewa.
 */
const paymentService = {
  
  // ==========================================
  // KHALTI GATEWAY
  // ==========================================

  /**
   * Initiate Khalti Payment
   */
  initiateKhalti: async (paymentData) => {
    try {
      console.log("💳 [FRONTEND] Initiating Khalti Payment:", paymentData);
      const response = await api.post("/api/payments/khalti/initiate", paymentData);
      return response.data;
    } catch (error) {
      throw handleError(error, "Khalti initiation failed");
    }
  },

  /**
   * Verify Khalti Payment
   */
  verifyKhalti: async (pidx) => {
    try {
      console.log("🔍 [FRONTEND] Verifying Khalti Payment:", pidx);
      const response = await api.post("/api/payments/khalti/verify", { pidx });
      return response.data;
    } catch (error) {
      throw handleError(error, "Khalti verification failed");
    }
  },

  // ==========================================
  // ESEWA GATEWAY
  // ==========================================

  /**
   * Get eSewa Form Data
   */
  getEsewaForm: async (registrationId, amount) => {
    try {
      console.log("🟢 [FRONTEND] Getting eSewa Form Data:", { registrationId, amount });
      const response = await api.get(`/api/payments/esewa/form?request_id=${registrationId}&amount=${amount}`);
      return response.data;
    } catch (error) {
      throw handleError(error, "eSewa form generation failed");
    }
  },

  /**
   * Verify eSewa Payment
   */
  verifyEsewa: async (verifyData) => {
    try {
      console.log("🔍 [FRONTEND] Verifying eSewa Payment:", verifyData);
      const response = await api.post("/api/payments/esewa/verify", verifyData);
      return response.data;
    } catch (error) {
      throw handleError(error, "eSewa verification failed");
    }
  },
};

/**
 * Generic internal error handler for cleaner service code
 */
const handleError = (error, defaultMessage) => {
  console.error(`❌ [PAYMENT SERVICE ERROR] ${defaultMessage}:`, error);
  return new Error(
    error.response?.data?.message || 
    error.response?.data?.error || 
    defaultMessage
  );
};

export default paymentService;
