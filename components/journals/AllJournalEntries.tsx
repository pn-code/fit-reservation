import { sortEntriesByDate } from "@/helpers/sortEntriesByDate";
import AllNutritionEntries from "./nutrition/AllNutritionEntries";
import AllExerciseEntries from "./exercise/AllExerciseEntries";

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
    console.log(sortedCardioJournals);

    // Grab dates and aggregate entries
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
                    <div className="bg-slate-800 rounded-sm" key={date}>
                        <h2 className="text-xl text-primary font-bold tracking-tighter bg-white border border-primary p-4 rounded-sm shadow-md">
                            {date}
                        </h2>

                        <div className="w-full flex flex-col gap-0.5 lg:flex-row">
                            <AllNutritionEntries
                                sortedFoodJournals={sortedFoodJournals}
                                date={date}
                            />
                            <AllExerciseEntries
                                sortedJournals={sortedResistanceJournals}
                                date={date}
                            />
                            <AllExerciseEntries
                                sortedJournals={sortedCardioJournals}
                                date={date}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
