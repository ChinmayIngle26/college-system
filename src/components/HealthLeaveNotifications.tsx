import { useState } from "react";
import { sendHealthNotification } from "../services/notification";

const HealthNotification = () => {
    const [email, setEmail] = useState("");
    const [coordinatorEmail, setCoordinatorEmail] = useState("");
    const [studentName, setStudentName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendNotification = async () => {
        if (!email || !coordinatorEmail || !studentName) {
            setMessage("⚠️ Please fill in all fields.");
            return;
        }

        setLoading(true);
        const response = await sendHealthNotification(email, coordinatorEmail, studentName);
        setLoading(false);

        if (response.error) {
            setMessage("❌ Error sending notification: " + response.error);
        } else {
            setMessage("✅ Health notification sent successfully!");
            setEmail("");
            setCoordinatorEmail("");
            setStudentName("");
        }
    };

    return (
        <div>
            <h2>Send Health Notification</h2>
            <input type="email" placeholder="Student Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="email" placeholder="Coordinator Email" value={coordinatorEmail} onChange={(e) => setCoordinatorEmail(e.target.value)} />
            <input type="text" placeholder="Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
            <button onClick={handleSendNotification} disabled={loading}>
                {loading ? "Sending..." : "Send Notification"}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default HealthNotification;
