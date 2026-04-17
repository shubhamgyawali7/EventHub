import { khaltiPayment, khaltiLookup } from "../utils/khaltiAPI.js";
import { generateEsewaSignature, verifyEsewaStatus } from "../utils/esewaAPI.js";
import Registration from "../models/Registration.js";
import Event from "../models/Events.js";
import mongoose from "mongoose";

/**
 * ==========================================
 * KHALTI PAYMENT GATEWAY
 * ==========================================
 */

// Initiate Khalti Payment
export const initiateKhaltiPayment = async (req, res) => {
  try {
    const data = req.body;
    const CLIENT_URL = process.env.FRONTEND_URL || "http://localhost:5173";

    // Build payload for Khalti API v2
    const payload = {
      return_url: `${CLIENT_URL}/payment-success`,
      website_url: CLIENT_URL,
      amount: Number(data.amount), // Expecting paisa from frontend (multiplied by 100)
      purchase_order_id: data.purchase_order_id,
      purchase_order_name: data.purchase_order_name || "Event Registration",
      customer_info: {
        name: data.customer_info?.name || "Customer",
        email: data.customer_info?.email || "",
        phone: data.customer_info?.phone || "",
      },
    };

    console.log(`💳 [KHALTI] Initiating Payment for Order: ${payload.purchase_order_id}`);
    const result = await khaltiPayment(payload);

    res.json({
      success: true,
      pidx: result.pidx,
      payment_url: result.payment_url,
    });
  } catch (error) {
    console.error("❌ [KHALTI] Initiation failed:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Khalti payment initiation failed",
      error: error.response?.data || error.message,
    });
  }
};

// Verify Khalti Payment
export const verifyKhaltiPayment = async (req, res) => {
  try {
    const { pidx } = req.body;
    if (!pidx) return res.status(400).json({ success: false, message: "PIDX is required" });

    console.log(`🔍 [KHALTI] Verifying PIDX: ${pidx}`);
    const result = await khaltiLookup(pidx);

    if (result.status === "Completed") {
      await finalizeRegistration(result.purchase_order_id, {
        gateway: "khalti",
        pidx: result.pidx,
        amount: result.amount,
        transactionId: result.transaction_id,
      });

      return res.json({
        success: true,
        message: "Payment verified successfully!",
        data: result
      });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    console.error("❌ [KHALTI] Verification failed:", error.response?.data || error.message);
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
};

/**
 * ==========================================
 * ESEWA PAYMENT GATEWAY
 * ==========================================
 */

// Generate eSewa Form Data (Handled by Frontend mostly, but signature is here)
export const getEsewaPaymentForm = async (req, res) => {
  try {
    const { request_id, amount } = req.query;
    if (!request_id || !amount) return res.status(400).json({ success: false, message: "Missing required fields" });

    const ESEWA_MERCHANT_ID = process.env.ESEWA_MERCHANT_ID;
    const ESEWA_FORM_URL = process.env.ESEWA_FORM_URL || "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    const CLIENT_URL = process.env.FRONTEND_URL || "http://localhost:5173";

    const amountNum = Number(amount);
    const signatureMessage = `total_amount=${amountNum},transaction_uuid=${request_id},product_code=${ESEWA_MERCHANT_ID}`;
    const signature = generateEsewaSignature(signatureMessage);

    const formData = {
      action: ESEWA_FORM_URL,
      amount: amountNum,
      tax_amount: 0,
      total_amount: amountNum,
      transaction_uuid: request_id,
      product_code: ESEWA_MERCHANT_ID,
      product_service_charge: 0,
      product_delivery_charge: 0,
      success_url: `${CLIENT_URL}/payment-success`,
      failure_url: `${CLIENT_URL}/payment-success`,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      signature,
    };

    res.json({ success: true, data: formData });
  } catch (error) {
    console.error("❌ [ESEWA] Form generation failed:", error.message);
    res.status(500).json({ success: false, message: "Failed to generate eSewa form" });
  }
};

// Verify eSewa Payment
export const verifyEsewaPayment = async (req, res) => {
  try {
    const { request_id, amount, transaction_code } = req.body;
    
    console.log(`🔍 [ESEWA] Verifying Transaction: ${transaction_code}`);
    const statusData = await verifyEsewaStatus({ amount, transaction_uuid: request_id });

    if (statusData.status === "COMPLETE" || statusData.status === "SUCCESS") {
      await finalizeRegistration(request_id, {
        gateway: "esewa",
        amount: amount,
        transactionId: transaction_code,
        reference_code: statusData.reference_code,
      });

      return res.json({
        success: true,
        message: "Payment verified successfully!",
        data: statusData
      });
    }

    res.json({ success: false, message: "Payment not completed", data: statusData });
  } catch (error) {
    console.error("❌ [ESEWA] Verification failed:", error.message);
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
};

/**
 * ==========================================
 * SHARED HELPER FUNCTIONS
 * ==========================================
 */

const finalizeRegistration = async (registrationId, paymentInfo) => {
  const registration = await Registration.findById(registrationId);
  
  if (registration && registration.status === "Pending") {
    registration.status = "Confirmed";
    
    // Convert gateway string (khalti/esewa) to capitalized Model Enum (Khalti/eSewa)
    let serviceName = "None";
    if (paymentInfo.gateway === "khalti") serviceName = "Khalti";
    else if (paymentInfo.gateway === "esewa") serviceName = "eSewa";

    registration.paymentService = serviceName;
    registration.paymentInfo = {
      ...paymentInfo,
      paymentDate: new Date(),
    };
    await registration.save();

    // Increment participant count in the event
    await Event.findByIdAndUpdate(registration.event, {
      $inc: { participantCount: 1 }
    });

    console.log(`✅ [PAYMENT] Registration ${registrationId} confirmed via ${paymentInfo.gateway}`);
    return true;
  }
  return false;
};
