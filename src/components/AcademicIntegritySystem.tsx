import React, { useEffect, useState } from 'react';
import { fetchAcademicIntegrityRecords } from '../services/api';

const AcademicIntegritySystem = () => {
    const [records, setRecords] = useState<{ id: number; name: string; reason: string; proofUrl: string }[]>([]);

    useEffect(() => {
        const getRecords = async () => {
            const data = await fetchAcademicIntegrityRecords();
            setRecords(data);
        };

        getRecords();
    }, []);

    return (
        <div>
            <h1>Academic Integrity Violations</h1>
            {records.length === 0 ? (
                <p>No records found.</p>
            ) : (
                <ul>
                    {records.map((record) => (
                        <li key={record.id}>
                            <strong>Name:</strong> {record.name} <br />
                            <strong>Reason:</strong> {record.reason} <br />
                            <strong>Proof:</strong> <a href={record.proofUrl} target="_blank" rel="noopener noreferrer">View Proof</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AcademicIntegritySystem;