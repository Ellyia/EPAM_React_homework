import { useState } from 'react';

import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

const SearchBar = ({ onUpdateSearch }) => {
	const [searchPhrase, setSearchPhrase] = useState('');

	const onChangeSearchInput = (e) => {
		const searchPhrase = e.target.value || '';
		setSearchPhrase(searchPhrase);

		if (!searchPhrase) {
			onUpdateSearch(searchPhrase);
		}
	};

	const onSearchInput = (searchPhrase) => {
		onUpdateSearch(searchPhrase);
	};

	return (
		<div className={'d-flex'}>
			<Input
				placeholdetText='Enter course name...'
				onChange={onChangeSearchInput}
				htmlFor='searchBar'
				notRequired={true}
			/>
			<Button
				text='Search'
				callbackFunc={(e) => {
					e.preventDefault();
					onSearchInput(searchPhrase);
				}}
			/>
		</div>
	);
};

export default SearchBar;
