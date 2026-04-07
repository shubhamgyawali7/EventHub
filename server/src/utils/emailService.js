import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,   // your gmail e.g. ffgyawali7@gmail.com
    pass: process.env.EMAIL_PASS,   // the 16-char App Password (no spaces)
  },
});

export const sendVerificationEmail = async (userEmail, clubName) => {
  console.log("📧 Sending to:", userEmail);
  try {
    await transporter.sendMail({
      from: `"EventHub" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `Congratulations! ${clubName} is now Verified on EventHub`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e1e1e1; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #6366f1; padding: 20px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 24px;">Welcome to EventHub!</h1>
          </div>
          <div style="padding: 30px;">
            <p>Hi there,</p>
            <p>Your club <strong>${clubName}</strong> has been officially <strong>Verified</strong>!</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL}/profile"
                 style="background:#6366f1;color:white;padding:12px 24px;text-decoration:none;border-radius:5px;font-weight:bold;">
                Access Your Dashboard
              </a>
            </div>
            <p>Cheers,<br>The EventHub Team</p>
          </div>
        </div>
      `,
    });
    console.log("✅ Email sent to", userEmail);
    return true;
  } catch (error) {
    console.error("❌ Email error:", error.message);
    return false;
  }
};