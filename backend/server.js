// import express from "express";
// import cors from "cors";
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// const PORT = 5001;

// app.use(express.json());
// app.use(cors());

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// // 📩 **API for sending general emails**
// app.post("/send-email", async (req, res) => {
//     console.log("📩 Email request received:", req.body);

//     const { to, subject, text } = req.body;

//     try {
//         let info = await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to,
//             subject,
//             text,
//         });

//         console.log("✅ Email sent:", info.response);
//         res.status(200).json({ message: "Email sent successfully!" });
//     } catch (error) {
//         console.error("❌ Error sending email:", error.message);
//         res.status(500).json({ error: error.message });
//     }
// });

// // 📢 **API for sending health notifications**
// app.post("/send-health-notification", async (req, res) => {
//     console.log("🏥 Health notification request received:", req.body);

//     const { studentEmail, classCoordinatorEmail, studentName } = req.body;

//     try {
//         let info = await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to: classCoordinatorEmail,
//             subject: "Health Notification",
//             text: `${studentName} has been reported sick. Please take necessary actions.`,
//         });

//         console.log("✅ Health notification sent:", info.response);
//         res.status(200).json({ message: "Health notification sent!" });
//     } catch (error) {
//         console.error("❌ Error sending health notification:", error.message);
//         res.status(500).json({ error: error.message });
//     }
// });

// // 🚪 **API for sending leave notifications**
// app.post("/send-leave-notification", async (req, res) => {
//     console.log("🚪 Leave notification request received:", req.body);

//     const { parentEmail, studentName } = req.body;

//     try {
//         let info = await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to: parentEmail,
//             subject: "Leave Notification",
//             text: `${studentName} has left campus. Please be informed for safety tracking.`,
//         });

//         console.log("✅ Leave notification sent:", info.response);
//         res.status(200).json({ message: "Leave notification sent!" });
//     } catch (error) {
//         console.error("❌ Error sending leave notification:", error.message);
//         res.status(500).json({ error: error.message });
//     }
// });

// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


import express from "express";

 import cors from "cors";

 import nodemailer from "nodemailer";

 import dotenv from "dotenv";
 
dotenv.config();
 
const app = express();

 const PORT = process.env.PORT || 5001;
 
app.use(express.json());

 app.use(cors());
 
// ✅ Ensure Email Credentials are Loaded

 if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {

     console.error("❌ Missing EMAIL_USER or EMAIL_PASS in .env file!");

     process.exit(1);

 }
 
// ✅ Setup Nodemailer Transporter

 const transporter = nodemailer.createTransport({

     service: "gmail",

     auth: {

         user: process.env.EMAIL_USER,

         pass: process.env.EMAIL_PASS,

     },

 });
 
// 📩 **API for Sending General Emails**

 app.post("/send-email", async (req, res) => {

     console.log("📩 Email request received:", req.body);
 
    const { to, subject, text } = req.body;

     if (!to || !subject || !text) {

         return res.status(400).json({ error: "Missing required fields: to, subject, or text." });

     }
 
    try {

         let info = await transporter.sendMail({

             from: process.env.EMAIL_USER,

             to,

             subject,

             text,

         });
 
        console.log("✅ Email sent:", info.response);

         res.status(200).json({ message: "Email sent successfully!" });

     } catch (error) {

         console.error("❌ Error sending email:", error.message);

         res.status(500).json({ error: error.message });

     }

 });
 
// 📢 **API for Sending Health Notifications**

 app.post("/send-health-notification", async (req, res) => {

     console.log("🏥 Health notification request received:", req.body);
 
    const { studentEmail, classCoordinatorEmail, studentName } = req.body;

     if (!studentEmail || !classCoordinatorEmail || !studentName) {

         return res.status(400).json({ error: "Missing required fields: studentEmail, classCoordinatorEmail, studentName." });

     }
 
    try {

         // ✅ Send email to the Coordinator

         let coordinatorInfo = await transporter.sendMail({

             from: process.env.EMAIL_USER,

             to: classCoordinatorEmail,

             subject: "Health Notification",

             text: `${studentName} has been reported sick. Please take necessary actions.`,

         });
 
        // ✅ Send email to the Student as Proof

         let studentInfo = await transporter.sendMail({

             from: process.env.EMAIL_USER,

             to: studentEmail,

             subject: "Copy of Your Health Notification",

             text: `Dear ${studentName},\n\nThis is a copy of the health notification sent to your coordinator (${classCoordinatorEmail}).\n\nKeep this for your records.`,

         });
 
        console.log("✅ Health notification sent to Coordinator & Student");

         res.status(200).json({ message: "Health notification sent!" });

     } catch (error) {

         console.error("❌ Error sending health notification:", error.message);

         res.status(500).json({ error: error.message });

     }

 });
 
// 🚪 **API for Sending Leave Notifications**

 app.post("/send-leave-notification", async (req, res) => {

     console.log("🚪 Leave notification request received:", req.body);
 
    const { parentEmail, studentName } = req.body;

     if (!parentEmail || !studentName) {

         return res.status(400).json({ error: "Missing required fields: parentEmail, studentName." });

     }
 
    try {

         let info = await transporter.sendMail({

             from: process.env.EMAIL_USER,

             to: parentEmail,

             subject: "Leave Notification",

             text: `${studentName} has left campus. Please be informed for safety tracking.`,

         });
 
        console.log("✅ Leave notification sent:", info.response);

         res.status(200).json({ message: "Leave notification sent!" });

     } catch (error) {

         console.error("❌ Error sending leave notification:", error.message);

         res.status(500).json({ error: error.message });

     }

 });
 
// ✅ Server Listening

 app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));