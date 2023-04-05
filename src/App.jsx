import { useState } from 'react';

import Header from './componens/Header/Header';
import Courses from './componens/Courses/Courses';
import CreateCourse from './componens/CreateCourse/CreateCourse';
import { mockedCoursesList, mockedAuthorsList } from './constants';

import './App.css';

const App = () => {
	const [mockedCoursesListA, setMockedCoursesListA] = useState([
		...mockedCoursesList,
	]);

	const [mockedAuthorsListA, setMockedAuthorsListA] = useState([
		...mockedAuthorsList,
	]);

	const [isAddCourse, setIsAddCourse] = useState(false);

	const toggleIsAddCourse = () => {
		setIsAddCourse((isAddCourse) => (isAddCourse = !isAddCourse));
	};

	const onAddAuthor = (author) => {
		const newAuthorsList = [...mockedAuthorsListA, author];

		setMockedAuthorsListA(
			(mockedAuthorsListA) => (mockedAuthorsListA = newAuthorsList)
		);
	};

	const onAddCourse = (course) => {
		const newCoursesList = [...mockedCoursesListA, course];

		setMockedCoursesListA(
			(mockedCoursesListA) => (mockedCoursesListA = newCoursesList)
		);

		toggleIsAddCourse();
	};

	return (
		<div className={'app'}>
			<Header name='Ella' />
			{isAddCourse ? (
				<CreateCourse
					mockedAuthorsList={mockedAuthorsListA}
					onAddAuthor={onAddAuthor}
					callbackFunc={onAddCourse}
				/>
			) : (
				<Courses
					mockedCoursesList={mockedCoursesListA}
					mockedAuthorsList={mockedAuthorsListA}
					callbackFunc={toggleIsAddCourse}
				/>
			)}
		</div>
	);
};

export default App;
