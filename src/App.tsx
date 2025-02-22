import React from "react";

 import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

 import Home from "./components/Home";  

 import NotFound from "./components/NotFound";  

 import ElectionSystem from "./components/ElectionSystem";  

 import HealthLeaveNotifications from "./components/HealthLeaveNotifications";  

 import FacilityBookingSystem from "./components/FacilityBookingSystem";  

 import ApplicationApprovalSystem from "./components/ApplicationApprovalSystem";  

 import AcademicIntegritySystem from "./components/AcademicIntegritySystem";  

 import ComplaintSystem from "./components/AnonymousComplaintSystem";  

 import BudgetTrackingSystem from "./components/BudgetTrackingSystem";  

 import { useAuth } from "./context/AuthContext";

 import PrivateRoute from "./components/PrivateRoute";

 import Login from "./components/Login";

 import Dashboard from "./components/Dashboard";

 import Signup from "./components/Signup";
 
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
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
<Route path="*" element={<NotFound />} /> 
</Routes>
</Router>

   );

 };
 
export default App;
