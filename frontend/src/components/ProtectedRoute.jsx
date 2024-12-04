import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Verifica se o token está presente
    const location = useLocation(); // Captura a rota atual

    // Se o token não existir, redireciona para a página de login
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Caso contrário, renderiza o componente filho
    return children;
};

export default ProtectedRoute;
