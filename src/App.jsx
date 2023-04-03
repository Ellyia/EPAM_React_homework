import { Component } from 'react';
// import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Header from './componens/Header/Header';
import Courses from './componens/Courses/Courses';
import CreateCourse from './componens/CreateCourse/CreateCourse';
import { mockedCoursesList, mockedAuthorsList } from './constants';

import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mockedCoursesList: [...mockedCoursesList],

			mockedAuthorsList: [...mockedAuthorsList],

			searchPhrase: '',
			isAddCourse: false,
		};
	}

	// const [searchPhrase, setSearchPhrase] = useState('');
	// const [isAddCourse, setIsAddCourse] = useState(false);

	searchCourse = (items, searchPhrase) => {
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

	onUpdateSearch = (searchPhrase) => {
		this.setState({ searchPhrase });
	};

	coursesOrAddNewCourse = () => {
		this.setState(({ isAddCourse }) => ({ isAddCourse: !isAddCourse }));
		this.setState(({ searchPhrase }) => ({ searchPhrase: '' }));
	};

	onAddAuthor = (nameAuthor) => {
		const newAuthorsList = [
			...this.state.mockedAuthorsList,
			{
				id: uuidv4(),
				name: nameAuthor,
			},
		];

		this.setState({
			mockedAuthorsList: newAuthorsList,
		});
	};

	onAddCourse = (
		title,
		description,
		creationDate,
		duration,
		idshki,
		resetCCState
	) => {
		const newCoursesList = [
			...this.state.mockedCoursesList,
			{
				// переписать- логика формирования объекта курса должна быть внутри компоненты создания курса
				id: uuidv4(),
				title: title,
				description: description,
				creationDate: creationDate,
				duration: duration,
				authors: idshki,
			},
		];

		this.setState({
			mockedCoursesList: newCoursesList,
		});

		this.coursesOrAddNewCourse();
		resetCCState();
	};

	render() {
		const { searchPhrase, mockedCoursesList, mockedAuthorsList, isAddCourse } =
			this.state;
		const visibleCourses = this.searchCourse(mockedCoursesList, searchPhrase);

		return (
			<div className={'border border-info app'}>
				<Header name='Ella' />
				{isAddCourse ? (
					<CreateCourse
						mockedAuthorsList={mockedAuthorsList}
						onAddAuthor={this.onAddAuthor}
						callbackFunc={this.onAddCourse}
					/>
				) : (
					<Courses
						mockedCoursesList={visibleCourses}
						mockedAuthorsList={mockedAuthorsList}
						onUpdateSearch={this.onUpdateSearch}
						callbackFunc={this.coursesOrAddNewCourse}
					/>
				)}
			</div>
		);
	}
}

export default App;
