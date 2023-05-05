import { combineReducers, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import ReduxThunk from 'redux-thunk';

import authorsReducer from './authors/reducer';
import coursesReducer from './courses/reducer';
import userReducer from './user/reducer';

const reducer = combineReducers({
  authorsReducer,
  coursesReducer,
  userReducer,
});

const stringMiddleware = () => (dispatch) => (action) => {
  if (typeof action === 'string') {
    return dispatch({
      type: action,
    });
  }
  return dispatch(action);
};

// const enhanser =
//   (configureStore) =>
//   (...args) => {
//     const store = configureStore(...args);

//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//       if (typeof action === 'string') {
//         return oldDispatch({
//           type: action,
//         });
//       }
//       return oldDispatch(action);
//     };
//     return store;
//   };

// const store = configureStore({ reducer }, enhanser);
const store = configureStore({ reducer }, applyMiddleware(ReduxThunk, stringMiddleware));

export default store;
