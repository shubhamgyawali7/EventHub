import api from "../api/axios";

const esewaService = {
  /**
   * 💳 Initiate eSewa Payment
   * Queries the payment amount and product details before payment
   */
  initiateEsewaPayment: async (paymentData) => {
    try {
      console.log("Frontend: Initiating eSewa payment with data:", paymentData);
      const response = await api.post(
        "/api/esewa/initiate-payment",
        paymentData,
      );
      console.log("Frontend: eSewa payment initiated response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Frontend: eSewa payment initiation failed:", error);
      throw new Error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "eSewa payment initiation failed",
      );
    }
  },

  /**
   * ✅ Confirm eSewa Payment
   * Submits the transaction code and confirms the payment
   */
  confirmEsewaPayment: async (paymentData) => {
    try {
      console.log("Frontend: Confirming eSewa payment with data:", paymentData);
      const response = await api.post(
        "/api/esewa/confirm-payment",
        paymentData,
      );
      console.log(
        "Frontend: eSewa payment confirmation response:",
        response.data,
      );
      return response.data;
    } catch (error) {
      console.error("Frontend: eSewa payment confirmation failed:", error);
      throw new Error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "eSewa payment confirmation failed",
      );
    }
  },

  /**
   * 🔍 Verify eSewa Payment
   * Verifies the payment status after completion
   */
  verifyEsewaPayment: async (verificationData) => {
    try {
      console.log(
        "Frontend: Verifying eSewa payment with data:",
        verificationData,
      );
      const response = await api.post(
        "/api/esewa/verify-payment",
        verificationData,
      );
      console.log(
        "Frontend: eSewa payment verification response:",
        response.data,
      );
      return response.data;
    } catch (error) {
      console.error("Frontend: eSewa payment verification failed:", error);
      throw new Error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "eSewa payment verification failed",
      );
    }
  },

  /**
   * 📊 Check eSewa Payment Status
   * Checks the current status of a payment transaction
   */
  checkEsewaPaymentStatus: async (statusData) => {
    try {
      console.log(
        "Frontend: Checking eSewa payment status with data:",
        statusData,
      );
      const response = await api.post("/api/esewa/check-status", statusData);
      console.log("Frontend: eSewa payment status response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Frontend: eSewa payment status check failed:", error);
      throw new Error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "eSewa payment status check failed",
      );
    }
  },

  /**
   * 📋 Get eSewa Payment Form Data
   * Retrieves HMAC-signed form fields for direct HTML form submission to eSewa
   */
  getPaymentForm: async (requestId, amount) => {
    try {
      console.log(
        "Frontend: Getting eSewa payment form for:",
        requestId,
        amount,
      );
      const response = await api.get(
        `/api/esewa/payment-form?request_id=${requestId}&amount=${amount}`,
      );
      console.log("Frontend: eSewa payment form data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Frontend: eSewa payment form fetch failed:", error);
      throw new Error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to get eSewa payment form",
      );
    }
  },
};

export default esewaService;
