const Button = ({ text, callbackFunc }) => {
	return (
		<button
			className={'btn btn-outline-primary'}
			style={{ width: 160 }}
			onClick={callbackFunc}
			type='submit'
			// type={type}
		>
			{text}
		</button>
	);
};

export default Button;
