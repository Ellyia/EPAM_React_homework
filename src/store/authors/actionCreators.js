import { ACTION_GET_AUTHORS, ACTION_ADD_AUTHORS } from './actionTypes';

export const fetchAuthors = (request) => (dispatch) => {
  request()
    .then((data) => dispatch(toLoadAuthors(data)))
    .catch((err) => console.log('err', err));
}; //

export const toLoadAuthors = (data) => ({
  type: ACTION_GET_AUTHORS,
  payload: data,
});

export const toAddAuthor = (data) => ({
  type: ACTION_ADD_AUTHORS,
  payload: data,
});
