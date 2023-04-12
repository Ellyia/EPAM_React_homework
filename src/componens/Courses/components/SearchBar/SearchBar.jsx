import { useState, useCallback } from 'react';

import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

import styles from './SearchBar.module.css';

const SearchBar = ({ onUpdateSearch }) => {
	const [searchPhrase, setSearchPhrase] = useState('');

	const onChangeSearchInput = useCallback(
		(e) => {
			const searchPhrase = e.target.value || '';
			setSearchPhrase(searchPhrase);

			if (!searchPhrase) {
				onUpdateSearch(searchPhrase);
			}
		},
		[onUpdateSearch]
	);

	const onSearchInput = useCallback(
		(e, searchPhrase) => {
			e.preventDefault();
			onUpdateSearch(searchPhrase);
		},
		[onUpdateSearch]
	);

	return (
		<div className={styles.flex}>
			<Input
				placeholdetText='Enter course name...'
				onChange={onChangeSearchInput}
				htmlFor='searchBar'
			/>
			<Button
				text='Search'
				callbackFunc={(e) => onSearchInput(e, searchPhrase)}
			/>
		</div>
	);
};

export default SearchBar;
