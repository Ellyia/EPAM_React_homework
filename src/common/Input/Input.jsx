import styles from './Input.module.css';

const Input = ({
	placeholdetText,
	onChange,
	htmlFor,
	labelText,
	type,
	notRequired,
}) => {
	const req = notRequired ? notRequired : true;

	return (
		<label htmlFor={htmlFor} className={styles.label}>
			{labelText}
			<input
				className={styles.inputBasis}
				type={type ? type : 'text'}
				id={htmlFor}
				onChange={onChange}
				placeholder={placeholdetText}
				required={req}
			/>
		</label>
	);
};

export default Input;
