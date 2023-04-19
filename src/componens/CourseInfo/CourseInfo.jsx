import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

import { mockedListsContext } from '../../context';

const CourseInfo = () => {
  const mockedLists = useContext(mockedListsContext);
  let { courseId } = useParams();

  const course = mockedLists.mockedCoursesList.find(
    (course) => course.id === courseId
  );
  console.log(course);

  return (
    <div className='styles.CourseInfo'>
      <Link to='/courses'>{'<'} Back to courses</Link>
      <h3>{course.title}</h3>

      <div className='description-container'>
        <div className='container-description'>
          <p> {course.description}</p>
        </div>
        <div className='container-info'>
          <p>ID: {course.id}</p>
          <p>Duration: {course.duration}</p>
          <p>Created: {course.creationDate}</p>
          <p>Authors: {course.authors}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
