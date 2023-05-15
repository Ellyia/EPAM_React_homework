import { useCallback, useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';

import { fetchCourses } from '../../store/courses/actionCreators';
import { fetchAuthors } from '../../store/authors/actionCreators';

import { loadCourses, loadAuthors } from '../../servisces';

import { getCourses, getAuthors, getUser } from '../../store/selectors';

import styles from './Courses.module.css';

const Courses = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourses(loadCourses));
  }, []);

  useEffect(() => {
    dispatch(fetchAuthors(loadAuthors));
  }, []);

  const coursesList = useSelector(getCourses, shallowEqual);
  const authorsList = useSelector(getAuthors, shallowEqual);
  const user = useSelector(getUser, shallowEqual);

  const [searchPhrase, setSearchPhrase] = useState('');

  const searchCourse = useCallback((items, searchPhrase) => {
    if (searchPhrase?.length === 0) {
      return items;
    }

    return items.filter((el) => {
      const elName = el.title.toString().toLowerCase();
      const termLC = searchPhrase.toString().toLowerCase();
      return elName.indexOf(termLC) > -1 || el.id.indexOf(termLC) > -1;
    });
  }, []);

  const onUpdateSearch = useCallback((searchPhrase) => {
    setSearchPhrase(searchPhrase);
  }, []);

  const visibleCourses = searchCourse(coursesList, searchPhrase);

  const cards = visibleCourses?.map((cardData) => {
    const { id, ...cardProps } = cardData;
    const authors = cardProps.authors;

    let authorsStr = authorsList
      ?.filter((author) => authors.includes(author.id))
      .map((x) => x.name)
      .join(', ');

    return {
      id,
      cardProps,
      authorsStr,
    };
  });

  const onAddNewCourse = useCallback((e, url) => {
    e.preventDefault();
    navigate(url);
  }, []);

  const addCallbackHandler = useCallback((func, url) => {
    return function (e) {
      func(e, url);
    };
  }, []);

  if (localStorage.getItem('result')) {
    return (
      <div className={styles.main}>
        <div className={styles.searchPanel}>
          <SearchBar onUpdateSearch={onUpdateSearch} />
          {user.role === 'admin' ? (
            <Button
              text={'Add new course'}
              callbackFunc={addCallbackHandler(onAddNewCourse, '/courses/add')}
            />
          ) : null}
        </div>
        <ul className={styles.cards}>
          {cards?.map(({ id, cardProps, authorsStr }) => (
            <CourseCard
              key={id}
              cardProps={cardProps}
              authorsStr={authorsStr}
              id={id}
            />
          ))}
        </ul>
      </div>
    );
  } else {
    return <Navigate to='/login' replace />;
  }
};

export default Courses;
