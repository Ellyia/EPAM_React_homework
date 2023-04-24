import { Navigate } from 'react-router-dom';

import { useAuth } from './useAuth';

const RequireAuth = ({ children }) => {
  const location = '/courses';

  const { token } = useAuth();

  if (!token) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
