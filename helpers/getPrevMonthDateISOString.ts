export function getPrevMonthDateISOString() {
    // Get the current date
    const currentDate = new Date();

    // Get the previous month's date
    const previousMonthDate = new Date(currentDate);
    previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);

    // Convert the date to ISO string format (e.g., "2023-06-21T00:00:00.000Z")
    const isoString = previousMonthDate.toISOString();

    // Return the ISO string
    return isoString;
}
