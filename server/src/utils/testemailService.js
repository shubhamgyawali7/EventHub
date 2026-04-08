import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.EMAIL_FROM || 'EventHub <support@mail.aakashbhandari.info.np>';

export const sendClubVerificationEmail = async (email, token) => {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    try {
        console.log(`📨 Resend: Sending verification email to: ${email}`);
        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: [email],
            subject: 'Verify your EventHub account',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e1e1e1; border-radius: 10px; overflow: hidden;">
                    <div style="background-color: #6366f1; padding: 20px; text-align: center;">
                        <h1 style="color: white; margin: 0;">EventHub</h1>
                    </div>
                    <div style="padding: 20px;">
                        <h2>Verify Your Email</h2>
                        <p>Thank you for joining EventHub! Please verify your email address to complete your registration.</p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${verificationUrl}" style="background-color: #6366f1; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Email Address</a>
                        </div>
                        <p>This link will expire in 24 hours.</p>
                    </div>
                    <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #777;">
                        <p>&copy; 2026 EventHub. All rights reserved.</p>
                    </div>
                </div>
            `
        });

        if (error) throw error;
        console.log(`✅ Resend: Email sent. ID: ${data.id}`);
        return data;
    } catch (error) {
        console.error('❌ Resend Error:', error.message);
        throw error;
    }
};

