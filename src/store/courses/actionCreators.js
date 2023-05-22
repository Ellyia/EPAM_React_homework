import { ACTION_ADD_COURSE, ACTION_GET_COURSES } from './actionTypes';

export const fetchCourses = (request) => (dispatch) => {
  request('http://localhost:4000/courses/all')
    .then((data) => dispatch(toLoadCourses(data)))
    .catch((err) => console.log('err', err));
};

export const toLoadCourses = (data) => ({
  type: ACTION_GET_COURSES,
  payload: data,
});

export const addCourse = (data) => ({
  type: ACTION_ADD_COURSE,
  payload: data,
});
