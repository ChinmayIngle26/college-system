// import React from "react";

//  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//  import Home from "./components/Home";  

//  import NotFound from "./components/NotFound";  

//  import ElectionSystem from "./components/ElectionSystem";  

//  import HealthLeaveNotifications from "./components/HealthLeaveNotifications";  

//  import FacilityBookingSystem from "./components/FacilityBookingSystem";  

//  import ApplicationApprovalSystem from "./components/ApplicationApprovalSystem";  

//  import AcademicIntegritySystem from "./components/AcademicIntegritySystem";  

//  import ComplaintSystem from "./components/AnonymousComplaintSystem";  

//  import BudgetTrackingSystem from "./components/BudgetTrackingSystem";  

//  import { useAuth } from "./context/AuthContext";

//  import PrivateRoute from "./components/PrivateRoute";

//  import Login from "./components/Login";

//  import Dashboard from "./components/Dashboard";

//  import Signup from "./components/Signup";
 
// const App: React.FC = () => {

//    return (
// <Router>
// <Routes>
// <Route path="/" element={<Home />} />
// <Route path="/election" element={<ElectionSystem />} />
// <Route path="/health-leave" element={<HealthLeaveNotifications />} />
// <Route path="/facility-booking" element={<FacilityBookingSystem />} />
// <Route path="/application-approval" element={<ApplicationApprovalSystem />} />
// <Route path="/academic-integrity" element={<AcademicIntegritySystem />} />
// <Route path="/complaint" element={<ComplaintSystem />} />
// <Route path="/budget-tracking" element={<BudgetTrackingSystem />} />
// <Route path="/login" element={<Login />} />
// <Route path="/signup" element={<Signup />} />
// <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
// <Route path="*" element={<NotFound />} /> 
// </Routes>
// </Router>

//    );

//  };
 
// export default App;

// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Ensure correct path

import Home from "./components/Home";
import NotFound from "./components/NotFound";
import ElectionSystem from "./components/ElectionSystem";
import CandidateForm from "./components/CandidateForm";
import HealthLeaveNotifications from "./components/HealthLeaveNotifications";
import FacilityBookingSystem from "./components/FacilityBookingSystem";
import ApplicationApprovalSystem from "./components/ApplicationApprovalSystem";
import AcademicIntegritySystem from "./components/AcademicIntegritySystem";
import ComplaintSystem from "./components/AnonymousComplaintSystem";
import BudgetTrackingSystem from "./components/BudgetTrackingSystem";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import PrivateRoute from "./components/PrivateRoute";

const App: React.FC = () => {
  const { currentUser } = useAuth(); // Get authentication state

  return (
    <Router>
      <Routes>
        {/* ✅ Redirect to /login if user is not logged in */}
        <Route path="/" element={currentUser ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

        {/* 🔓 Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔒 Protected Routes */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/election" element={<PrivateRoute><ElectionSystem /></PrivateRoute>} />
        <Route path="/candidate-form" element={<PrivateRoute><CandidateForm /></PrivateRoute>} />
        <Route path="/apply-candidate" element={<PrivateRoute><CandidateForm /></PrivateRoute>} />
        <Route path="/health-leave" element={<PrivateRoute><HealthLeaveNotifications userEmail="user@example.com" /></PrivateRoute>} />
        <Route path="/facility-booking" element={<PrivateRoute><FacilityBookingSystem /></PrivateRoute>} />
        <Route path="/application-approval" element={<PrivateRoute><ApplicationApprovalSystem /></PrivateRoute>} />
        <Route path="/academic-integrity" element={<PrivateRoute><AcademicIntegritySystem /></PrivateRoute>} />
        <Route path="/complaint" element={<PrivateRoute><ComplaintSystem /></PrivateRoute>} />
        <Route path="/budget-tracking" element={<PrivateRoute><BudgetTrackingSystem /></PrivateRoute>} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;