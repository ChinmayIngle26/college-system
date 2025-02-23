


// import { useAuth } from "../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import { useEffect, useState } from "react";

// const Dashboard: React.FC = () => {
//   const { currentUser, userData, logout } = useAuth(); // ✅ Get userData from Firestore
//   const navigate = useNavigate();
//   const [loggingOut, setLoggingOut] = useState(false); // ✅ Disable button while logging out
//   const [menuOpen, setMenuOpen] = useState(true);

//   useEffect(() => {
//     if (!currentUser) {
//       navigate("/login");
//     }
//   }, [currentUser, navigate]);

//   const handleLogout = async () => {
//     setLoggingOut(true);
//     await logout();
//     setLoggingOut(false);
//     navigate("/login");
//   };

//   return (
//     <div className="dashboard">
//       {/* Sidebar */}
//       <aside className={`sidebar ${menuOpen ? "active" : ""}`}>
//         <h2>
//           Dashboard
//           <span className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
//             {menuOpen ? "✖" : "☰"}
//           </span>
//         </h2>
//         <nav className={menuOpen ? "active" : ""}>
//           <SidebarItem to="/election" label="Election" />
//           <SidebarItem to="/health-leave" label="Health & Leave" />
//           <SidebarItem to="/facility-booking" label="Facility Booking" />
//           <SidebarItem to="/application-approval" label="Approvals" />
//           <SidebarItem to="/academic-integrity" label="Academic Integrity" />
//           <SidebarItem to="/complaint" label="Complaints" />
//           <SidebarItem to="/budget-tracking" label="Budget Tracking" />
//         </nav>
//         {currentUser && (
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-5 disabled:opacity-50"
//             disabled={loggingOut}
//           >
//             {loggingOut ? "Logging out..." : "Logout"}
//           </button>
//         )}
//       </aside>

//       {/* Main Content */}
//       <main className="content">
//         <h1>Welcome, {userData?.name || "User"}!</h1>
//         <p>Email: {currentUser?.email}</p>
//         <p>Registration No: {userData?.registrationNumber || "N/A"}</p>
//         <p className="mt-4">Use the sidebar to navigate and access features.</p>
//       </main>
//     </div>
//   );
// };

// // ✅ Sidebar Item Component
// const SidebarItem = ({ to, label }: { to: string; label: string }) => (
//   <Link
//     to={to}
//     className="block py-2 px-3 hover:bg-gray-700 rounded transition duration-200"
//   >
//     {label}
//   </Link>
// );

// export default Dashboard;

import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../public/dashboard.css"; 

const Dashboard: React.FC = () => {
  const { currentUser, userData, logout } = useAuth(); 
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false); // ✅ Track dropdown state

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
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${menuOpen ? "active" : ""}`}>
        <h2>
          Dashboard
          <span className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✖" : "☰"}
          </span>
        </h2>
        <nav className={menuOpen ? "active" : ""}>
          <SidebarItem to="/election" label="Election" />
          <SidebarItem to="/health-leave" label="Health & Leave" />
          <SidebarItem to="/facility-booking" label="Facility Booking" />
          <SidebarItem to="/application-approval" label="Approvals" />

          {/* ✅ Dropdown Menu */}
          <div className="dropdown">
            <button
              className="dropdown-toggle"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              More Options ▼
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <SidebarItem to="/academic-integrity" label="Academic Integrity" />
                <SidebarItem to="/complaint" label="Complaints" />
                <SidebarItem to="/budget-tracking" label="Budget Tracking" />
              </div>
            )}
          </div>

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
      <main className="content">
        <h1>Welcome, {userData?.name || "User"}!</h1>
        <p>Email: {currentUser?.email}</p>
        <p>Registration No: {userData?.registrationNumber || "N/A"}</p>
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
