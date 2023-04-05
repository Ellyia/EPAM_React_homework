import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import pipeDuration from '../../helpers/pipeDuration';
import dateGeneration from '../../helpers/dateGeneration';

const CreateCourse = (props) => {
	const [name, setName] = useState('');
	const [duration, setDuration] = useState('');
	const [description, setDescription] = useState('');
	const [title, setTitle] = useState('');
	const [idshki, setIdshki] = useState([]);
	const [authorsOfCourse, setAuthorsOfCourse] = useState([]);

	const resetCCState = () => {
		setName('');
		setDuration('');
		setDescription('');
		setTitle('');
		setIdshki([]);
		setAuthorsOfCourse([]);
	};

	const isFormValid = () => {
		return (
			title.length >= 2 &&
			description.length >= 2 &&
			duration &&
			idshki.length > 0
		);
	};

	const onCreateCourse = (e) => {
		e.preventDefault();

		if (isFormValid()) {
			const card = {
				id: uuidv4(),
				title: title,
				description: description,
				creationDate: dateGeneration(),
				duration: pipeDuration(duration),
				authors: idshki,
			};

			resetCCState();

			props.callbackFunc(card);
		} else {
			alert('Please, fill in all fields');
		}
	};

	const addAuthorToCourseFromAutorsList = (etId, arr) => {
		const autorsList = arr.filter((item) => {
			if (item.id === etId) {
				const arrAuthorsOfCourse = [...authorsOfCourse, item];
				const arridshki = [...idshki, etId];

				setIdshki(arridshki);
				setAuthorsOfCourse(arrAuthorsOfCourse);

				return item;
			}
		});

		return autorsList;
	};

	const deletAuthorFromCourseAuthors = (etId) => {
		const arrAuthorsOfCourse = [...authorsOfCourse].filter(
			({ id }) => id !== etId
		);

		const arridshki = [...idshki].filter((item) => item !== etId);

		setIdshki(arridshki);
		setAuthorsOfCourse(arrAuthorsOfCourse);
	};

	const onChangeNameInput = (e) => {
		const name = e.target.value;
		setName(name);
	};

	const onChangeDurationInput = (e) => {
		if (e.target.value.match(/^0/)) {
			e.target.value = null;
		} else {
			const duration = e.target.value;
			setDuration(duration);
		}
	};

	const onChangeTitleInput = (e) => {
		const title = e.target.value;
		setTitle(title);
	};

	const onChangeDescrInput = (e) => {
		const description = e.target.value;
		setDescription(description);
	};

	const createAuthor = (name) => {
		if (name.length >= 2) {
			const author = {
				id: uuidv4(),
				name: name,
			};
			props.onAddAuthor(author);
		}
	};

	const createAuthorsList = (data) => {
		const authorsList = data
			.map(({ id, name }) => {
				const isInclude = idshki.some((item) => item === id);
				if (!isInclude) {
					return (
						<li key={id} className={'d-flex'}>
							<p style={{ width: '60%' }}>{name}</p>
							<Button
								text='Add author'
								callbackFunc={(e) => {
									e.preventDefault();
									addAuthorToCourseFromAutorsList(id, data);
								}}
							/>
						</li>
					);
				}
			})
			.filter(Boolean); // (x => !!x)

		return authorsList;
	};

	const createCourseAuthorsList = (data) => {
		if (authorsOfCourse.length !== 0) {
			const list = authorsOfCourse.map(({ id, name }) => {
				return (
					<li key={id} className={'d-flex'}>
						<p style={{ width: '60%' }}>{name}</p>
						<Button
							text='Delete author'
							callbackFunc={(e) => {
								e.preventDefault();
								deletAuthorFromCourseAuthors(id);
							}}
						/>
					</li>
				);
			});

			return list;
		} else {
			return <p>Author list is empty</p>;
		}
	};

	return (
		<main
			style={{ margin: 10, padding: 20, backgroundColor: 'white' }}
			className={'border border-info rounded'}
		>
			<div className={'d-flex justify-content-between'}>
				<Input
					placeholdetText='Enter title...'
					labelText='Title'
					onChange={onChangeTitleInput}
				/>
				<div style={{ marginTop: 'auto' }}>
					<Button text='Create course' callbackFunc={onCreateCourse} />
				</div>
			</div>
			<div style={{ marginTop: 10 }}>
				<label htmlFor='description'>Description</label>
				<textarea
					style={{ width: '100%', padding: '10px 20px' }}
					placeholder='Enter description'
					onChange={onChangeDescrInput}
					id='description'
					minLength='2'
				/>
			</div>
			<div
				className={'d-flex justify-content-between'}
				style={{ marginTop: 10, padding: 10 }}
			>
				<div style={{ width: '45%' }}>
					<div className={'d-flex flex-column'}>
						<h4 className={'align-self-center'}>Add author</h4>
						<Input
							placeholdetText='Enter author name...'
							onChange={onChangeNameInput}
							value={name}
							minLength={2}
							htmlFor='authorName'
							labelText='Author name'
						/>
						<div className={'align-self-center'}>
							<Button
								text='Create author'
								callbackFunc={(e) => {
									e.preventDefault();
									createAuthor(name);
								}}
							/>
						</div>
					</div>
					<div style={{ marginTop: 50 }} className={'d-flex flex-column'}>
						<h4 className={'align-self-center'}>Duration</h4>
						<Input
							placeholdetText='Enter duration in minutes...'
							onChange={onChangeDurationInput}
							value={duration}
							htmlFor='duration'
							labelText='Duration'
							type='number' // вводится +
						/>
						<p>Duration: {pipeDuration(duration, '00:00')} hours</p>
					</div>
				</div>
				<div style={{ width: '45%' }}>
					<section>
						<h4 style={{ textAlign: 'center' }}>Authors</h4>
						<ul
							className={'list-group-item'}
							style={{ margin: 10, padding: 10 }}
						>
							{createAuthorsList(props.mockedAuthorsList)}
						</ul>
					</section>

					<section>
						<h4 style={{ textAlign: 'center' }}>Course authors</h4>
						<ul
							className={'list-group-item'}
							style={{ margin: 10, padding: 10 }}
						>
							{createCourseAuthorsList(props.mockedAuthorsList)}
						</ul>
					</section>
				</div>
			</div>
		</main>
	);
};

export default CreateCourse;
