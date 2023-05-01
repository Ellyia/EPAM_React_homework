import { ACTION_ADD_COURSE, ACTION_GET_COURSES } from './actionTypes';

const coursesInitialState = [];

export default function coursesReducer(state = coursesInitialState, action) {
  switch (action.type) {
    case ACTION_GET_COURSES:
      return { ...state, courses: action.payload };
    case ACTION_ADD_COURSE:
      return { ...state, courses: action.payload };
    default:
      return state;
  }
}
