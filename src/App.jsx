import { useState, useContext } from 'react'; // context

import Header from './componens/Header/Header';
import Courses from './componens/Courses/Courses';
import CreateCourse from './componens/CreateCourse/CreateCourse';
import {
	mockedCoursesListContext,
	mockedAuthorsListContext,
} from './constants';

import './App.css';

const { Provider } = mockedCoursesListContext;

const App = () => {
	const contextMockedCoursesListA = useContext(mockedCoursesListContext); // context подписка
	const contextMockedAuthorsListA = useContext(mockedAuthorsListContext); // context подписка

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
			<Provider value={mockedCoursesList}>
				<mockedAuthorsListContext.Provider value={mockedAuthorsList}>
					<Header name='Ella' />
					{isAddCourse ? (
						<CreateCourse
							// mockedAuthorsList={mockedAuthorsListA}
							onAddAuthor={onAddAuthor}
							callbackFunc={onAddCourse}
						/>
					) : (
						<Courses
							// mockedCoursesList={mockedCoursesListA}
							// mockedAuthorsList={mockedAuthorsListA}
							callbackFunc={toggleIsAddCourse}
						/>
					)}
				</mockedAuthorsListContext.Provider>
			</Provider>
		</div>
	);
};

export default App;
