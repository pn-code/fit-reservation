import { sortEntriesByDate } from "@/helpers/sortEntriesByDate";
import AllNutritionEntries from "./nutrition/AllNutritionEntries";

interface AllNutritionEntriesProps {
    foodEntries: FoodEntry[];
    resistanceEntries: ExerciseEntry[];
    cardioEntries: ExerciseEntry[];
}

export default function AllJournalEntries({
    foodEntries,
    resistanceEntries,
    cardioEntries,
}: AllNutritionEntriesProps) {
    // Sort journals based on client time and date
    const sortedFoodJournals = sortEntriesByDate(foodEntries);
    const sortedResistanceJournals = sortEntriesByDate(resistanceEntries);
    const sortedCardioJournals = sortEntriesByDate(cardioEntries);

    // Grab dates
    const aggregateEntries = [
        ...foodEntries,
        ...resistanceEntries,
        ...cardioEntries,
    ];
    const sortedAggregateJournals = sortEntriesByDate(aggregateEntries);
    const dates = Object.keys(sortedAggregateJournals);

    return (
        <section className="w-full">
            <div className="flex flex-col gap-4">
                {dates.map((date: string) => (
                    <div key={date}>
                        <h2 className="text-xl text-primary font-bold tracking-tighter bg-white border border-primary p-4 rounded-sm shadow-md">
                            {date}
                        </h2>

                        <div className="w-full">
                            <AllNutritionEntries
                                sortedFoodJournals={sortedFoodJournals}
                                date={date}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
