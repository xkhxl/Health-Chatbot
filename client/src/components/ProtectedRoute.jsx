import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

function ProtectedRoute() {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Checking authentication...</p>;
  }

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
