export function findTotalsFromJournalDate(journalEntry: any[]) {
  return journalEntry.reduce(
    (acc, curr) => {
      acc.calories += curr.calories;
      acc.carbs += curr.carbs;
      acc.fats += curr.fats;
      acc.protein += curr.protein;

      return acc;
    },
    {
      calories: 0,
      carbs: 0,
      fats: 0,
      protein: 0,
    }
  );
}
