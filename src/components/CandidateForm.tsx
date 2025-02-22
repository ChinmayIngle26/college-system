import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig"; // ✅ Use 'db' instead of 'firestore'
import { collection, addDoc } from "firebase/firestore";

const CandidateForm = () => {
  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !profile) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      // Add candidate data to Firestore
      await addDoc(collection(db, "candidates"), {  // ✅ Use 'db' instead of 'firestore'
        name,
        profile,
      });
      setLoading(false);
      navigate("/election"); // Redirect after submission
    } catch (err) {
      setLoading(false);
      setError("Failed to submit candidate details");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-center mb-4">Candidate Registration</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mt-1"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="profile" className="block text-sm font-semibold">Profile</label>
          <textarea
            id="profile"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mt-1"
            placeholder="Enter your profile"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-500 text-white p-3 rounded-md disabled:bg-gray-400"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CandidateForm;
