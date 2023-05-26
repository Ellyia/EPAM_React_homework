import { redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getUser } from '../../store/selectors';

const PrivateRoute = ({ children }) => {
  const user = useSelector(getUser);

  if (user.role === 'admin') {
    return children;
  } else {
    redirect('/courses');
  }
};

export default PrivateRoute;
