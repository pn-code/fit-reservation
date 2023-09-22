import getLocalTimezones from "./getLocalTimezone";

export function getSingleDayEntries(date: Date, entries: any[]) {
  const { startOfDay, endOfDay } = getLocalTimezones(date);

  return entries.filter((entry) => {
    const entryDate = new Date(entry.date).toISOString();
    const isBeforeEndOfDay = entryDate <= new Date(endOfDay).toISOString();
    const isAfterStartOfDay = entryDate >= new Date(startOfDay).toISOString();

    return isBeforeEndOfDay && isAfterStartOfDay;
  });
}
