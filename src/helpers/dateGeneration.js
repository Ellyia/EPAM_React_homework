const dateGeneration = () => {
	const date = new Date();

	return `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export default dateGeneration;
