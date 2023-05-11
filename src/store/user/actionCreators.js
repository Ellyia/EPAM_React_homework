import { LOGIN, LOGOUT, USERS_ME } from './actionTypes';

// export const actionLogout = (request) => (dispatch) => {
//   request()
//     .then((data) => {
//       if (data.ok) {
//         dispatch(logout());
//       }
//     })
//     .catch((err) => console.log('err', err));
// }; // doesn't work

export const addUser = (data) => ({
  type: LOGIN,
  payload: data,
});

export const logout = () => ({
  type: LOGOUT,
});

export const actionUsersMe = (request) => (dispatch) => {
  request()
    .then((data) => {
      if (data.successful) {
        dispatch(usersMe(data.result));
      }
    })
    .catch((err) => console.log('err', err));
};

export const usersMe = (data) => ({
  type: USERS_ME,
  payload: data,
});
