import React, { useState, useEffect } from 'react';

const ElectionSystem = () => {
    const [candidates, setCandidates] = useState<{ id: number; name: string; profile: string }[]>([]);
    const [voted, setVoted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch candidates from the API
        const fetchCandidates = async () => {
            try {
                const response = await fetch('/api/election/candidates');
                const data = await response.json();
                setCandidates(data);
            } catch (err) {
                setError('Failed to fetch candidates');
            }
        };

        fetchCandidates();
    }, []);

    const handleVote = async (candidateId: number) => {
        if (voted) {
            setError('You have already voted');
            return;
        }

        try {
            const response = await fetch('/api/election/vote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ candidateId }),
            });

            if (response.ok) {
                setVoted(true);
                setError(null);
            } else {
                setError('Failed to cast vote');
            }
        } catch (err) {
            setError('An error occurred while voting');
        }
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
        </div>
    );
};

export default ElectionSystem;