// import { useState } from "react";
// import { sendHealthNotification } from "../services/notification";

// const HealthNotification = () => {
//     const [email, setEmail] = useState("");
//     const [coordinatorEmail, setCoordinatorEmail] = useState("");
//     const [studentName, setStudentName] = useState("");
//     const [message, setMessage] = useState("");
//     const [loading, setLoading] = useState(false);

//     const handleSendNotification = async () => {
//         if (!email || !coordinatorEmail || !studentName) {
//             setMessage("⚠️ Please fill in all fields.");
//             return;
//         }

//         setLoading(true);
//         const response = await sendHealthNotification(email, coordinatorEmail, studentName);
//         setLoading(false);

//         if (response.error) {
//             setMessage("❌ Error sending notification: " + response.error);
//         } else {
//             setMessage("✅ Health notification sent successfully!");
//             setEmail("");
//             setCoordinatorEmail("");
//             setStudentName("");
//         }
//     };

//     return (
//         <div>
//             <h2>Send Health Notification</h2>
//             <input type="email" placeholder="Student Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//             <input type="email" placeholder="Coordinator Email" value={coordinatorEmail} onChange={(e) => setCoordinatorEmail(e.target.value)} />
//             <input type="text" placeholder="Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
//             <button onClick={handleSendNotification} disabled={loading}>
//                 {loading ? "Sending..." : "Send Notification"}
//             </button>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// export default HealthNotification;

//----------------------------------------------------------------

import { useState, useEffect } from "react";
import { applyForLeave, getLeaveStatus } from "../services/leaveService";

const LeaveApplication = ({ userEmail }: { userEmail: string }) => {
    const [duration, setDuration] = useState("");
    const [reason, setReason] = useState("");
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchLeaveStatus = async () => {
            const response = await getLeaveStatus(userEmail);
            if (response) setStatus(response.status);
        };
        fetchLeaveStatus();
    }, [userEmail]);

    const handleApply = async () => {
        if (!duration || !reason) {
            setMessage("⚠️ Please fill in all fields.");
            return;
        }

        setLoading(true);
        const response = await applyForLeave(userEmail, duration, reason);
        setLoading(false);

        if (response.error) {
            setMessage("❌ Error: " + response.error);
        } else {
            setMessage("✅ Leave application sent!");
        }
    };

    return (
        <div>
            <h2>Apply for Leave</h2>
            <input type="text" placeholder="Duration (e.g., 2 days)" value={duration} onChange={(e) => setDuration(e.target.value)} />
            <textarea placeholder="Reason for leave" value={reason} onChange={(e) => setReason(e.target.value)} />
            <button onClick={handleApply} disabled={loading}>
                {loading ? "Submitting..." : "Apply for Leave"}
            </button>
            {message && <p>{message}</p>}
            {status && <p>Leave Status: {status}</p>}
        </div>
    );
};

export default LeaveApplication;
