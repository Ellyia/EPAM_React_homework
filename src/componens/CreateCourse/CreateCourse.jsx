import { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import pipeDuration from '../../helpers/pipeDuration';
import dateGeneration from '../../helpers/dateGeneration';
import { mockedAuthorsListContext } from '../Courses/Courses';

import styles from './CreateCourse.module.css';

const CreateCourse = ({ callbackFunc, onAddAuthor }) => {
	const [name, setName] = useState('');
	const [duration, setDuration] = useState('');
	const [description, setDescription] = useState('');
	const [title, setTitle] = useState('');
	const [idshki, setIdshki] = useState([]);
	const [authorsOfCourse, setAuthorsOfCourse] = useState([]);

	const mockedAuthorsList = useContext(mockedAuthorsListContext);

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

			callbackFunc(card);
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
			onAddAuthor(author);
		}
	};

	const createAuthorsList = (data) => {
		const authorsList = data
			.map(({ id, name }) => {
				const isInclude = idshki.some((item) => item === id);
				if (!isInclude) {
					return (
						<li key={id} className={styles.li}>
							<p className={styles.author}>{name}</p>
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
					<li key={id} className={styles.li}>
						<p className={styles.author}>{name}</p>
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
		<main className={styles.main}>
			<div className={styles.title}>
				<Input
					placeholdetText='Enter title...'
					labelText='Title'
					onChange={onChangeTitleInput}
				/>
				<div className={styles.btnCreateCourse}>
					<Button text='Create course' callbackFunc={onCreateCourse} />
				</div>
			</div>
			<div className={styles.descr}>
				<label htmlFor='description'>Description</label>
				<textarea
					className={styles.textarea}
					placeholder='Enter description'
					onChange={onChangeDescrInput}
					id='description'
					minLength='2'
				/>
			</div>
			<div className={styles.wrapper}>
				<div className={styles.leftBlock}>
					<div className={styles.addAuthor}>
						<h4 className={styles.alSelfCenter}>Add author</h4>
						<Input
							placeholdetText='Enter author name...'
							onChange={onChangeNameInput}
							value={name}
							minLength={2}
							htmlFor='authorName'
							labelText='Author name'
						/>
						<div className={styles.authorBtn}>
							<Button
								text='Create author'
								callbackFunc={(e) => {
									e.preventDefault();
									createAuthor(name);
								}}
							/>
						</div>
					</div>
					<div className={styles.duration}>
						<h4 className={styles.alSelfCenter}>Duration</h4>
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
				<div className={styles.authors}>
					<section>
						<h4 className={styles.textAlCenter}>Authors</h4>
						<ul>{createAuthorsList(mockedAuthorsList)}</ul>
					</section>

					<section>
						<h4 className={styles.textAlCenter}>Course authors</h4>
						<ul>{createCourseAuthorsList(mockedAuthorsList)}</ul>
					</section>
				</div>
			</div>
		</main>
	);
};

export default CreateCourse;
