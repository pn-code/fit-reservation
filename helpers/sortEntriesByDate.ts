import { getDateFromISO } from "./getDateFromIso";

export function sortEntriesByDate(entries: any[]) {
  const sortedEntries = entries.reduce((acc:any, curr: any) => {
    const currentEntryDate = new Date(curr.date);
    const convertDateToUserTimezone =
      getDateFromISO(currentEntryDate).split(",")[0];

    // If converted time already exists in acc, then add it to the end of the array
    if (acc[convertDateToUserTimezone]) {
      acc[convertDateToUserTimezone] = [
        ...acc[convertDateToUserTimezone],
        curr,
      ];
    } else {
      // If converted time does not exist in acc, then create it and add curr obj to array
      acc[convertDateToUserTimezone] = [curr];
    }
    return acc;
  }, {});

  return sortedEntries;
}
