import { useAuth } from "../context/AuthContext";

 import { useNavigate, Link } from "react-router-dom";

 import { useEffect } from "react";
 
const Dashboard: React.FC = () => {

     const { currentUser, logout } = useAuth();

     const navigate = useNavigate();
 
    useEffect(() => {

         if (currentUser === null) {

             navigate("/login");

         }

     }, [currentUser, navigate]);
 
    const handleLogout = async () => {

         await logout();

         navigate("/login");

     };
 
    return (
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
<div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
<h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>

                 {currentUser ? (
<>
<p className="text-center text-gray-600 mb-4">Welcome, <span className="font-semibold">{currentUser.email}</span></p>

                         {/* Navigation Links */}
<nav className="mt-6">
<ul className="space-y-3">
<li><Link to="/election" className="block text-blue-500 hover:text-blue-700">Election System</Link></li>
<li><Link to="/health-leave" className="block text-blue-500 hover:text-blue-700">Health & Leave</Link></li>
<li><Link to="/facility-booking" className="block text-blue-500 hover:text-blue-700">Facility Booking</Link></li>
<li><Link to="/application-approval" className="block text-blue-500 hover:text-blue-700">Application Approvals</Link></li>
<li><Link to="/academic-integrity" className="block text-blue-500 hover:text-blue-700">Academic Integrity</Link></li>
<li><Link to="/complaint" className="block text-blue-500 hover:text-blue-700">Complaint System</Link></li>
<li><Link to="/budget-tracking" className="block text-blue-500 hover:text-blue-700">Budget Tracking</Link></li>
</ul>
</nav>
 
                        {/* Logout Button */}
<div className="mt-6 text-center">
<button 

                                 onClick={handleLogout} 

                                 className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">

                                 Logout
</button>
</div>
</>

                 ) : (
<p className="text-center text-gray-500">Loading...</p>

                 )}
</div>
</div>

     );

 };
 
export default Dashboard;