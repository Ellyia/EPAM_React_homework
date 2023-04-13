import {
  ACTION_NAME,
  ACTION_DURATION,
  ACTION_DESCRIPTION,
  ACTION_TITLE,
  ACTION_DELETEAUTHOR,
  ACTION_ADDAUTHOR,
} from '../../constants';

function reducer(state, action) {
  switch (action.type) {
    case ACTION_NAME:
      return { ...state, name: action.value };

    case ACTION_DURATION: // this
      if (action.value.match(/^0/)) {
        action.value = null;
      } else {
        return { ...state, duration: action.value };
      }
      break; //

    case ACTION_DESCRIPTION:
      return { ...state, description: action.value };

    case ACTION_TITLE:
      return { ...state, title: action.value };

    case ACTION_DELETEAUTHOR: // this
      action.event.preventDefault();
      const arrAuthorsOfCourse = [...state.authorsOfCourse].filter(
        ({ id }) => id !== action.authorId
      );

      const arridshki = [...state.idshki].filter(
        (item) => item !== action.authorId
      ); //

      return {
        ...state,
        idshki: arridshki,
        authorsOfCourse: arrAuthorsOfCourse,
      };

    case ACTION_ADDAUTHOR: // this
      action.event.preventDefault();
      const arrAuthorsCourse = [...state.authorsOfCourse];
      const arrIdshki = [...state.idshki];

      action.allAuthors.map((item) => {
        if (item.id === action.authorId) {
          arrAuthorsCourse.push(item);
          arrIdshki.push(item.id);
        }
      }); //

      return {
        ...state,
        idshki: arrIdshki,
        authorsOfCourse: arrAuthorsCourse,
      };

    default:
      return state;
  }
}

export default reducer;
