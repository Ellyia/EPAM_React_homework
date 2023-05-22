import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getUser } from '../store/selectors';

const RequireAuth = ({ children }) => {
  const location = useLocation();

  const { isAuth } = useSelector(getUser);

  if (!isAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children || <Navigate to='/courses' />;
};

export default RequireAuth;
