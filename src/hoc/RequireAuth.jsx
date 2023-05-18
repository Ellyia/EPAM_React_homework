import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getUser } from '../store/selectors';
import { useAuth } from './useAuth';

const RequireAuth = ({ children }) => {
  const location = useLocation();

  const { isAuth } = useSelector(getUser); //

  const { token } = useAuth();

  if (!isAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children || <Navigate to='/courses' />;
};

export default RequireAuth;
