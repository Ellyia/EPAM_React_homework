import { LOGIN, LOGOUT } from './actionTypes';

export const addUser = (data) => ({
  type: LOGIN,
  payload: data,
});

export const logout = (data) => ({
  type: LOGOUT,
});
