import { Route, Routes } from 'react-router-dom';

import Header from './componens/Header/Header';
import Courses from './componens/Courses/Courses';
import CreateCourse from './componens/CourseForm/CourseForm';
import Registration from './componens/Registration/Registration';
import Login from './componens/Login/Login';
import CourseInfo from './componens/CourseInfo/CourseInfo';

import RequireAuth from './hoc/RequireAuth';
import { AuthProvider } from './hoc/AuthProvider';

import app from './App.css';

const App = () => {
  return (
    <div className={app}>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Header />}>
            <Route path='registration' element={<Registration />}></Route>
            <Route path='login' element={<Login />}></Route>
            <Route
              path='courses'
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
                <RequireAuth>
                  <CreateCourse />
                </RequireAuth>
              }
            ></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
