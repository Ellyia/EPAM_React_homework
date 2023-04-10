import { useState, useContext, createContext } from 'react';

import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';

import styles from './Courses.module.css';

export const mockedCoursesListContext = createContext({
	mockedCoursesList: [...mockedCoursesList],
});

export const mockedAuthorsListContext = createContext({
	mockedAuthorsList: [...mockedAuthorsList],
});

const Courses = ({ callbackFunc }) => {
	const mockedCoursesList = useContext(mockedCoursesListContext);
	const mockedAuthorsList = useContext(mockedAuthorsListContext);

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

		let authorsStr = mockedAuthorsList
			.filter((author) => authors.includes(author.id))
			.map((x) => x.name)
			.join(', ');

		return (
			<CourseCard key={id} cardProps={cardProps} authorsStr={authorsStr} />
		);
	});

	return (
		<ul className={styles.main}>
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
