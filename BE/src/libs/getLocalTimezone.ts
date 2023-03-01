export const getLocalTimezone = () => {
	const date = new Date();
	const offset = date.getTimezoneOffset() / 60;
	return `${offset > 0 ? '-' : '+'}${Math.abs(offset).toString().padStart(2, '0')}:00`;
};
