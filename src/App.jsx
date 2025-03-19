import { useState , lazy } from 'react'
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
const Login = lazy(() => import('./components/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />


      </Routes>
     
     
    </>
  )
}

export default App
