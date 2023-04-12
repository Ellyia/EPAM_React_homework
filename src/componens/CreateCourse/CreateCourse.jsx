import { useState, useContext, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import pipeDuration from '../../helpers/pipeDuration';
import dateGeneration from '../../helpers/dateGeneration';
import { mockedListsContext } from '../../context';

import styles from './CreateCourse.module.css';

const CreateCourse = ({ callbackFunc, onAddAuthor }) => {
	const [name, setName] = useState('');
	const [duration, setDuration] = useState('');
	const [description, setDescription] = useState('');
	const [title, setTitle] = useState('');
	const [idshki, setIdshki] = useState([]);
	const [authorsOfCourse, setAuthorsOfCourse] = useState([]);

	const mockedLists = useContext(mockedListsContext);

	const resetCCState = () => {
		setName('');
		setDuration('');
		setDescription('');
		setTitle('');
		setIdshki([]);
		setAuthorsOfCourse([]);
	};

	const isFormValid = useCallback(() => {
		return (
			title.length >= 2 &&
			description.length >= 2 &&
			duration &&
			idshki.length > 0
		);
	}, [title, description, duration, idshki]);

	const onCreateCourse = useCallback(
		(e) => {
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
		},
		[isFormValid, callbackFunc, title, description, duration, idshki]
	);

	const addAuthorToCourseFromAutorsList = useCallback(
		(etId, arr) => {
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
		},
		[authorsOfCourse, idshki]
	);

	const onAuthorAdd = useCallback(
		(e, id, data) => {
			e.preventDefault();
			addAuthorToCourseFromAutorsList(id, data);
		},
		[addAuthorToCourseFromAutorsList]
	);

	const deletAuthorFromCourseAuthors = useCallback(
		(etId) => {
			const arrAuthorsOfCourse = [...authorsOfCourse].filter(
				({ id }) => id !== etId
			);

			const arridshki = [...idshki].filter((item) => item !== etId);

			setIdshki(arridshki);
			setAuthorsOfCourse(arrAuthorsOfCourse);
		},
		[authorsOfCourse, idshki]
	);

	const onChangeNameInput = useCallback((e) => {
		const name = e.target.value;
		setName(name);
	}, []);

	const onChangeDurationInput = useCallback((e) => {
		if (e.target.value.match(/^0/)) {
			e.target.value = null;
		} else {
			const duration = e.target.value;
			setDuration(duration);
		}
	}, []);

	const onChangeTitleInput = useCallback((e) => {
		const title = e.target.value;
		setTitle(title);
	}, []);

	const onChangeDescrInput = useCallback((e) => {
		const description = e.target.value;
		setDescription(description);
	}, []);

	const onCreateAuthor = useCallback(
		(e) => {
			e.preventDefault();
			if (name.length >= 2) {
				const author = {
					id: uuidv4(),
					name: name,
				};
				onAddAuthor(author);
			}
		},
		[name, onAddAuthor]
	);

	const createAuthorsList = useCallback(
		(data) => {
			const authorsList = data
				.map(({ id, name }) => {
					const isInclude = idshki.some((item) => item === id);
					if (!isInclude) {
						return (
							<li key={id} className={styles.li}>
								<p className={styles.author}>{name}</p>
								<Button
									text='Add author'
									callbackFunc={(e) => onAuthorAdd(e, id, data)}
								/>
							</li>
						);
					}
				})
				.filter(Boolean); // (x => !!x)

			return authorsList;
		},
		[idshki, onAuthorAdd]
	);

	const onDeleteAuthor = useCallback(
		(e, id) => {
			e.preventDefault();
			deletAuthorFromCourseAuthors(id);
		},
		[deletAuthorFromCourseAuthors]
	);

	const createCourseAuthorsList = useCallback(
		(data) => {
			if (authorsOfCourse.length !== 0) {
				const list = authorsOfCourse.map(({ id, name }) => {
					return (
						<li key={id} className={styles.li}>
							<p className={styles.author}>{name}</p>
							<Button
								text='Delete author'
								callbackFunc={(e) => onDeleteAuthor(e, id)}
							/>
						</li>
					);
				});

				return list;
			} else {
				return <p>Author list is empty</p>;
			}
		},
		[authorsOfCourse, onDeleteAuthor]
	);

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
								callbackFunc={(e) => onCreateAuthor(e)}
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
						<ul>{createAuthorsList(mockedLists.mockedAuthorsList)}</ul>
					</section>

					<section>
						<h4 className={styles.textAlCenter}>Course authors</h4>
						<ul>{createCourseAuthorsList(mockedLists.mockedAuthorsList)}</ul>
					</section>
				</div>
			</div>
		</main>
	);
};

export default CreateCourse;
