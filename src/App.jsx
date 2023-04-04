import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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

	const [searchPhrase, setSearchPhrase] = useState('');
	const [isAddCourse, setIsAddCourse] = useState(false);

	const searchCourse = (items, searchPhrase) => {
		if (searchPhrase?.length === 0) {
			return items;
		}

		return items.filter((el) => {
			const elem = { ...el };
			const elName = elem.title.toString().toLowerCase();
			const elId = elem.id;
			const termLC = searchPhrase.toString().toLowerCase();
			return elName.indexOf(termLC) > -1 || elId.indexOf(termLC) > -1;
		});
	};

	const onUpdateSearch = (searchPhrase) => {
		setSearchPhrase(searchPhrase); // ? чи важливе минуле значення ?
	};

	const coursesOrAddNewCourse = () => {
		setIsAddCourse((isAddCourse) => (isAddCourse = !isAddCourse));
		setSearchPhrase((searchPhrase) => (searchPhrase = '')); // чи так записується із минулим значенням ?
	};

	const onAddAuthor = (nameAuthor) => {
		const newAuthorsList = [
			...mockedAuthorsListA,
			{
				id: uuidv4(),
				name: nameAuthor,
			},
		];

		setMockedAuthorsListA(
			(mockedAuthorsListA) => (mockedAuthorsListA = newAuthorsList)
		);
	};

	const onAddCourse = (
		title,
		description,
		creationDate,
		duration,
		idshki,
		resetCCState
	) => {
		const newCoursesList = [
			...mockedCoursesListA,
			{
				// переписать - логика формирования объекта курса должна быть внутри компоненты создания курса
				id: uuidv4(),
				title: title,
				description: description,
				creationDate: creationDate,
				duration: duration,
				authors: idshki,
			},
		];

		setMockedCoursesListA(
			(mockedCoursesListA) => (mockedCoursesListA = newCoursesList)
		);

		coursesOrAddNewCourse();
		resetCCState();
	};

	const visibleCourses = searchCourse(mockedCoursesListA, searchPhrase);

	return (
		<div className={'border border-info app'}>
			<Header name='Ella' />
			{isAddCourse ? (
				<CreateCourse
					mockedAuthorsList={mockedAuthorsListA}
					onAddAuthor={onAddAuthor}
					callbackFunc={onAddCourse}
				/>
			) : (
				<Courses
					mockedCoursesList={visibleCourses}
					mockedAuthorsList={mockedAuthorsListA}
					onUpdateSearch={onUpdateSearch}
					callbackFunc={coursesOrAddNewCourse}
				/>
			)}
		</div>
	);
};

export default App;
