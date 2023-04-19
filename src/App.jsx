import { useState, useContext, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './componens/Header/Header';
import Courses from './componens/Courses/Courses';
import CreateCourse from './componens/CreateCourse/CreateCourse';
import Registration from './componens/Registration/Registration';
import Login from './componens/Login/Login';
import CourseInfo from './componens/CourseInfo/CourseInfo';
import { mockedListsContext } from './context';

import app from './App.css';

import { createContext } from 'react';

const LoginContext = createContext(null);

const App = () => {
  const mockedLists = useContext(mockedListsContext);

  const [token, setisToken] = useState({
    isLoggedIn: null,
    userName: null,
  });

  const [mockedCoursesList, setMockedCoursesListA] = useState([
    ...mockedLists.mockedCoursesList,
  ]);

  const [mockedAuthorsList, setMockedAuthorsListA] = useState([
    ...mockedLists.mockedAuthorsList,
  ]);

  // const [isAddCourse, setIsAddCourse] = useState(false);

  // const toggleIsAddCourse = useCallback(() => {
  // 	setIsAddCourse((isAddCourse) => (isAddCourse = !isAddCourse));
  // }, []);

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

      // toggleIsAddCourse();
    },
    [mockedCoursesList]
  );

  const value = {
    mockedCoursesList,
    mockedAuthorsList,
  };
  ///////////////////////////////////////////////////
  // const [isLogged, setisLoggedIn] = useState({
  //   isLoggedIn: null,
  //   userName: '',
  // });

  let isLoggedIn = !!localStorage.getItem('result');

  let userName = localStorage.getItem('userName');

  // const func = () => {
  //   if (!isLoggedInLS) {
  //     return {
  //       display: 'none',
  //     };
  //   } else {
  //     return {
  //       display: 'block',
  //     };
  //   }
  // };

  // let isLoggedIn = func();
  // console.log(isLoggedIn);

  // для нейм нужен отдельный контекст?
  return (
    <div className={app}>
      <mockedListsContext.Provider value={value}>
        <LoginContext.Provider value={token}>
          <Routes>
            <Route
              path='/'
              element={<Header userName={userName} isLoggedIn={isLoggedIn} />}
            >
              <Route path='registration' element={<Registration />}></Route>
              <Route path='login' element={<Login />}></Route>
              <Route path='courses' element={<Courses />}></Route>
              <Route path='courses/:courseId' element={<CourseInfo />}></Route>
              <Route
                path='courses/add'
                element={
                  <CreateCourse
                    addAuthorToAuthorsList={addAuthorToAuthorsList}
                    callbackFunc={onAddCourse}
                  />
                }
              ></Route>
            </Route>
          </Routes>
        </LoginContext.Provider>
      </mockedListsContext.Provider>
    </div>
  );
};

export default App;
