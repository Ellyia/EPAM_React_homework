import { useState, useContext, useCallback } from 'react';

import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';
import { mockedListsContext } from '../../context';

import styles from './Courses.module.css';

const Courses = ({ callbackFunc }) => {
  const mockedLists = useContext(mockedListsContext);

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

  const visibleCourses = searchCourse(
    mockedLists.mockedCoursesList,
    searchPhrase
  );

  const cards = visibleCourses.map((cardData) => {
    const { id, ...cardProps } = cardData;
    const authors = cardProps.authors;

    let authorsStr = mockedLists.mockedAuthorsList
      .filter((author) => authors.includes(author.id))
      .map((x) => x.name)
      .join(', ');

    return {
      id,
      cardProps,
      authorsStr,
    };
  });

  const onAddNewCourse = useCallback(
    (e) => {
      e.preventDefault();
      callbackFunc();
    },
    [callbackFunc]
  );

  return (
    <div className={styles.main}>
      <div className={styles.searchPanel}>
        <SearchBar onUpdateSearch={onUpdateSearch} />
        <Button
          text={'Add new course'}
          callbackFunc={(e) => onAddNewCourse(e)}
        />
      </div>
      <ul className={styles.courses}>
        {cards.map(({ id, cardProps, authorsStr }) => (
          <CourseCard key={id} cardProps={cardProps} authorsStr={authorsStr} />
        ))}
      </ul>
    </div>
  );
};

export default Courses;
