
import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedProps {
    children: ReactNode,
}

function Protected({ children }:ProtectedProps) {
    const token = localStorage.getItem('token');
    if (!token) return <Navigate to="/login" />;
    else return children;
}

export default Protected;