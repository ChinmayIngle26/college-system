// import React, { useState } from "react"; // ✅ Import useState
// import { useAuth } from "../context/AuthContext"; // ✅ Correct path for useAuth
// import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

// export default function Signup() {
//   const [email, setEmail] = useState(""); // ✅ useState is now defined
//   const [password, setPassword] = useState("");
//   const { signup } = useAuth(); // ✅ useAuth is now properly imported
//   const navigate = useNavigate(); // ✅ useNavigate is correctly imported

//   async function handleSubmit(e) {
//     e.preventDefault();

//     try {
//       await signup(email, password);
//       alert("Signup Successful!");

//       navigate("/login"); // ✅ Redirects to login
//     } catch (error) {
//       alert(error.message);
//     }
//   }

//   return (
//     <div>
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Signup</button>
//       </form>
//     </div>
//   );
// }
// import React, { useState } from "react";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !password || !registrationNumber) {
      alert("All fields are required.");
      return;
    }

    try {
      await signup(name, email, password, registrationNumber);
      alert("Signup Successful!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
          />
          <input
            type="text"
            placeholder="Registration Number"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
