export const sendEmail = async (to: string, subject: string, text: string) => {
    try {
        const response = await fetch('http://localhost:5001/send-email', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ to, subject, text }),
        });

        if (!response.ok) {
            throw new Error('Failed to send email');
        }

        return await response.json();
    } catch (error) {
        console.error("Error sending email:", error);
        return { error: "Failed to send email" };
    }
};

export const sendHealthNotification = async (studentEmail: string, classCoordinatorEmail: string, studentName: string) => {
    try {
        const response = await fetch('http://localhost:5001/send-health-notification', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ studentEmail, classCoordinatorEmail, studentName }),
        });

        if (!response.ok) {
            throw new Error('Failed to send health notification');
        }

        return await response.json();
    } catch (error) {
        console.error("Error sending health notification:", error);
        return { error: "Failed to send health notification" };
    }
};

export const sendLeaveNotification = async (parentEmail: string, studentName: string) => {
    try {
        const response = await fetch('http://localhost:5001/send-leave-notification', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ parentEmail, studentName }),
        });

        if (!response.ok) {
            throw new Error('Failed to send leave notification');
        }

        return await response.json();
    } catch (error) {
        console.error("Error sending leave notification:", error);
        return { error: "Failed to send leave notification" };
    }
};
