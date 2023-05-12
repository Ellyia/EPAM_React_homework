import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
//import thunk from 'redux-thunk';

import authorsReducer from './authors/reducer';
import coursesReducer from './courses/reducer';
import userReducer from './user/reducer';

const reducer = combineReducers({
  authorsReducer,
  coursesReducer,
  userReducer,
});

const store = configureStore({ reducer });

export default store;
