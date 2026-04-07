import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // IMPORTANT
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  family: 4,
});

const frontendUrl = process.env.FRONTEND_URL;

/**
 * 📧 Send Club Verification Email
 * Notifies the club owner that their organization has been verified.
 */

export const sendVerificationEmail = async (userEmail, clubName) => {
  const mailOptions = {
    from: `"EventHub" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: `🎉 Congratulations! ${clubName} is now Verified on EventHub`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #e1e1e1; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #6366f1; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 24px;">Welcome to the EventHub Family!</h1>
        </div>
        <div style="padding: 30px;">
          <p>Hi there,</p>
          <p>We are excited to inform you that your club, <strong>${clubName}</strong>, has been officially <strong>Verified</strong> by the EventHub administration team.</p>
          <p>You can now log in to your dashboard and start creating amazing IT events for our community.</p>
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="${frontendUrl}/profile" style="background-color: #6366f1; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Access Your Dashboard
            </a>
          </div>
          
          <p>If you have any questions or need help setting up your first event, feel free to reply to this email.</p>
          <p>Cheers,<br>The EventHub Team</p>
        </div>
        <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #777;">
          © ${new Date().getFullYear()} EventHub. Building a better IT community together.
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Verification email sent to ${userEmail} for club ${clubName}`);
    return true;
  } catch (error) {
    console.error("❌ Email failed to send:", error);
    return false;
  }
};
