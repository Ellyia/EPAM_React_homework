import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import { getCourses, getAuthors } from '../../store/selectors';

import styles from './CourseInfo.module.css';

const CourseInfo = () => {
  let { courseId } = useParams();
  const coursesList = useSelector(getCourses);
  const course = coursesList.find((course) => course.id === courseId);
  const allAuthors = useSelector(getAuthors);

  const authors = course.authors
    .map((i) => {
      const author = allAuthors.find((a) => a.id === i);
      return author ? author.name : null;
    })
    .join(', ');

  return (
    <div className={styles.info}>
      <Link className={styles.link} to='/courses'>
        {'<'} Back to courses
      </Link>
      <h3 className={styles.title}>{course.title}</h3>

      <div className={styles.container}>
        <div className={styles.description}>
          <p> {course.description}</p>
        </div>
        <div className='container-info'>
          <p>
            <b>ID:</b> {course.id}
          </p>
          <p>
            <b>Duration:</b> {course.duration}
          </p>
          <p>
            <b>Created:</b> {course.creationDate}
          </p>
          <p>
            <b>Authors:</b> {authors}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
