// export const sendEmail = async (to: string, subject: string, text: string) => {
//     try {
//         const response = await fetch('http://localhost:5001/send-email', {
//             method: 'POST',
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ to, subject, text }),
//         });

//         if (!response.ok) {
//             throw new Error('Failed to send email');
//         }

//         return await response.json();
//     } catch (error) {
//         console.error("Error sending email:", error);
//         return { error: "Failed to send email" };
//     }
// };

// export const sendHealthNotification = async (studentEmail: string, classCoordinatorEmail: string, studentName: string) => {
//     try {
//         const response = await fetch('http://localhost:5001/send-health-notification', {
//             method: 'POST',
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ studentEmail, classCoordinatorEmail, studentName }),
//         });

//         if (!response.ok) {
//             throw new Error('Failed to send health notification');
//         }

//         return await response.json();
//     } catch (error) {
//         console.error("Error sending health notification:", error);
//         return { error: "Failed to send health notification" };
//     }
// };

// export const sendLeaveNotification = async (parentEmail: string, studentName: string) => {
//     try {
//         const response = await fetch('http://localhost:5001/send-leave-notification', {
//             method: 'POST',
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ parentEmail, studentName }),
//         });

//         if (!response.ok) {
//             throw new Error('Failed to send leave notification');
//         }

//         return await response.json();
//     } catch (error) {
//         console.error("Error sending leave notification:", error);
//         return { error: "Failed to send leave notification" };
//     }
// };
export const sendEmail = async (to: string, subject: string, text: string) => {

    try {

        const response = await fetch("http://localhost:5001/send-email", {

            method: "POST",

            headers: { "Content-Type": "application/json" },

            body: JSON.stringify({ to, subject, text }),

        });

       if (!response.ok) {

            throw new Error(`Failed to send email to ${to}`);

        }

       return await response.json();

    } catch (error) {

        console.error("Error sending email:", error);

        return { error: "Failed to send email" };

    }

};

export const sendHealthNotification = async (studentEmail: string, classCoordinatorEmail: string, studentName: string) => {

    try {

        // ✅ Send email to the Coordinator

        const coordinatorResponse = await sendEmail(

            classCoordinatorEmail,

            `Health Notification for ${studentName}`,

            `Dear Coordinator,\n\nThis is a health notification for student ${studentName}.\nPlease review the situation.\n\nRegards,\nCollege System`

        );

       // ✅ Send a Copy to the Student

        const studentResponse = await sendEmail(

            studentEmail,

            "Copy of Your Health Notification",

            `Dear ${studentName},\n\nThis is a copy of the health notification sent to your class coordinator (${classCoordinatorEmail}).\n\nThis serves as proof of your notification.\n\nRegards,\nCollege System`

        );

       return { coordinatorResponse, studentResponse };

    } catch (error) {

        console.error("Error sending health notification:", error);

        return { error: "Failed to send health notification" };

    }

};

export const sendLeaveNotification = async (parentEmail: string, studentName: string) => {

    try {

        // ✅ Send email to the Parent

        const parentResponse = await sendEmail(

            parentEmail,

            `Leave Notification for ${studentName}`,

            `Dear Parent,\n\nYour child ${studentName} has applied for leave.\n\nPlease review the request.\n\nRegards,\nCollege System`

        );

       return { parentResponse };

    } catch (error) {

        console.error("Error sending leave notification:", error);

        return { error: "Failed to send leave notification" };

    }

};