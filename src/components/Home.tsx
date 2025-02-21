// src/components/Home.tsx
import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Welcome to the College System</h1>
            <p>Select a system to navigate:</p>
            <nav className="mt-4">
                <ul className="space-y-2">
                    <li><Link to="/election" className="text-blue-500">Election System</Link></li>
                    <li><Link to="/health-leave" className="text-blue-500">Health & Leave</Link></li>
                    <li><Link to="/facility-booking" className="text-blue-500">Facility Booking</Link></li>
                    <li><Link to="/application-approval" className="text-blue-500">Application Approvals</Link></li>
                    <li><Link to="/academic-integrity" className="text-blue-500">Academic Integrity</Link></li>
                    <li><Link to="/complaint" className="text-blue-500">Complaint System</Link></li>
                    <li><Link to="/budget-tracking" className="text-blue-500">Budget Tracking</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;
