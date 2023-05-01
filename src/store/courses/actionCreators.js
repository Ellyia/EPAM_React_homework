import { ACTION_ADD_COURSE, ACTION_GET_COURSES } from './actionTypes';

export const courses = (data) => ({
  type: ACTION_GET_COURSES,
  payload: data,
});

export const addCourse = (data) => ({
  type: ACTION_ADD_COURSE,
  payload: data,
});
