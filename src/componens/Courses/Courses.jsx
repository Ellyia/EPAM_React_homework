import { useState, useContext } from 'react';

import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';
import {
	mockedCoursesListContext,
	mockedAuthorsListContext,
} from '../../constants'; // context

const Courses = (props) => {
	const mockedCoursesList = useContext(mockedCoursesListContext); // context подписка
	const mockedAuthorsList = useContext(mockedAuthorsListContext); // context

	// const mockedCoursesList = props.mockedCoursesList;
	// const mockedAuthorsList = props.mockedAuthorsList;
	const { callbackFunc } = props;

	const [searchPhrase, setSearchPhrase] = useState('');

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
		setSearchPhrase(searchPhrase);
	};

	const visibleCourses = searchCourse(mockedCoursesList, searchPhrase);

	const cards = visibleCourses.map((cardData) => {
		const { id, ...cardProps } = cardData;
		const authors = cardProps.authors;

		let authorsArr = [];

		authors.map((item) => {
			mockedAuthorsList.map((elem) => {
				// use filter
				if (elem.id && item === elem.id) {
					authorsArr.push(elem.name);
				}
			});
		});

		let authorsStr = authorsArr.join(', ');

		return (
			<CourseCard key={id} cardProps={cardProps} authorsStr={authorsStr} />
		);
	});

	return (
		<ul
			style={{ margin: 10, padding: 20, backgroundColor: 'white' }}
			className={'border border-info rounded'}
		>
			<div
				className={'d-flex justify-content-between'}
				style={{ margin: 10, marginTop: 0 }}
			>
				<SearchBar onUpdateSearch={onUpdateSearch} />
				<Button
					text={'Add new course'}
					callbackFunc={(e) => {
						e.preventDefault();
						callbackFunc();
					}}
				/>
			</div>
			{cards}
		</ul>
	);
};

export default Courses;
