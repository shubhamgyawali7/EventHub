import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Use your verified domain email
const FROM_EMAIL = process.env.EMAIL_FROM || 'EventHub <support@mail.aakashbhandari.info.np>';

export const sendVerificationEmail = async (userEmail, clubName) => {
  const dashboardUrl = `${process.env.FRONTEND_URL}/club/dashboard`;

  console.log(`📧 Resend: Attempting to notify: ${userEmail} regarding ${clubName}`);

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: `Successfully Verified Your Club! ${clubName} is now Verified on EventHub`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e1e1e1; border-radius: 12px; overflow: hidden; color: #333;">
          <div style="background-color: #6366f1; padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px; letter-spacing: 1px;">EventHub</h1>
          </div>
          <div style="padding: 40px; line-height: 1.6;">
            <h2 style="color: #1f2937; margin-top: 0;">Verification Approved!</h2>
            <p>Great news! Your club, <span style="color: #6366f1; font-weight: bold;">${clubName}</span>, has been officially verified by our team.</p>
            <p>You can now start posting events, managing members, and growing your community on our platform.</p>
            
            <div style="text-align: center; margin: 35px 0;">
              <a href="${dashboardUrl}" 
                 style="background-color: #6366f1; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.4);">
                 Access Your Dashboard
              </a>
            </div>

            <p style="font-size: 0.9em; color: #6b7280;">If you didn't request this, or believe this was an error, please contact our support team immediately.</p>
            
            <hr style="border: 0; border-top: 1px solid #f3f4f6; margin: 30px 0;">
            <p style="margin-bottom: 0;">Cheers,</p>
            <p style="margin-top: 5px; font-weight: bold; color: #4b5563;">The EventHub Team</p>
          </div>
          <div style="background-color: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #9ca3af;">
            &copy; 2026 EventHub. All rights reserved.
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("❌ Resend Error:", error);
      return { success: false, error: error.message };
    }

    console.log("✅ Resend: Verification notification sent. ID:", data.id);
    return { success: true, messageId: data.id };
  } catch (err) {
    console.error("❌ Resend Exception:", err.message);
    return { success: false, error: err.message };
  }
};