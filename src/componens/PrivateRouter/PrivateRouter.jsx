import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, userRole, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        userRole === 'ADMIN' ? (
          <Component {...props} />
        ) : (
          <Redirect to='/courses' />
        )
      }
    />
  );
};

export default PrivateRoute;
