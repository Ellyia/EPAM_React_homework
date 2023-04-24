import Button from '../../../../common/Button/Button';

import styles from './CourseCard.module.css';

const CourseCard = ({ cardProps, authorsStr }) => {
  const { title, description, duration, creationDate } = cardProps;

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
        <Button text='Show course' />
      </div>
    </li>
  );
};

export default CourseCard;
