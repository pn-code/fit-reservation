export function convertDateInputToDate(dateInput: string) {
    // Split the date input into year, month, and day components
    const [year, month, day] = dateInput.split("-").map(Number);

    // Create a Date object in the user's local time zone
    const localDate = new Date(year, month - 1, day);

    // Get the user's time zone offset in minutes
    const timezoneOffset = localDate.getTimezoneOffset();

    // Adjust the date for the time zone offset
    const adjustedDate = new Date(
        localDate.getTime() + timezoneOffset * 60 * 1000
    );

    // Set the time to midnight (00:00:00) in the user's local time zone
    adjustedDate.setHours(0, 0, 0, 0);

    return adjustedDate;
}
