const coursesInitialState = []; // default value - empty array. After
// success getting courses from API - array of courses.

export default function coursesReducer(state = coursesInitialState, action) {
  switch (action.type) {
    case 'ADD_COURSES':
      return state.concat([action.courses]);
    default:
      return state;
  }
}
