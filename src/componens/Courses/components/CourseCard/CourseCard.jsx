import { useNavigate } from 'react-router-dom';

import Button from '../../../../common/Button/Button';

import styles from './CourseCard.module.css';

const CourseCard = ({ cardProps, authorsStr, id }) => {
  const { title, description, duration, creationDate } = cardProps;

  let navigate = useNavigate();

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
        <Button
          text='Show course'
          callbackFunc={() => navigate(`/courses/${id}`)}
        />
      </div>
    </li>
  );
};

export default CourseCard;
