import { LOGIN, LOGOUT, USERS_ME } from './actionTypes';

const userInitialState = {
  isAuth: false,
  name: '',
  email: '',
  token: '',
  role: '',
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
        role: '',
      };
    case USERS_ME:
      return {
        ...state,
        isAuth: true,
        email: action.payload.email,
        name: action.payload.name,
        role: action.payload.role,
      };
    default:
      return state;
  }
}
