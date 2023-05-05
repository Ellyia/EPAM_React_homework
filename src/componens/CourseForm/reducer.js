import {
  ACTION_NAME,
  ACTION_DEL_NAME,
  ACTION_DURATION,
  ACTION_DESCRIPTION,
  ACTION_TITLE,
  ACTION_DELETEAUTHOR,
  ACTION_ADDAUTHOR,
} from '../../constants';

function reducer(state, action) {
  switch (action.type) {
    case ACTION_NAME:
      return { ...state, name: action.payload };

    case ACTION_DEL_NAME:
      return { ...state, name: '' };

    case ACTION_DURATION:
      return { ...state, duration: action.payload };

    case ACTION_DESCRIPTION:
      return { ...state, description: action.payload };

    case ACTION_TITLE:
      return { ...state, title: action.payload };

    case ACTION_DELETEAUTHOR:
      return {
        ...state,
        idshki: action.payload.arrid,
        authorsOfCourse: action.payload.arrCourseAuthors,
      };

    case ACTION_ADDAUTHOR:
      return {
        ...state,
        idshki: action.payload.arrid,
        authorsOfCourse: action.payload.arrCourseAuthors,
      };

    default:
      return state;
  }
}

export default reducer;
