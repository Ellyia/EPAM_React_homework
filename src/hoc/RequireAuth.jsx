import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from './useAuth';

const RequireAuth = ({ children }) => {
  const location = useLocation();

  const { token } = useAuth();

  if (!token) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
