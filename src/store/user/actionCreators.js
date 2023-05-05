import { LOGIN, LOGOUT, USERS_ME } from './actionTypes';

export const addUser = (data) => ({
  type: LOGIN,
  payload: data,
});

export const logout = () => ({
  type: LOGOUT,
});

export const usersMe = (data) => ({
  type: USERS_ME,
  payload: data,
});
