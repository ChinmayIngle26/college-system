import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
            <Switch>
                <Route path="/election" component={ElectionSystem} />
                <Route path="/health-leave" component={HealthLeaveNotifications} />
                <Route path="/facility-booking" component={FacilityBookingSystem} />
                <Route path="/application-approval" component={ApplicationApprovalSystem} />
                <Route path="/academic-integrity" component={AcademicIntegritySystem} />
                <Route path="/complaint" component={ComplaintSystem} />
                <Route path="/budget-tracking" component={BudgetTrackingSystem} />
            </Switch>
        </Router>
    );
};

console.log("import.meta.env:", import.meta.env);
console.log("VITE_CLERK_PUBLISHABLE_KEY:", import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);


export default App;