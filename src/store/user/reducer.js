import { LOGIN, LOGOUT } from './actionTypes';

const userInitialState = {
  isAuth: false,
  name: '',
  email: '',
  token: '',
};

export default function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuth: true,
        token: action.payload.result,
        email: action.payload.user.email,
        name: action.payload.user.name,
      };
    case LOGOUT:
      return {
        ...state,
        isAuth: false,
        token: '',
        email: '',
        name: '',
      };
    default:
      return state;
  }
}
