import { useState, useContext } from 'react'; // context

import Header from './componens/Header/Header';
import Courses from './componens/Courses/Courses';
import CreateCourse from './componens/CreateCourse/CreateCourse';
import {
	mockedCoursesListContext,
	mockedAuthorsListContext,
} from './componens/Courses/Courses';

import './App.css';

const App = () => {
	const contextMockedCoursesListA = useContext(mockedCoursesListContext);
	const contextMockedAuthorsListA = useContext(mockedAuthorsListContext);

	const [mockedCoursesList, setMockedCoursesListA] = useState([
		...contextMockedCoursesListA.mockedCoursesList,
	]);

	const [mockedAuthorsList, setMockedAuthorsListA] = useState([
		...contextMockedAuthorsListA.mockedAuthorsList,
	]);

	const [isAddCourse, setIsAddCourse] = useState(false);

	const toggleIsAddCourse = () => {
		setIsAddCourse((isAddCourse) => (isAddCourse = !isAddCourse));
	};

	const onAddAuthor = (author) => {
		const newAuthorsList = [...mockedAuthorsList, author];

		setMockedAuthorsListA(
			(mockedAuthorsList) => (mockedAuthorsList = newAuthorsList)
		);
	};

	const onAddCourse = (course) => {
		const newCoursesList = [...mockedCoursesList, course];

		setMockedCoursesListA(
			(mockedCoursesList) => (mockedCoursesList = newCoursesList)
		);

		toggleIsAddCourse();
	};

	return (
		<div className={'app'}>
			<mockedCoursesListContext.Provider value={mockedCoursesList}>
				<mockedAuthorsListContext.Provider value={mockedAuthorsList}>
					<Header name='Ella' />
					{isAddCourse ? (
						<CreateCourse
							onAddAuthor={onAddAuthor}
							callbackFunc={onAddCourse}
						/>
					) : (
						<Courses callbackFunc={toggleIsAddCourse} />
					)}
				</mockedAuthorsListContext.Provider>
			</mockedCoursesListContext.Provider>
		</div>
	);
};

export default App;
