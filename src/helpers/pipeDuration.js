const pipeDuration = (duration, emptyValue = '') => {
	if (duration) {
		const hours = Math.trunc(duration / 60);
		const mins = duration % 60;

		return `
			${hours < 10 ? '0' + hours : hours}:${mins < 10 ? '0' + mins : mins}
		`;
	} else {
		return emptyValue;
	}
};

export default pipeDuration;
