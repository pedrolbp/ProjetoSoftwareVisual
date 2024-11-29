import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Verifica se o token está presente

    // Se o token não existir, redireciona para a página de login
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Caso contrário, renderiza o componente filho
    return children;
};

export default ProtectedRoute;
