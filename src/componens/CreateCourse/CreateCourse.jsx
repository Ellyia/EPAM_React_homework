import { useContext, useCallback, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import pipeDuration from '../../helpers/pipeDuration';
import dateGeneration from '../../helpers/dateGeneration';
import { mockedListsContext } from '../../context';
import reducer from './reducer';
import {
  title,
  name,
  description,
  duration,
  deleteAuthor,
  addAuthor,
} from './actions';

import styles from './CreateCourse.module.css';

const CreateCourse = ({ callbackFunc, addAuthorToAuthorsList }) => {
  const mockedLists = useContext(mockedListsContext);

  let navigate = useNavigate();

  const stateInit = {
    name: '',
    duration: '',
    description: '',
    title: '',
    idshki: [],
    authorsOfCourse: [],
  };

  const [stateForNewCourse, dispatch] = useReducer(reducer, stateInit);

  const isFormValid = useCallback(() => {
    return (
      stateForNewCourse.title.length >= 2 &&
      stateForNewCourse.description.length >= 2 &&
      stateForNewCourse.duration &&
      stateForNewCourse.idshki.length > 0
    );
  }, [stateForNewCourse]);

  const onCreateCourse = useCallback(() => {
    if (isFormValid()) {
      const card = {
        id: uuidv4(),
        title: stateForNewCourse.title,
        description: stateForNewCourse.description,
        creationDate: dateGeneration(),
        duration: pipeDuration(stateForNewCourse.duration),
        authors: stateForNewCourse.idshki, // authorsOfCourse.map(x => x.id),
      };

      callbackFunc(card);

      navigate('/courses');
    } else {
      alert('Please, fill in all fields');
    }
  }, [isFormValid, callbackFunc, stateForNewCourse, navigate]);

  const onCreateAuthor = useCallback(
    (e) => {
      e.preventDefault();
      if (stateForNewCourse.name.length >= 2) {
        const author = {
          id: uuidv4(),
          name: stateForNewCourse.name,
        };
        addAuthorToAuthorsList(author);
      }
    },
    [stateForNewCourse.name, addAuthorToAuthorsList]
  );

  const onAddAuthor = useCallback(
    (e, authorId, allAuthors) => {
      e.preventDefault();
      const arrAuthorsCourse = [...stateForNewCourse.authorsOfCourse];
      const arrIdshki = [...stateForNewCourse.idshki];

      allAuthors.map((item) => {
        if (item.id === authorId) {
          arrAuthorsCourse.push(item);
          arrIdshki.push(item.id);
        }
      });

      dispatch(addAuthor(arrIdshki, arrAuthorsCourse));
    },
    [stateForNewCourse.authorsOfCourse, stateForNewCourse.idshki]
  );

  const addAuthorHandler = useCallback(
    (id, allAuthors) => {
      return function (e) {
        onAddAuthor(e, id, allAuthors);
      };
    },
    [onAddAuthor]
  );

  const createAuthorsList = useCallback(
    (data) => {
      const authorsList = data
        .map(({ id, name }) => {
          const isInclude = stateForNewCourse.idshki.some(
            (item) => item === id
          );
          if (!isInclude) {
            return (
              <li key={id} className={styles.li}>
                <p className={styles.author}>{name}</p>
                <Button
                  text='Add author'
                  callbackFunc={addAuthorHandler(id, data)}
                />
              </li>
            );
          }
        })
        .filter(Boolean); // (x => !!x)

      return authorsList;
    },
    [stateForNewCourse.idshki, addAuthorHandler]
  );

  const onDeleteAuthor = useCallback(
    (e, authorId) => {
      e.preventDefault();
      const arrAuthorsOfCourse = [...stateForNewCourse.authorsOfCourse].filter(
        ({ id }) => id !== authorId
      );

      const arridshki = [...stateForNewCourse.idshki].filter(
        (item) => item !== authorId
      );

      dispatch(deleteAuthor(arridshki, arrAuthorsOfCourse));
    },
    [stateForNewCourse.authorsOfCourse, stateForNewCourse.idshki]
  );

  const deleteAuthorHandler = useCallback(
    (id) => {
      return function (e) {
        onDeleteAuthor(e, id);
      };
    },
    [onDeleteAuthor]
  );

  const createCourseAuthorsList = useCallback(() => {
    if (stateForNewCourse.authorsOfCourse.length !== 0) {
      const list = stateForNewCourse.authorsOfCourse.map(({ id, name }) => {
        return (
          <li key={id} className={styles.li}>
            <p className={styles.author}>{name}</p>
            <Button
              text='Delete author'
              callbackFunc={deleteAuthorHandler(id)}
            />
          </li>
        );
      });

      return list;
    } else {
      return <p>Author list is empty</p>;
    }
  }, [stateForNewCourse.authorsOfCourse, deleteAuthorHandler]);

  const onAddAuthorName = (e) => dispatch(name(e));
  const onChangeDuration = (e) => {
    if (e.target.value.match(/^0/)) {
      e.value = null;
    } else {
      dispatch(duration(e));
    }
  };
  const onChangeDescr = (e) => dispatch(description(e));
  const onChangeTitle = (e) => dispatch(title(e));

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <Input
          placeholdetText='Enter title...'
          labelText='Title'
          onChange={onChangeTitle}
        />
        <div className={styles.btnCreateCourse}>
          <Button text='Create course' callbackFunc={onCreateCourse} />
        </div>
      </div>

      <div className={styles.descr}>
        <label htmlFor='description'>Description</label>
        <textarea
          className={styles.textarea}
          placeholder='Enter description'
          onChange={onChangeDescr}
          id='description'
          minLength='2'
        />
      </div>

      <div className={styles.wrapper}>
        <div className={styles.leftBlock}>
          <div className={styles.addAuthor}>
            <h4 className={styles.alSelfCenter}>Add author</h4>
            <Input
              placeholdetText='Enter author name...'
              onChange={onAddAuthorName}
              value={stateForNewCourse.name}
              minLength={2}
              htmlFor='authorName'
              labelText='Author name'
            />
            <div className={styles.authorBtn}>
              <Button text='Create author' callbackFunc={onCreateAuthor} />
            </div>
          </div>

          <div className={styles.duration}>
            <h4 className={styles.alSelfCenter}>Duration</h4>
            <Input
              placeholdetText='Enter duration in minutes...'
              onChange={onChangeDuration}
              value={stateForNewCourse.duration}
              htmlFor='duration'
              labelText='Duration'
              type='number' // вводится +
            />
            <p>
              Duration: {pipeDuration(stateForNewCourse.duration, '00:00')}{' '}
              hours
            </p>
          </div>
        </div>

        <div className={styles.authors}>
          <section>
            <h4 className={styles.textAlCenter}>Authors</h4>
            <ul>{createAuthorsList(mockedLists.mockedAuthorsList)}</ul>
          </section>

          <section>
            <h4 className={styles.textAlCenter}>Course authors</h4>
            <ul>{createCourseAuthorsList(mockedLists.mockedAuthorsList)}</ul>
          </section>
        </div>
      </div>
    </main>
  );
};
// mockedLists.mockedAuthorsList - а  мне нужно это передавать?
export default CreateCourse;
