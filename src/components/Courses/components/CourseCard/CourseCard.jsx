import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; //

import Button from '../../../../common/Button/Button';

import { toLoadCourses } from '../../../../store/courses/actionCreators';
import { getCourses, getUser } from '../../../../store/selectors';
import { fetchCourseDelete } from '../../../../servisces';

import styles from './CourseCard.module.css';

const CourseCard = ({ cardProps, authorsStr, id }) => {
  const { title, description, duration, creationDate } = cardProps;

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const coursesList = useSelector(getCourses);
  const user = useSelector(getUser);

  const onDeleteCourse = useCallback(
    async (e, idToDel) => {
      e.preventDefault();
      const resp = await fetchCourseDelete(idToDel);

      if (resp.successful) {
        const newCoursesList = coursesList.filter(
          (item) => item.id !== idToDel
        );
        dispatch(toLoadCourses(newCoursesList));
      }
    },
    [coursesList]
  );

  const onUpdateCourse = useCallback((e, to) => {
    e.preventDefault();
    navigate(to);
  }, []);

  const onShowCourse = useCallback((e, to) => {
    e.preventDefault();
    navigate(to);
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
          />
          {user.role === 'admin' ? (
            <>
              <Button
                text='.'
                style={styles.btnUpdate}
                callbackFunc={addCallbackHandler(
                  onUpdateCourse,
                  `/courses/update/${id}`
                )}
              />
              <Button
                text='.'
                style={styles.btnDelete}
                callbackFunc={addCallbackHandler(onDeleteCourse, id)}
              />
            </>
          ) : null}
        </div>
      </div>
    </li>
  );
};

export default CourseCard;
