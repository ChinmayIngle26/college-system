import React, { useEffect, useState } from 'react';
import { fetchBudgets, submitExpenseProof } from '../services/api';
import { Budget } from '../types/Budget';

const BudgetTrackingSystem: React.FC = () => {
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [expenseProof, setExpenseProof] = useState<File | null>(null);
    const [selectedBudget, setSelectedBudget] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBudgets = async () => {
            try {
                const data = await fetchBudgets();
                setBudgets(data);
            } catch (err) {
                setError('Failed to load budgets');
            } finally {
                setLoading(false);
            }
        };

        loadBudgets();
    }, []);

    const handleExpenseProofChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setExpenseProof(file);
    };

    const handleSubmitExpenseProof = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!expenseProof || !selectedBudget) {
            setError('Please select a budget and upload a proof.');
            return;
        }

        try {
            await submitExpenseProof(selectedBudget, expenseProof);
            alert('Expense proof submitted successfully!');
            setExpenseProof(null);
            setSelectedBudget('');
        } catch (err) {
            setError('Failed to submit expense proof');
        }
    };

    if (loading) {
        return <div>Loading budgets...</div>;
    }

    return (
        <div>
            <h1>Budget Tracking System</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <h2>Available Budgets</h2>
            <ul>
                {budgets.map((budget) => (
                    <li key={budget.id}>
                        {budget.name} - {budget.amount}
                        <button onClick={() => setSelectedBudget(budget.id)}>Select</button>
                    </li>
                ))}
            </ul>
            {selectedBudget && (
                <form onSubmit={handleSubmitExpenseProof}>
                    <h3>Submit Expense Proof for {selectedBudget}</h3>
                    <input type="file" onChange={handleExpenseProofChange} />
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};

export default BudgetTrackingSystem;