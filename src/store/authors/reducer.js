import { ACTION_ADD_AUTHORS, ACTION_GET_AUTHORS } from './actionTypes';

const authorsInitialState = [];

const authorsReducer = (state = authorsInitialState, action) => {
  switch (action.type) {
    case ACTION_GET_AUTHORS:
      return { ...state, authors: action.payload };
    case ACTION_ADD_AUTHORS:
      return { ...state, authors: action.payload };
    default:
      return state;
  }
};

export default authorsReducer;
