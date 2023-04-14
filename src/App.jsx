import { useState, useContext, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './componens/Header/Header';
import Courses from './componens/Courses/Courses';
import CreateCourse from './componens/CreateCourse/CreateCourse';
import Registration from './componens/Registration/Registration';
import { mockedListsContext } from './context';

import app from './App.css';

const App = () => {
  const mockedLists = useContext(mockedListsContext);

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

  return (
    <div className={app}>
      <Router>
        <mockedListsContext.Provider value={value}>
          <Header name='Ella' />
          <Routes>
            <Route exact path='/' element={<Registration />}></Route>
            <Route exact path='/courses' element={<Courses />}></Route>
            <Route
              exact
              path='/createCourse'
              element={
                <CreateCourse
                  addAuthorToAuthorsList={addAuthorToAuthorsList}
                  callbackFunc={onAddCourse}
                />
              }
            ></Route>
          </Routes>
        </mockedListsContext.Provider>
      </Router>
    </div>
  );
};

export default App;
