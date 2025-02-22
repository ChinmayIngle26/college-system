import React, { useState, useEffect } from 'react';
import { fetchComplaints, submitComplaint } from '../services/api';

const AnonymousComplaintSystem = () => {
    const [complaints, setComplaints] = useState([]);
    const [newComplaint, setNewComplaint] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadComplaints = async () => {
            const fetchedComplaints = await fetchComplaints();
            setComplaints(fetchedComplaints);
            setLoading(false);
        };
        loadComplaints();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newComplaint.trim()) {
            const complaintData = { title: 'Anonymous', description: newComplaint, content: newComplaint, anonymous: true }; // Assuming ComplaintData has 'title', 'description', 'content', and 'anonymous' fields
            await submitComplaint(complaintData);
            setNewComplaint('');
            const updatedComplaints = await fetchComplaints();
            setComplaints(updatedComplaints);
        }
    };

    return (
        <div>
            <h2>Anonymous Complaint System</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={newComplaint}
                    onChange={(e) => setNewComplaint(e.target.value)}
                    placeholder="Submit your complaint anonymously"
                    required
                />
                <button type="submit">Submit Complaint</button>
            </form>
            {loading ? (
                <p>Loading complaints...</p>
            ) : (
                <ul>
                    {complaints.map((complaint, index) => (
                        <li key={index}>{complaint}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AnonymousComplaintSystem;