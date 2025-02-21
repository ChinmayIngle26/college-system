// src/components/NotFound.tsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold text-red-500">404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;

