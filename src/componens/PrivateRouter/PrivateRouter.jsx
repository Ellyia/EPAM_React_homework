import { redirect } from 'react-router-dom';

const PrivateRoute = ({ role, children }) => {
  if (role === 'admin') {
    return children;
  } else {
    redirect('/courses');
  }
};

export default PrivateRoute;
