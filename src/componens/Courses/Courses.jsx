import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';
// import { mockedCoursesList, mockedAuthorsList } from '../../constants';

const Courses = (props) => {
	const mockedCoursesList = props.mockedCoursesList;
	const mockedAuthorsList = props.mockedAuthorsList;
	const { searchCourse, callbackFunc } = props;

	const cards = mockedCoursesList.map((cardData) => {
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
				<SearchBar onUpdateSearch={props.onUpdateSearch} />
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
