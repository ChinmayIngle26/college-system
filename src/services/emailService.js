// import { getAuth } from "firebase/auth";

// export const sendEmail = async (to, subject, body) => {
//     try {
//         // Simulating email sending (Replace with actual email API like SendGrid)
//         console.log(`📧 Sending email to: ${to}`);
//         console.log(`Subject: ${subject}`);
//         console.log(`Message: ${body}`);
//         return { success: true };
//     } catch (error) {
//         console.error("❌ Error sending email:", error);
//         return { success: false, error };
//     }
// };
import axios from "axios";

const SENDGRID_API_KEY = "YOUR_SENDGRID_API_KEY"; // 🔥 Replace with your actual API Key
const SENDGRID_SENDER_EMAIL = "your-email@example.com"; // 🔥 Use your verified sender email

export const sendEmail = async (to, subject, body) => {
    try {
        const response = await axios.post(
            "https://api.sendgrid.com/v3/mail/send",
            {
                personalizations: [{ to: [{ email: to }] }],
                from: { email: SENDGRID_SENDER_EMAIL },
                subject: subject,
                content: [{ type: "text/plain", value: body }]
            },
            {
                headers: {
                    Authorization: `Bearer ${SENDGRID_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("📧 Email sent successfully:", response.data);
        return { success: true };
    } catch (error) {
        console.error("❌ Error sending email:", error.response ? error.response.data : error.message);
        return { success: false, error: error.message };
    }
};
