import { useContext, useCallback, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import pipeDuration from '../../helpers/pipeDuration';
import dateGeneration from '../../helpers/dateGeneration';
import { mockedListsContext } from '../../context';
import reducer from './reducer';
import {
  ACTION_NAME,
  ACTION_DURATION,
  ACTION_DESCRIPTION,
  ACTION_TITLE,
  ACTION_DELETEAUTHOR,
  ACTION_ADDAUTHOR,
} from '../../constants';

import styles from './CreateCourse.module.css';

const CreateCourse = ({ callbackFunc, onAddAuthor }) => {
  const mockedLists = useContext(mockedListsContext);

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

  const onCreateCourse = useCallback(
    (e) => {
      e.preventDefault();

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
      } else {
        alert('Please, fill in all fields');
      }
    },
    [isFormValid, callbackFunc, stateForNewCourse]
  );

  const onCreateAuthor = useCallback(
    (e) => {
      e.preventDefault();
      if (stateForNewCourse.name.length >= 2) {
        const author = {
          id: uuidv4(),
          name: stateForNewCourse.name,
        };
        onAddAuthor(author);
      }
    },
    [stateForNewCourse.name, onAddAuthor]
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
                  callbackFunc={(e) =>
                    dispatch({
                      type: ACTION_ADDAUTHOR,
                      event: e,
                      authorId: id,
                      allAuthors: data,
                    })
                  }
                />
              </li>
            );
          }
        })
        .filter(Boolean); // (x => !!x)

      return authorsList;
    },
    [stateForNewCourse.idshki]
  );

  const createCourseAuthorsList = useCallback(
    (data) => {
      if (stateForNewCourse.authorsOfCourse.length !== 0) {
        const list = stateForNewCourse.authorsOfCourse.map(({ id, name }) => {
          return (
            <li key={id} className={styles.li}>
              <p className={styles.author}>{name}</p>
              <Button
                text='Delete author'
                callbackFunc={(e) =>
                  dispatch({
                    type: ACTION_DELETEAUTHOR,
                    event: e,
                    authorId: id,
                  })
                }
              />
            </li>
          );
        });

        return list;
      } else {
        return <p>Author list is empty</p>;
      }
    },
    [stateForNewCourse.authorsOfCourse]
  );

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <Input
          placeholdetText='Enter title...'
          labelText='Title'
          onChange={(e) =>
            dispatch({ type: ACTION_TITLE, value: e.target.value })
          }
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
          onChange={(e) =>
            dispatch({ type: ACTION_DESCRIPTION, value: e.target.value })
          }
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
              onChange={(e) =>
                dispatch({ type: ACTION_NAME, value: e.target.value })
              }
              value={stateForNewCourse.name}
              minLength={2}
              htmlFor='authorName'
              labelText='Author name'
            />
            <div className={styles.authorBtn}>
              <Button
                text='Create author'
                callbackFunc={(e) => onCreateAuthor(e)}
              />
            </div>
          </div>

          <div className={styles.duration}>
            <h4 className={styles.alSelfCenter}>Duration</h4>
            <Input
              placeholdetText='Enter duration in minutes...'
              onChange={(e) =>
                dispatch({ type: ACTION_DURATION, value: e.target.value })
              }
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

export default CreateCourse;
