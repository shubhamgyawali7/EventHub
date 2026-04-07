import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log('📧 Email Config:');
console.log('  Email User:', process.env.EMAIL_USER);
console.log('  Email Pass:', process.env.EMAIL_PASS ? '✓ Set' : '✗ Missing');
console.log('  Client URL:', process.env.FRONTEND_URL);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    connectionTimeout: 5000,
    socketTimeout: 5000
});

// Verify connection
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Gmail Connection Error:', error.message);
    } else {
        console.log('✅ Gmail SMTP Connected Successfully');
    }
});

export const sendClubVerificationEmail = async (email, token) => {
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

    const mailOptions = {
        from: `"LifeLine" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Verify your LifeLine account',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e1e1e1; border-radius: 10px; overflow: hidden;">
                <div style="background-color: #e74c3c; padding: 20px; text-align: center;">
                    <h1 style="color: white; margin: 0;">LifeLine</h1>
                </div>
                <div style="padding: 20px;">
                    <h2>Verify Your Email</h2>
                    <p>Thank you for joining LifeLine! Please verify your email address to complete your registration.</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${verificationUrl}" style="background-color: #e74c3c; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Email Address</a>
                    </div>
                    <p>If the button above doesn't work, copy and paste this link into your browser:</p>
                    <p>${verificationUrl}</p>
                    <p>This link will expire in 24 hours.</p>
                </div>
                <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #777;">
                    <p>If you didn't create an account, you can safely ignore this email.</p>
                    <p>&copy; 2026 LifeLine. All rights reserved.</p>
                </div>
            </div>
        `
    };

    try {
        console.log(`📨 Attempting to send verification email to: ${email}`);
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Verification email sent successfully!`);
        console.log(`   Message ID: ${info.messageId}`);
        console.log(`   Verification URL: ${verificationUrl}`);
        return info;
    } catch (error) {
        console.error('❌ Error sending verification email:');
        console.error('   Error Code:', error.code);
        console.error('   Error Message:', error.message);
        console.error('   Command:', error.command);
        throw new Error(`Failed to send verification email: ${error.message}`);
    }
};

export const sendBloodRequestEmail = async (email, { donorName, bloodGroup, hospitalName, patientName, contactNumber, urgency, additionalInfo }) => {
    const urgencyColors = {
        CRITICAL: '#dc2626',
        URGENT: '#d97706',
        NORMAL: '#16a34a'
    };
    const urgencyColor = urgencyColors[urgency] || '#dc2626';

    const mailOptions = {
        from: `"LifeLine Emergency" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `🆘 [${urgency}] Blood Needed – ${bloodGroup} at ${hospitalName}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e1e1e1; border-radius: 10px; overflow: hidden;">
                <div style="background-color: #dc2626; padding: 20px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 24px;">🩸 LifeLine – Blood Alert</h1>
                </div>
                <div style="padding: 24px;">
                    <div style="background: ${urgencyColor}; color: white; display: inline-block; padding: 4px 14px; border-radius: 20px; font-size: 13px; font-weight: bold; margin-bottom: 18px;">
                        ${urgency} ALERT
                    </div>
                    <h2 style="margin: 0 0 16px; color: #1e293b;">Hello ${donorName},</h2>
                    <p style="color: #475569; line-height: 1.6;">Someone near you urgently needs <strong>${bloodGroup}</strong> blood. You are a verified donor matching this blood type. Please consider helping!</p>
                    <table style="width:100%; border-collapse: collapse; margin: 20px 0; background: #f8fafc; border-radius: 8px; overflow: hidden;">
                        <tr><td style="padding: 10px 16px; font-weight: bold; color: #64748b; width: 40%;">Blood Type</td><td style="padding: 10px 16px; color: #1e293b; font-weight: bold; font-size: 18px; color: #dc2626;">${bloodGroup}</td></tr>
                        <tr style="background:#f1f5f9"><td style="padding: 10px 16px; font-weight: bold; color: #64748b;">Patient Name</td><td style="padding: 10px 16px; color: #1e293b;">${patientName}</td></tr>
                        <tr><td style="padding: 10px 16px; font-weight: bold; color: #64748b;">Hospital</td><td style="padding: 10px 16px; color: #1e293b;">${hospitalName}</td></tr>
                        <tr style="background:#f1f5f9"><td style="padding: 10px 16px; font-weight: bold; color: #64748b;">Contact</td><td style="padding: 10px 16px;"><a href="tel:${contactNumber}" style="color: #dc2626; font-weight: bold;">${contactNumber}</a></td></tr>
                        ${additionalInfo ? `<tr><td style="padding: 10px 16px; font-weight: bold; color: #64748b;">Notes</td><td style="padding: 10px 16px; color: #475569;">${additionalInfo}</td></tr>` : ''}
                    </table>
                    <div style="text-align: center; margin: 28px 0 12px;">
                        <a href="tel:${contactNumber}" style="background-color: #dc2626; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">📞 Call Now</a>
                    </div>
                    <p style="color: #94a3b8; font-size: 13px; text-align: center;">If you cannot donate, please ignore this email. Every donation saves up to 3 lives.</p>
                </div>
                <div style="background-color: #f9f9f9; padding: 16px; text-align: center; font-size: 12px; color: #777;">
                    <p style="margin: 0;">© 2026 LifeLine. Sent to verified donors only.</p>
                </div>
            </div>
        `
    };

    try {
        console.log(`📨 Sending blood request alert to: ${email} for ${bloodGroup} blood`);
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Blood request alert sent successfully to ${email}`);
        console.log(`   Message ID: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error('❌ Error sending blood request email:');
        console.error('   Error Code:', error.code);
        console.error('   Error Message:', error.message);
        console.error('   Support:', 'Check Gmail App Password and account settings');
        throw error;
    }
};