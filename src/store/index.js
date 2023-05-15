import { configureStore } from '@reduxjs/toolkit';

import authorsReducer from './authors/reducer';
import coursesReducer from './courses/reducer';
import userReducer from './user/reducer';

const stringMiddleware = () => (dispatch) => (action) => {
  if (typeof action === 'string') {
    return dispatch({
      type: action,
    });
  }
  return dispatch(action);
};

const store = configureStore({
  reducer: {
    authorsReducer,
    coursesReducer,
    userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
