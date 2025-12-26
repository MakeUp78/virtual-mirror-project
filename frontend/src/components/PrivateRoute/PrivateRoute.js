import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // ⚠️ AUTENTICAZIONE TEMPORANEAMENTE DISABILITATA PER SVILUPPO
  // Riattiva commentando la riga seguente e decommentando quella dopo
  return <Outlet />;
  // return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
