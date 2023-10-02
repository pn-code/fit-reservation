export function getDateFromISO(dateIso: Date) {
    // Create a Date object from the UTC string
    const utcDate = new Date(dateIso);

    // Get the user's local time offset in minutes
    const userOffsetMinutes = new Date().getTimezoneOffset();

    // Calculate the user's local time by adding the offset
    const userLocalTime = new Date(
        utcDate.getTime() - userOffsetMinutes * 60000
    );

    // Format the local time as a string (you can adjust the format as needed)
    const userLocalTimeString = userLocalTime.toLocaleString(); // This gives you a human-readable date and time string in the user's local time

    return userLocalTimeString;
}