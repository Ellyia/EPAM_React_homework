import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseForm from './components/CourseForm/CourseForm';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';

import RequireAuth from './components/RequireAuth/RequireAuth';

import PrivateRoute from './components/PrivateRouter/PrivateRouter';
import { getUser } from './store/selectors';

import app from './App.css';

const App = () => {
  const user = useSelector(getUser);

  return (
    <div className={app}>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route path='registration' element={<Registration />} />

          <Route path='login' element={<Login />} />

          <Route
            index
            element={
              <RequireAuth>
                <Courses />
              </RequireAuth>
            }
          />

          <Route
            path='courses/:courseId'
            element={
              <RequireAuth>
                <CourseInfo />
              </RequireAuth>
            }
          />

          <Route
            path='courses/add'
            element={
              <PrivateRoute>
                <CourseForm mode={'create'} />
              </PrivateRoute>
            }
          />

          <Route
            path='courses/update/:courseId'
            element={
              <PrivateRoute>
                <CourseForm mode={'update'} />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </div>
  );
};

export default App;
