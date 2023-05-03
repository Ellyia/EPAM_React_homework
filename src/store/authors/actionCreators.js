import { ACTION_GET_AUTHORS, ACTION_ADD_AUTHORS } from './actionTypes';

export const toLoadAuthors = (data) => ({
  type: ACTION_GET_AUTHORS,
  payload: data,
});

export const toAddAuthor = (data) => ({
  type: ACTION_ADD_AUTHORS,
  payload: data,
});
