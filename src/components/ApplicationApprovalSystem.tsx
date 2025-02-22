import React, { useState, useEffect } from 'react';
import { fetchApplications, submitApplication, updateApplicationStatus } from '../services/api';

const ApplicationApprovalSystem = () => {
    interface Application {
        id: string;
        title: string;
        description: string;
        status: string;
    }
    
    const [applications, setApplications] = useState<Application[]>([]);
    const [newApplication, setNewApplication] = useState({ title: '', description: '', applicantName: '', applicantEmail: '', applicationDetails: '' });

    useEffect(() => {
        const loadApplications = async () => {
            const data = await fetchApplications();
            setApplications(data);
        };
        loadApplications();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewApplication({ ...newApplication, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await submitApplication(newApplication);
        setNewApplication({ title: '', description: '', applicantName: '', applicantEmail: '', applicationDetails: '' });
        const data = await fetchApplications();
        setApplications(data);
    };

    const handleStatusUpdate = async (id: string, status: string) => {
            await updateApplicationStatus(id.toString(), status);
            const data = await fetchApplications();
            setApplications(data);
        };

    return (
        <div>
            <h2>Application Approval System</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={newApplication.title}
                    onChange={handleInputChange}
                    placeholder="Application Title"
                    required
                />
                <textarea
                    name="description"
                    value={newApplication.description}
                    onChange={handleInputChange}
                    placeholder="Application Description"
                    required
                />
                <input
                    type="text"
                    name="applicantName"
                    value={newApplication.applicantName}
                    onChange={handleInputChange}
                    placeholder="Applicant Name"
                    required
                />
                <input
                    type="email"
                    name="applicantEmail"
                    value={newApplication.applicantEmail}
                    onChange={handleInputChange}
                    placeholder="Applicant Email"
                    required
                />
                <textarea
                    name="applicationDetails"
                    value={newApplication.applicationDetails}
                    onChange={handleInputChange}
                    placeholder="Application Details"
                    required
                />
                <button type="submit">Submit Application</button>
            </form>
            <h3>Submitted Applications</h3>
            <ul>
                {applications.map((app) => (
                    <li key={app.id}>
                        <h4>{app.title}</h4>
                        <p>{app.description}</p>
                        <button onClick={() => handleStatusUpdate(app.id, 'approved')}>Approve</button>
                        <button onClick={() => handleStatusUpdate(app.id, 'rejected')}>Reject</button>
                        <span>Status: {app.status}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ApplicationApprovalSystem;