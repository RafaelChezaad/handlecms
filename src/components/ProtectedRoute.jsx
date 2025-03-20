import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );

  useEffect(() => {
    if (isAuthenticated) {
      // Configurar un temporizador para borrar el token después de 40 minutos (2400000 ms)
      const timeout = setTimeout(() => {
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
      }, 40 * 60 * 1000);

      return () => clearTimeout(timeout); // Limpiar el temporizador al desmontar
    }
  }, [isAuthenticated]);

  // Si el usuario no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
