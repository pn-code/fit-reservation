const getLocalTimezones = () => {
	const today = new Date();
	const timeZoneOffset = today.getTimezoneOffset() * 60000;
	const localOffset = new Date().getTimezoneOffset() * 60000;

	const startOfDay = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate()
	);
	const endOfDay = new Date(today.getTime() - timeZoneOffset + localOffset);
	endOfDay.setHours(23, 59, 59, 999);

	return { startOfDay, endOfDay };
};

export default getLocalTimezones;