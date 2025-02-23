// import React, { useState, useEffect } from 'react';
// import { db } from '../firebaseConfig';
// import { collection, getDocs, addDoc } from 'firebase/firestore';

// const ElectionSystem: React.FC = () => {
//     const [candidates, setCandidates] = useState<{ id: string; name: string; profile: string }[]>([]);
//     const [voted, setVoted] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchCandidates = async () => {
//             try {
//                 const querySnapshot = await getDocs(collection(db, "candidates"));
//                 const candidatesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as { id: string; name: string; profile: string }[];
//                 setCandidates(candidatesData);
//             } catch (err) {
//                 setError('Failed to fetch candidates');
//             }
//         };

//         fetchCandidates();
//     }, []);

//     const handleVote = async (candidateId: string) => {
//         if (voted) {
//             setError('You have already voted');
//             return;
//         }

//         try {
//             await addDoc(collection(db, "votes"), { candidateId });
//             setVoted(true);
//             setError(null);
//         } catch (err) {
//             setError('An error occurred while voting');
//         }
//     };

//     return (
//         <div>
//             <h1>Student Election System</h1>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <ul>
//                 {candidates.map((candidate) => (
//                     <li key={candidate.id}>
//                         <h2>{candidate.name}</h2>
//                         <p>{candidate.profile}</p>
//                         <button onClick={() => handleVote(candidate.id)} disabled={voted}>
//                             {voted ? 'Voted' : 'Vote'}
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//             {voted && <p>Thank you for voting!</p>}
//         </div>
//     );
// };

// export default ElectionSystem;

//----------------------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { db } from '../firebaseConfig'; // Import Firestore db
// import { collection, getDocs } from 'firebase/firestore'; // Firebase Firestore methods

// const ElectionSystem = () => {
//     const [candidates, setCandidates] = useState<{ id: string; name: string; profile: string }[]>([]);
//     const [voted, setVoted] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         // Fetch candidates from the Firestore collection
//         const fetchCandidates = async () => {
//             try {
//                 const querySnapshot = await getDocs(collection(db, 'candidates'));
//                 const candidatesList: any[] = [];
//                 querySnapshot.forEach((doc) => {
//                     candidatesList.push({ id: doc.id, ...doc.data() });
//                 });
//                 setCandidates(candidatesList);
//             } catch (err) {
//                 setError('Failed to fetch candidates');
//             }
//         };

//         fetchCandidates();
//     }, []);

//     const handleVote = async (candidateId: string) => {
//         if (voted) {
//             setError('You have already voted');
//             return;
//         }

//         // Here you would submit the vote (handle voting logic)
//         // For now, simulate vote and update the state.
//         setVoted(true);
//         setError(null);
//     };

//     return (
//         <div>
//             <h1>Student Election System</h1>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <ul>
//                 {candidates.map((candidate) => (
//                     <li key={candidate.id}>
//                         <h2>{candidate.name}</h2>
//                         <p>{candidate.profile}</p>
//                         <button onClick={() => handleVote(candidate.id)} disabled={voted}>
//                             {voted ? 'Voted' : 'Vote'}
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//             {voted && <p>Thank you for voting!</p>}

//             <div>
//                 {!voted && (
//                     <Link to="/apply-candidate">
//                         <button>Apply as a Candidate</button>
//                     </Link>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ElectionSystem;
import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // ✅ Import Firebase Auth
import { useAuth } from "../context/AuthContext";
import "../../public/election.css"; 

const ElectionSystem = () => {
    const { currentUser } = useAuth();
    const [elections, setElections] = useState<{ id: string; title: string; candidates: any[]; ended: boolean }[]>([]);
    const [userVotes, setUserVotes] = useState<{ [key: string]: string }>({});
    const [results, setResults] = useState<{ [key: string]: { winner: string; votes: number } }>({});
    const [loading, setLoading] = useState(true);

    // ✅ Fetch elections with authentication
    const fetchElections = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            console.error("User is not authenticated.");
            return;
        }

        try {
            const electionsSnapshot = await getDocs(collection(db, "elections")); // ✅ Fetch elections securely
            const electionList = electionsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as { id: string; title: string; candidates: any[]; ended: boolean }[];
            setElections(electionList);
        } catch (error) {
            console.error("Error fetching elections:", error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Fetch the user's votes from Firestore
    const fetchUserVotes = async () => {
        if (!currentUser) return;
        try {
            const voteDoc = await getDoc(doc(db, "votes", currentUser.uid));
            if (voteDoc.exists()) {
                setUserVotes(voteDoc.data().votes || {});
            }
        } catch (error) {
            console.error("Error fetching user votes:", error);
        }
    };

    // ✅ Call fetchElections and fetchUserVotes when component loads
    useEffect(() => {
        fetchElections();
        fetchUserVotes();
    }, [currentUser]);

    // ✅ Handle Voting
    const handleVote = async (electionId: string, candidateId?: string) => {
        if (!currentUser) {
            alert("You must be logged in to vote.");
            return;
        }

        if (!candidateId) {
            alert("Invalid candidate selection. Please try again.");
            return;
        }

        if (userVotes[electionId]) {
            alert("You have already voted in this election.");
            return;
        }

        try {
            const voteRef = doc(db, "votes", currentUser.uid);
            const voteDoc = await getDoc(voteRef);

            if (voteDoc.exists()) {
                await setDoc(voteRef, {
                    votes: { ...voteDoc.data().votes, [electionId]: candidateId }
                }, { merge: true });
            } else {
                await setDoc(voteRef, { votes: { [electionId]: candidateId } });
            }

            setUserVotes((prevVotes) => ({ ...prevVotes, [electionId]: candidateId }));
            alert("Vote submitted successfully!");
        } catch (error) {
            console.error("Error submitting vote:", error);
        }
    };

    if (loading) return <p>Loading elections...</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Election System</h1>

            {elections.length > 0 ? (
                <div>
                    {elections.map((election) => (
                        <div key={election.id} className="border p-4 mb-4">
                            <h2 className="text-xl font-semibold">{election.title}</h2>

                            <ul>
                                {election.candidates.map((candidate) => (
                                    <li key={`${election.id}-${candidate?.id || Math.random()}`} className="flex justify-between items-center border-b p-2">
                                        <span>{candidate.name}</span>
                                        {!userVotes[election.id] ? (
                                            <button
                                                onClick={() => handleVote(election.id, candidate.id)}
                                                className="bg-blue-500 text-white px-4 py-1 rounded ml-4 hover:bg-blue-700 transition disabled:opacity-50"
                                            >
                                                Vote
                                            </button>
                                        ) : userVotes[election.id] === candidate.id ? (
                                            <span className="text-blue-500 ml-4">✅ You Voted</span>
                                        ) : null}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No elections available.</p>
            )}
        </div>
    );
};

export default ElectionSystem;