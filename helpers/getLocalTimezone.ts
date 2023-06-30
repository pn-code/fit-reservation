const getLocalTimezones = () => {
    const today = new Date();

    const localStartOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0, // Set hours to 0 for start of day
        0, // Set minutes to 0
        0, // Set seconds to 0
        0 // Set milliseconds to 0
    );

    const localEndOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23, // Set hours to 23 for end of day
        59, // Set minutes to 59
        59, // Set seconds to 59
        999 // Set milliseconds to 999
    );

    const startOfDay = new Date(localStartOfDay.getTime());

    const endOfDay = new Date(localEndOfDay.getTime());

    return { startOfDay, endOfDay };
};

export default getLocalTimezones;
