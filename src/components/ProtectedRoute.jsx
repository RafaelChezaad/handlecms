import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Verificar si el usuario está autenticado (ejemplo usando localStorage)
  const isAuthenticated = localStorage.getItem("authToken");

  // Si el usuario no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Si el usuario está autenticado, renderizar la ruta protegida
  return children;
};

export default ProtectedRoute;
