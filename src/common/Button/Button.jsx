import styles from './Button.module.css';

const Button = ({ text, callbackFunc }) => {
	return (
		<button
			className={styles.btnBasis}
			onClick={callbackFunc}
			type='submit'
			// type={type}
		>
			{text}
		</button>
	);
};

export default Button;
