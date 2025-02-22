import { db } from "./firebase";
import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // ✅ Import Auth
import { sendEmail } from "./emailService";

const leaveCollection = collection(db, "leaveApplications");

// **Student applies for leave**
export const applyForLeave = async (email, duration, reason) => {
    try {
        const leaveRef = doc(db, "leaveApplications", email);
        await setDoc(leaveRef, { 
            email, 
            duration, 
            reason, 
            status: "Pending" 
        });

        // Notify class coordinator via email
        await sendEmail(
            "coordinator@example.com", // Replace with coordinator's actual email
            "New Leave Request",
            `Student ${email} has applied for leave for ${duration} days.\nReason: ${reason}.\n\n
            Please approve or reject in your dashboard.`
        );

        return { success: true };
    } catch (error) {
        return { error: error.message };
    }
};

// **Get leave status for student dashboard**
export const getLeaveStatus = async (email) => {
    try {
        const leaveRef = doc(db, "leaveApplications", email);
        const leaveDoc = await getDoc(leaveRef);
        return leaveDoc.exists() ? leaveDoc.data() : null;
    } catch (error) {
        return { error: error.message };
    }
};

// **Get all leave requests for coordinator dashboard**
export const getLeaveRequests = async () => {
    try {
        const snapshot = await getDocs(leaveCollection);
        return snapshot.docs.map(doc => doc.data());
    } catch (error) {
        return { error: error.message };
    }
};

// **Approve/Reject Leave Application**
export const updateLeaveStatus = async (email, status) => {
    try {
        const leaveRef = doc(db, "leaveApplications", email);
        await setDoc(leaveRef, { status }, { merge: true });

        // Notify student about the decision
        await sendEmail(
            email,
            "Leave Application Update",
            `Your leave request has been ${status}.`
        );

        return { success: true };
    } catch (error) {
        return { error: error.message };
    }
};
