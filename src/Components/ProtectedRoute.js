import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from './SessionContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { session } = useSession();

  const isLoggedIn = !!session.sessionToken;
  const hasRequiredRole = requiredRole ? session.role === requiredRole : true;

  if (!isLoggedIn || !hasRequiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
