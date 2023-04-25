// const authorsInitialState = []; // default value - empty array. After
// success getting authors from API - array of authors.

const authorsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_AUTHORS':
      return state.concat([action.authors]);
    default:
      return state;
  }
};

export default authorsReducer;
