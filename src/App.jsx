import { useState, useContext, useCallback } from 'react';

import Header from './componens/Header/Header';
import Courses from './componens/Courses/Courses';
import CreateCourse from './componens/CreateCourse/CreateCourse';
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

  const [isAddCourse, setIsAddCourse] = useState(false);

  const toggleIsAddCourse = useCallback(() => {
    setIsAddCourse((isAddCourse) => (isAddCourse = !isAddCourse));
  }, []);

  const onAddAuthor = useCallback(
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

      toggleIsAddCourse();
    },
    [mockedCoursesList, toggleIsAddCourse]
  );

  const value = {
    mockedCoursesList,
    mockedAuthorsList,
  };

  return (
    <div className={app}>
      <mockedListsContext.Provider value={value}>
        <Header name='Ella' />
        {isAddCourse ? (
          <CreateCourse onAddAuthor={onAddAuthor} callbackFunc={onAddCourse} />
        ) : (
          <Courses callbackFunc={toggleIsAddCourse} />
        )}
      </mockedListsContext.Provider>
    </div>
  );
};

export default App;
