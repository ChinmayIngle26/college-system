import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home"; // Create a home page if needed
import NotFound from "./components/NotFound"; // Optional for 404 handling
import ElectionSystem from './components/ElectionSystem';
import HealthLeaveNotifications from './components/HealthLeaveNotifications';
import FacilityBookingSystem from './components/FacilityBookingSystem';
import ApplicationApprovalSystem from './components/ApplicationApprovalSystem';
import AcademicIntegritySystem from './components/AcademicIntegritySystem';
import ComplaintSystem from './components/AnonymousComplaintSystem'; // Ensure this file exists in the specified path
import BudgetTrackingSystem from './components/BudgetTrackingSystem';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/election" element={<ElectionSystem />} />
                <Route path="/health-leave" element={<HealthLeaveNotifications />} />
                <Route path="/facility-booking" element={<FacilityBookingSystem />} />
                <Route path="/application-approval" element={<ApplicationApprovalSystem />} />
                <Route path="/academic-integrity" element={<AcademicIntegritySystem />} />
                <Route path="/complaint" element={<ComplaintSystem />} />
                <Route path="/budget-tracking" element={<BudgetTrackingSystem />} />
                <Route path="*" element={<NotFound />} /> {/* Handles unknown routes */}

            </Routes>
        </Router>
    );
};

// Debugging: Ensure environment variables are loaded correctly
console.log("import.meta.env:", import.meta.env);
console.log("VITE_CLERK_PUBLISHABLE_KEY:", import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
console.log("Environment Variables:", import.meta.env);

export default App;
