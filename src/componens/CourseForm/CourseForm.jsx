import { useCallback, useReducer } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import pipeDuration from '../../helpers/pipeDuration';
import dateGeneration from '../../helpers/dateGeneration';
import reducer from './reducer';
import {
  title,
  name,
  description,
  duration,
  deleteAuthor,
  addAuthor,
  deleteName,
} from './actions';

import { addCourse } from '../../store/courses/actionCreators';
import { toAddAuthor } from '../../store/authors/actionCreators';
import {
  fetchCourseAdd,
  fetchAuthorAdd,
  fetchChangeCourse,
} from '../../servisces';

import styles from './CreateCourse.module.css';

const CourseForm = ({ mode }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  let { courseId } = useParams();

  const authorsList = useSelector((state) => state.authorsReducer.authors);
  const coursesList = useSelector((state) => state.coursesReducer.courses);
  console.log(mode);

  let stateInitUpdate = {};
  let courseToUpdate;
  let index;

  if (mode === 'update') {
    courseToUpdate = coursesList.find((course) => course.id === courseId);
    index = coursesList.indexOf(courseToUpdate);
    console.log('courseToUpdate', courseToUpdate);
    console.log(authorsList, index);

    const items = authorsList.filter((item) =>
      courseToUpdate.authors.includes(item.id)
    );

    stateInitUpdate = {
      id: courseToUpdate.id,
      name: '',
      duration: courseToUpdate.duration,
      description: courseToUpdate.description,
      title: courseToUpdate.title,
      idshki: courseToUpdate.authors,
      authorsOfCourse: items,
    };
  }

  const stateInitCreate = {
    name: '',
    duration: '',
    description: '',
    title: '',
    idshki: [],
    authorsOfCourse: [],
  };

  const stateInit = mode === 'update' ? stateInitUpdate : stateInitCreate;

  const [stateForNewCourse, dispatchLocal] = useReducer(reducer, stateInit);

  const isFormValid = useCallback(() => {
    return (
      stateForNewCourse.title.length >= 2 &&
      stateForNewCourse.description.length >= 2 &&
      stateForNewCourse.duration &&
      stateForNewCourse.idshki.length > 0
    );
  }, [stateForNewCourse]);

  const onCreateCourse = useCallback(
    async (e) => {
      e.preventDefault();
      if (isFormValid()) {
        const card = {
          // id: uuidv4(),
          title: stateForNewCourse.title,
          description: stateForNewCourse.description,
          creationDate: dateGeneration(),
          duration: +stateForNewCourse.duration,
          // duration: pipeDuration(stateForNewCourse.duration),
          authors: stateForNewCourse.idshki, // authorsOfCourse.map(x => x.id),
        };

        let resp = {};
        let newCoursesList = [];

        if (mode === 'update') {
          resp = await fetchChangeCourse(card, stateForNewCourse.id);
          console.log('fetch', resp);
          console.log(index);
          newCoursesList = [
            ...coursesList.slice(0, index),
            resp.result,
            ...coursesList.slice(index + 1),
          ];
        } else {
          resp = await fetchCourseAdd(card);
          console.log('fetch', resp);

          newCoursesList = [...coursesList, resp.result];
        }

        dispatch(addCourse(newCoursesList));
        console.log(coursesList);

        navigate('/courses');
      } else {
        alert('Please, fill in all fields');
      }
    },
    [stateForNewCourse, isFormValid, coursesList]
  );

  const onCreateAuthor = useCallback(
    async (e) => {
      e.preventDefault();
      if (stateForNewCourse.name.length >= 2) {
        const author = {
          // id: uuidv4(),
          name: stateForNewCourse.name,
        };

        const resp = await fetchAuthorAdd(author);
        console.log('author', resp.result);
        if (resp.successful) {
          const newAuthors = [...authorsList, resp.result];
          dispatch(toAddAuthor(newAuthors));
        }

        // dispatchLocal(deleteName()); // from value
      }
    },
    [stateForNewCourse.name, authorsList]
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

      dispatchLocal(addAuthor(arrIdshki, arrAuthorsCourse));
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
      const authors = data
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

      return authors;
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

      dispatchLocal(deleteAuthor(arridshki, arrAuthorsOfCourse));
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

  const onAddAuthorName = (e) => dispatchLocal(name(e));
  const onChangeDuration = (e) => {
    if (e.target.value.match(/^0/)) {
      e.value = null;
    } else {
      dispatchLocal(duration(e));
    }
  };
  const onChangeDescr = (e) => dispatchLocal(description(e));
  const onChangeTitle = (e) => dispatchLocal(title(e));

  const addCallbackHandler = useCallback((func) => {
    return function (e) {
      func(e);
    };
  }, []);

  // if (role) {
  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <Input
          placeholdetText='Enter title...'
          labelText='Title'
          onChange={onChangeTitle}
          defaultValue={stateForNewCourse.title}
        />
        <div className={styles.btnCreateCourse}>
          <Button
            text='Create course'
            callbackFunc={addCallbackHandler(onCreateCourse)}
          />
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
          defaultValue={stateForNewCourse.description}
        />
      </div>

      <div className={styles.wrapper}>
        <div className={styles.leftBlock}>
          <div className={styles.addAuthor}>
            <h4 className={styles.alSelfCenter}>Add author</h4>
            <Input
              placeholdetText='Enter author name...'
              onChange={onAddAuthorName}
              defaultValue={stateForNewCourse.name}
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
              defaultValue={stateForNewCourse.duration}
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
            <ul>{createAuthorsList(authorsList)}</ul>
          </section>

          <section>
            <h4 className={styles.textAlCenter}>Course authors</h4>
            <ul>{createCourseAuthorsList(authorsList)}</ul>
          </section>
        </div>
      </div>
    </main>
  );
  // }
};
export default CourseForm;
