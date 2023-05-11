import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from './componens/Header/Header';
import Courses from './componens/Courses/Courses';
import CourseForm from './componens/CourseForm/CourseForm';
import Registration from './componens/Registration/Registration';
import Login from './componens/Login/Login';
import CourseInfo from './componens/CourseInfo/CourseInfo';

import RequireAuth from './hoc/RequireAuth';
import { AuthProvider } from './hoc/AuthProvider';
import PrivateRoute from './componens/PrivateRouter/PrivateRouter';
import { getUser } from './store/selectors';
// import { useAuth } from './hoc/useAuth';

import app from './App.css';

const App = () => {
  const user = useSelector(getUser);
  // const { token } = useAuth();

  return (
    <div className={app}>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Header />}>
            <Route path='registration' element={<Registration />}></Route>
            <Route path='login' element={<Login />}></Route>
            <Route
              index
              // path='courses'
              element={
                <RequireAuth>
                  <Courses />
                </RequireAuth>
              }
            ></Route>

            <Route
              path='courses/:courseId'
              element={
                <RequireAuth>
                  <CourseInfo />
                </RequireAuth>
              }
            ></Route>

            <Route
              path='courses/add'
              element={
                <PrivateRoute role={user.role}>
                  <CourseForm mode={'create'} />
                </PrivateRoute>
              }
            ></Route>

            <Route
              path='courses/update/:courseId'
              element={
                <PrivateRoute role={user.role}>
                  <CourseForm mode={'update'} />
                </PrivateRoute>
              }
            ></Route>
          </Route>
          <Route path='*' element={<Navigate to='/courses' replace />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
