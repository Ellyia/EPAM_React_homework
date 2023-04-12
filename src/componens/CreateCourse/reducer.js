function reducer(state, action) {
	switch (action.type) {
		case 'name':
			return { ...state, name: action.value };

		case 'duration':
			if (action.value.match(/^0/)) {
				action.value = null;
			} else {
				return { ...state, duration: action.value };
			}
			break;

		case 'description':
			return { ...state, description: action.value };

		case 'title':
			return { ...state, title: action.value };

		case 'deleteAuthor':
			action.event.preventDefault(); // is it a good idea to call preventDefault here before dispatch?
			const arrAuthorsOfCourse = [...state.authorsOfCourse].filter(
				({ id }) => id !== action.authorId
			);

			const arridshki = [...state.idshki].filter(
				(item) => item !== action.authorId
			);

			return {
				...state,
				idshki: arridshki,
				authorsOfCourse: arrAuthorsOfCourse,
			};

		case 'addAuthor':
			action.event.preventDefault(); // is it a good idea to call preventDefault here before dispatch?
			const arrAuthorsCourse = [...state.authorsOfCourse];
			const arrIdshki = [...state.idshki];

			action.allAuthors.filter((item) => {
				if (item.id === action.authorId) {
					arrAuthorsCourse.push(item);
					arrIdshki.push(item.id);
				}
			});

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
