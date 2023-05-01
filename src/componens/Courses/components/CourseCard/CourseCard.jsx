import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; //

import Button from '../../../../common/Button/Button';

import { courses } from '../../../../store/courses/actionCreators';

import styles from './CourseCard.module.css';

const CourseCard = ({ cardProps, authorsStr, id }) => {
  const { title, description, duration, creationDate } = cardProps;
  //
  let navigate = useNavigate();
  const dispatch = useDispatch();
  //

  const coursesList = useSelector((state) => {
    console.log(
      'state.coursesReducer.courses.CC',
      state.coursesReducer.courses
    ); //
    return state.coursesReducer.courses;
  });

  const onDeleteCourse = useCallback((e, idToDel) => {
    e.preventDefault();

    const newCoursesList = coursesList.filter((item) => item.id !== idToDel);

    dispatch(courses(newCoursesList));
    // метод из стора с запросом по id курса DELETE
    console.log('deleted');
  }, []);

  //

  const onUpdateCourse = useCallback((e) => {
    e.preventDefault();
    // метод из стора с запросом по id курса PUT
    console.log('updated');
  }, []);

  //

  const onShowCourse = useCallback((e, to) => {
    e.preventDefault();
    navigate(to);
    console.log('showed');
    // метод из стора с запросом по id курса GET {id}
  }, []);

  const addCallbackHandler = useCallback((func, url) => {
    return function (e) {
      func(e, url);
    };
  }, []);

  return (
    <li className={styles.li}>
      <div className={styles.descr}>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div className={styles.info}>
        <p>
          {' '}
          <b>Authors:</b> {authorsStr}
        </p>
        <p>
          <b>Duration:</b> {duration}
        </p>
        <p>
          <b>Created:</b> {creationDate}
        </p>
        <div>
          <Button
            text='Show course'
            callbackFunc={addCallbackHandler(onShowCourse, `/courses/${id}`)}
            // callbackFunc={useEffect(() => onShowCourse(`/courses/${id}`))}
            // callbackFunc={useEffect(() => navigate(`/courses/${id}`))}
          />
          <Button
            text='.'
            style={styles.btnUpdate}
            callbackFunc={onUpdateCourse}
          />
          <Button
            text='.'
            style={styles.btnDelete}
            callbackFunc={addCallbackHandler(onDeleteCourse, id)}
          />
        </div>
      </div>
    </li>
  );
};

export default CourseCard;
