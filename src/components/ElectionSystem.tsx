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
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebaseConfig'; // Import Firestore db
import { collection, getDocs } from 'firebase/firestore'; // Firebase Firestore methods

const ElectionSystem = () => {
    const [candidates, setCandidates] = useState<{ id: string; name: string; profile: string }[]>([]);
    const [voted, setVoted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch candidates from the Firestore collection
        const fetchCandidates = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'candidates'));
                const candidatesList: any[] = [];
                querySnapshot.forEach((doc) => {
                    candidatesList.push({ id: doc.id, ...doc.data() });
                });
                setCandidates(candidatesList);
            } catch (err) {
                setError('Failed to fetch candidates');
            }
        };

        fetchCandidates();
    }, []);

    const handleVote = async (candidateId: string) => {
        if (voted) {
            setError('You have already voted');
            return;
        }

        // Here you would submit the vote (handle voting logic)
        // For now, simulate vote and update the state.
        setVoted(true);
        setError(null);
    };

    return (
        <div>
            <h1>Student Election System</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {candidates.map((candidate) => (
                    <li key={candidate.id}>
                        <h2>{candidate.name}</h2>
                        <p>{candidate.profile}</p>
                        <button onClick={() => handleVote(candidate.id)} disabled={voted}>
                            {voted ? 'Voted' : 'Vote'}
                        </button>
                    </li>
                ))}
            </ul>
            {voted && <p>Thank you for voting!</p>}

            <div>
                {!voted && (
                    <Link to="/apply-candidate">
                        <button>Apply as a Candidate</button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ElectionSystem;
