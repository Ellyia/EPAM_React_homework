import {
  ACTION_NAME,
  ACTION_DEL_NAME,
  ACTION_DURATION,
  ACTION_DESCRIPTION,
  ACTION_TITLE,
  ACTION_DELETEAUTHOR,
  ACTION_ADDAUTHOR,
} from '../../constants';

export const title = (e) => ({ type: ACTION_TITLE, payload: e.target.value });

export const description = (e) => ({
  type: ACTION_DESCRIPTION,
  payload: e.target.value,
});

export const duration = (e) => ({
  type: ACTION_DURATION,
  payload: +e.target.value,
});

export const name = (e) => ({ type: ACTION_NAME, payload: e.target.value });

export const deleteName = () => ({ type: ACTION_DEL_NAME });

export const deleteAuthor = (arridshki, arrAuthorsOfCourse) => ({
  type: ACTION_DELETEAUTHOR,
  payload: {
    arrid: arridshki,
    arrCourseAuthors: arrAuthorsOfCourse,
  },
});

export const addAuthor = (arrIdshki, arrAuthorsCourse) => ({
  type: ACTION_ADDAUTHOR,
  payload: {
    arrid: arrIdshki,
    arrCourseAuthors: arrAuthorsCourse,
  },
});
