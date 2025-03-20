import { lazy } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
const Header = lazy(() => import('./components/Header'));
const Login = lazy(() => import('./components/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));
const CreatePost = lazy(() => import('./pages/CreatePost'));

import './App.css';

function App() {
  const location = useLocation(); // Obtiene la ruta actual
  const isLoginPage = location.pathname === "/login"; // Verifica si estamos en login

  return (
    <>
      {!isLoginPage && <Header />} {/* Muestra el header solo si no estamos en login */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
