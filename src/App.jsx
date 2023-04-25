import { useState, useContext, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'; //

import Header from './componens/Header/Header';
import Courses from './componens/Courses/Courses';
import CreateCourse from './componens/CreateCourse/CreateCourse';
import Registration from './componens/Registration/Registration';
import Login from './componens/Login/Login';
import CourseInfo from './componens/CourseInfo/CourseInfo';
import { mockedListsContext } from './context';
import { rootReducer } from './store/index'; //

import RequireAuth from './hoc/RequireAuth';
import { AuthProvider } from './hoc/AuthProvider';

import app from './App.css';

const App = () => {
  const mockedLists = useContext(mockedListsContext);

  const [mockedCoursesList, setMockedCoursesListA] = useState([
    ...mockedLists.mockedCoursesList,
  ]);

  const [mockedAuthorsList, setMockedAuthorsListA] = useState([
    ...mockedLists.mockedAuthorsList,
  ]);

  const addAuthorToAuthorsList = useCallback(
    (author) => {
      const newAuthorsList = [...mockedAuthorsList, author];

      setMockedAuthorsListA(
        (mockedAuthorsList) => (mockedAuthorsList = newAuthorsList)
      );
    },
    [mockedAuthorsList]
  );

  const onAddCourse = useCallback(
    (course) => {
      const newCoursesList = [...mockedCoursesList, course];

      setMockedCoursesListA(
        (mockedCoursesList) => (mockedCoursesList = newCoursesList)
      );
    },
    [mockedCoursesList]
  );

  const value = {
    mockedCoursesList,
    mockedAuthorsList,
  };

  return (
    <div className={app}>
      <AuthProvider>
        <mockedListsContext.Provider value={value}>
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
                    <CreateCourse
                      addAuthorToAuthorsList={addAuthorToAuthorsList}
                      callbackFunc={onAddCourse}
                    />
                  </RequireAuth>
                }
              ></Route>
            </Route>
          </Routes>
        </mockedListsContext.Provider>
      </AuthProvider>
    </div>
  );
};

export default App;
