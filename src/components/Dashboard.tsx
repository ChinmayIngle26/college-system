// import { useAuth } from "../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import { useEffect } from "react";

// const Dashboard: React.FC = () => {
//   const { currentUser, logout } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (currentUser === null) {
//       navigate("/login");
//     }
//   }, [currentUser, navigate]);

//   const handleLogout = async () => {
//     await logout();
//     navigate("/login");
//   };

//   return (
//     <>
//       {/* Navbar */}
//       <div className="dashboard-navbar">
//         <h1>Dashboard</h1>
//         {currentUser && (
//           <nav className="nav-links">
//             <Link to="/election">Election</Link>
//             <Link to="/health-leave">Health & Leave</Link>
//             <Link to="/facility-booking">Facility Booking</Link>
//             <Link to="/application-approval">Approvals</Link>
//             <Link to="/academic-integrity">Integrity</Link>
//             <Link to="/complaint">Complaints</Link>
//             <Link to="/budget-tracking">Budget</Link>
//           </nav>
//         )}
//         {currentUser && (
//           <button className="logout-btn" onClick={handleLogout}>
//             Logout
//           </button>
//         )}
//       </div>

//       {/* Main content below navbar */}
//       <div className="main-content">
//         <p>Welcome, <span className="font-semibold">{currentUser?.email}</span></p>
//         <p>Use the navigation bar above to access features.</p>
//       </div>
//     </>
//   );
// };

// export default Dashboard;

//--------------------------------------------------------------------------------

// import { useAuth } from "../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import { useEffect } from "react";

// const Dashboard: React.FC = () => {
//   const { currentUser, logout } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (currentUser === null) {
//       navigate("/login");
//     }
//   }, [currentUser, navigate]);

//   const handleLogout = async () => {
//     await logout();
//     navigate("/login");
//   };

//   return (
//     <div className="dashboard-container">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="sidebar-item sidebar-item-1">
//           <i className="fas fa-tachometer-alt"></i>
//           <Link to="/dashboard">Dashboard</Link>
//           <div className="sidebar-info">Dashboard Overview</div>
//         </div>
//         <div className="sidebar-item sidebar-item-2">
//           <i className="fas fa-chart-line"></i>
//           <Link to="/election">Election</Link>
//           <div className="sidebar-info">Election Process</div>
//         </div>
//         <div className="sidebar-item sidebar-item-3">
//           <i className="fas fa-users"></i>
//           <Link to="/health-leave">Health & Leave</Link>
//           <div className="sidebar-info">Health & Leave Notifications</div>
//         </div>
//         <div className="sidebar-item sidebar-item-4">
//           <i className="fas fa-calendar-check"></i>
//           <Link to="/facility-booking">Facility Booking</Link>
//           <div className="sidebar-info">Book Campus Facilities</div>
//         </div>
//         <div className="sidebar-item sidebar-item-5">
//           <i className="fas fa-thumbs-up"></i>
//           <Link to="/application-approval">Approvals</Link>
//           <div className="sidebar-info">Application Approvals</div>
//         </div>
//         <div className="sidebar-item sidebar-item-6">
//           <i className="fas fa-shield-alt"></i>
//           <Link to="/academic-integrity">Academic Integrity</Link>
//           <div className="sidebar-info">Check Academic Integrity</div>
//         </div>
//         <div className="sidebar-item sidebar-item-7">
//           <i className="fas fa-comments"></i>
//           <Link to="/complaint">Complaints</Link>
//           <div className="sidebar-info">File Complaints</div>
//         </div>
//         <div className="sidebar-item sidebar-item-8">
//           <i className="fas fa-wallet"></i>
//           <Link to="/budget-tracking">Budget</Link>
//           <div className="sidebar-info">Track Budget & Funds</div>
//         </div>

//         {currentUser && (
//           <button className="logout-btn" onClick={handleLogout}>
//             Logout
//           </button>
//         )}
//       </div>

//       {/* Main content */}
//       <div className="main-content">
//         <p>Welcome, <span className="font-semibold">{currentUser?.email}</span></p>
//         <p>Use the sidebar to navigate and access features.</p>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Dashboard: React.FC = () => {
  const { currentUser, userData, logout } = useAuth(); // ✅ Get userData from Firestore
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false); // ✅ Disable button while logging out

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    setLoggingOut(false);
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5 flex flex-col">
        <h2 className="text-xl font-bold mb-5">Dashboard</h2>

        <nav className="flex-grow">
          <SidebarItem to="/election" label="Election" />
          <SidebarItem to="/health-leave" label="Health & Leave" />
          <SidebarItem to="/facility-booking" label="Facility Booking" />
          <SidebarItem to="/application-approval" label="Approvals" />
          <SidebarItem to="/academic-integrity" label="Academic Integrity" />
          <SidebarItem to="/complaint" label="Complaints" />
          <SidebarItem to="/budget-tracking" label="Budget Tracking" />
        </nav>

        {currentUser && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-5 disabled:opacity-50"
            disabled={loggingOut}
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold">Welcome, {userData?.name || "User"}!</h1>
        <p className="text-gray-600">Email: {currentUser?.email}</p>
        <p className="text-gray-600">Registration No: {userData?.registrationNumber || "N/A"}</p>
        <p className="mt-4">Use the sidebar to navigate and access features.</p>
      </main>
    </div>
  );
};

// ✅ Sidebar Item Component
const SidebarItem = ({ to, label }: { to: string; label: string }) => (
  <Link
    to={to}
    className="block py-2 px-3 hover:bg-gray-700 rounded transition duration-200"
  >
    {label}
  </Link>
);

export default Dashboard;
