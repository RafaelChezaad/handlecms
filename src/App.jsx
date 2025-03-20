import { lazy } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';

const Header = lazy(() => import('./components/Header'));
const Login = lazy(() => import('./components/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));
const CreatePost = lazy(() => import('./pages/CreatePost'));
const EditPost = lazy(() => import('./pages/EditPost'));
const DraftPosts = lazy(() => import('./pages/DraftPosts'));
const DeletedPosts = lazy(() => import('./pages/DeletedPosts'));

import './App.css';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        <Route path="/edit-post/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
        <Route path="/draft-posts" element={<ProtectedRoute><DraftPosts /></ProtectedRoute>} />
        <Route path="/deleted-posts" element={<ProtectedRoute><DeletedPosts /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
