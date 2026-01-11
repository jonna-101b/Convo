import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { state } = useContext(AuthContext);

  if (!state.isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

  return children;
}

export default ProtectedRoute;
