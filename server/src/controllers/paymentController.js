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

    // Save pidx to the registration immediately so we can find it later
    if (result.pidx) {
      await Registration.findByIdAndUpdate(payload.purchase_order_id, {
        "paymentInfo.pidx": result.pidx
      });
      console.log(`📌 [KHALTI] Saved PIDX ${result.pidx} to registration ${payload.purchase_order_id}`);
    }

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
      const actualAmount = result.total_amount || result.amount || 0;
      
      // Use pidx to find the registration since purchase_order_id might be missing
      const isFinalized = await finalizeRegistrationByPidx(pidx, {
        gateway: "khalti",
        amount: Number(actualAmount) / 100, 
        transactionId: result.transaction_id,
      });

      if (!isFinalized) {
        console.error(`❌ [KHALTI] Settlement failed for PIDX: ${pidx}`);
        return res.status(404).json({ 
          success: false, 
          message: "Could not find or update registration with this PIDX.",
          data: result 
        });
      }

      return res.json({
        success: true,
        message: "Payment verified and registration confirmed!",
        data: result
      });
    }

    res.json({ success: false, message: `Payment is ${result.status}`, data: result });
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

// Confirmation logic using pidx (More robust for Khalti)
const finalizeRegistrationByPidx = async (pidx, paymentInfo) => {
  console.log(`🔄 [PAYMENT] Finalizing by PIDX: "${pidx}"`);
  
  try {
    const updatedRegistration = await Registration.findOneAndUpdate(
      { "paymentInfo.pidx": pidx, status: "Pending" },
      {
        $set: {
          status: "Confirmed",
          paymentService: "Khalti",
          "paymentInfo.amount": paymentInfo.amount,
          "paymentInfo.transactionId": paymentInfo.transactionId,
          "paymentInfo.paymentDate": new Date(),
        }
      },
      { new: true }
    );

    if (!updatedRegistration) {
      // Check if it's already confirmed
      const alreadyDone = await Registration.findOne({ "paymentInfo.pidx": pidx, status: "Confirmed" });
      if (alreadyDone) return true;
      
      return false;
    }

    console.log(`✅ [PAYMENT] Confirmed registration: ${updatedRegistration._id}`);
    await Event.findByIdAndUpdate(updatedRegistration.event, { $inc: { participantCount: 1 } });

    return true;
  } catch (error) {
    console.error(`❌ [PAYMENT] Error using pidx:`, error.message);
    return false;
  }
};

// Generic finalization using ID (Still needed for eSewa)
const finalizeRegistration = async (registrationId, paymentInfo) => {
  console.log(`🔄 [PAYMENT] Finalizing by ID: "${registrationId}"`);
  
  try {
    const queryId = mongoose.Types.ObjectId.isValid(registrationId) 
      ? new mongoose.Types.ObjectId(registrationId) 
      : registrationId;

    const updatedRegistration = await Registration.findOneAndUpdate(
      { _id: queryId, status: "Pending" },
      {
        $set: {
          status: "Confirmed",
          paymentService: paymentInfo.gateway === "khalti" ? "Khalti" : "eSewa",
          "paymentInfo.amount": Number(paymentInfo.amount),
          "paymentInfo.transactionId": paymentInfo.transactionId,
          "paymentInfo.paymentDate": new Date(),
        }
      },
      { new: true }
    );

    if (!updatedRegistration) {
      const checkAgain = await Registration.findById(queryId);
      if (checkAgain && checkAgain.status === "Confirmed") return true;
      return false;
    }

    await Event.findByIdAndUpdate(updatedRegistration.event, { $inc: { participantCount: 1 } });
    return true;
  } catch (error) {
    console.error(`❌ [PAYMENT] Error finalization:`, error.message);
    return false;
  }
};
