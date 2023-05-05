"use client";
import FoodEntryCard from "./FoodEntryCard";
import LineDivider from "./LineDivider";

interface Props {
    foodEntries: FoodEntry[];
    deleteFoodEntry: any
}

export default function NutritionJournal({ foodEntries, deleteFoodEntry }: Props) {
    const totalCalories = foodEntries?.reduce(
        (acc, curr) => curr.calories + acc,
        0
    );
    const totalCarbs = foodEntries?.reduce((acc, curr) => curr.carbs + acc, 0);
    const totalFats = foodEntries?.reduce((acc, curr) => curr.fats + acc, 0);
    const totalProtein = foodEntries?.reduce(
        (acc, curr) => curr.protein + acc,
        0
    );

    return (
        <section className="flex flex-col items-center gap-4 py-5 w-full">
            <LineDivider />
            <h2 className="text-2xl font-semibold text-amber-400">
                Nutrition Journal
            </h2>
            {foodEntries.length === 0 && (
                <p className="font-semibold text-sm">
                    Currently has no entries.
                </p>
            )}
            {foodEntries.length > 0 ? (
                <table className="w-full text-left lg:w-[60%]">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Calories</th>
                            <th>Carbs</th>
                            <th>Fats</th>
                            <th>Protein</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody className="text-sm">
                        {foodEntries?.map((entry) => (
                            <FoodEntryCard
                                id={entry.id}
                                name={entry.name}
                                calories={entry.calories}
                                carbs={entry.carbs}
                                fats={entry.fats}
                                protein={entry.protein}
                                key={entry.id}
                                deleteFoodEntry={deleteFoodEntry}
                            />
                        ))}
                    </tbody>
                    <tfoot className="border-t border-slate-50 pt-2">
                        <tr>
                            <th>Total</th>
                            <th>{totalCalories}</th>
                            <th>{totalCarbs}g</th>
                            <th>{totalFats}g</th>
                            <th>{totalProtein}g</th>
                        </tr>
                    </tfoot>
                </table>
            ): ""}
        </section>
    );
}
