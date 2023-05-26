import { useCallback, useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';

import { fetchCourses } from '../../store/courses/actionCreators';
import { fetchAuthors } from '../../store/authors/actionCreators';

import { loadResourse } from '../../servisces';

import { getCourses, getAuthors, getUser } from '../../store/selectors';

import styles from './Courses.module.css';

const Courses = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourses(loadResourse));
    dispatch(fetchAuthors(loadResourse));
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

  const visibleCourses = useMemo(() => {
    return searchCourse(coursesList, searchPhrase);
  }, [coursesList, searchPhrase, searchCourse]);

  const cards = Array.isArray(visibleCourses)
    ? visibleCourses?.map((cardData) => {
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
      })
    : null;

  return (
    <div className={styles.main}>
      <div className={styles.searchPanel}>
        <SearchBar onUpdateSearch={onUpdateSearch} />
        {user.role === 'admin' ? <AddNewCourseBtn /> : null}
      </div>
      <ul className={styles.cards}>
        {cards?.map(({ id, cardProps, authorsStr }) => (
          <CourseCard
            key={id}
            cardProps={cardProps}
            authorsStr={authorsStr}
            id={id}
            data-testid='course-card'
          />
        ))}
      </ul>
    </div>
  );
};

export const AddNewCourseBtn = () => {
  const navigate = useNavigate();

  const onAddNewCourse = useCallback((e, url) => {
    e.preventDefault();
    navigate(url);
  }, []);

  const addCallbackHandler = useCallback((func, url) => {
    return function (e) {
      func(e, url);
    };
  }, []);

  return (
    <Button
      text={'Add new course'}
      callbackFunc={addCallbackHandler(onAddNewCourse, '/courses/add')}
    />
  );
};

// const coursesLoader = async ({request, params}) => {
//   console.log(request, params);
//   const data = await loadCourses();
//   return data;
// }

export default Courses;
// export {coursesLoader};
