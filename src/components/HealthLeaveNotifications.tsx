import { useState } from "react";
import { sendHealthNotification } from "../services/notification";

const HealthNotification = () => {
    const [email, setEmail] = useState("");
    const [coordinatorEmail, setCoordinatorEmail] = useState("");
    const [studentName, setStudentName] = useState("");
    const [message, setMessage] = useState("");

    const handleSendNotification = async () => {
        const response = await sendHealthNotification(email, coordinatorEmail, studentName);
        if (response.error) {
            setMessage("❌ Error sending notification");
        } else {
            setMessage("✅ Health notification sent successfully!");
        }
    };

    return (
        <div>
            <h2>Send Health Notification</h2>
            <input type="email" placeholder="Student Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="email" placeholder="Coordinator Email" value={coordinatorEmail} onChange={(e) => setCoordinatorEmail(e.target.value)} />
            <input type="text" placeholder="Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
            <button onClick={handleSendNotification}>Send Notification</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default HealthNotification;
