const Input = (props) => {
	const { placeholdetText, onChange, htmlFor, labelText, type, notRequired } =
		props;

	const req = notRequired ? notRequired : true;

	return (
		<label htmlFor={htmlFor} style={{ marginRight: 10 }}>
			{labelText}
			<input
				// type='text'
				type={type ? type : 'text'}
				id={htmlFor}
				className='form-control search-input'
				onChange={onChange}
				placeholder={placeholdetText}
				required={req}
			/>
		</label>
	);
};

export default Input;
