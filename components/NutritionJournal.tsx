"use client";
import FoodEntryCard from "./FoodEntryCard";
import LineDivider from "./LineDivider";

interface Props {
    foodEntries: FoodEntry[];
    deleteFoodEntry: any;
}

export default function NutritionJournal({
    foodEntries,
    deleteFoodEntry,
}: Props) {
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
                <div className="p-3 w-full sm:w-[75%]">
                    <div className="overflow-x-auto w-full">
                        <table className="table-auto w-full">
                            <thead className="h-8 text-xs sm:text-[16px] font-semibold uppercase text-yellow-50 bg-blue-900/60">
                                <tr className="p-2 whitespace-nowrap">
                                    <th>
                                        <div className="font-semibold text-left">
                                            Name
                                        </div>
                                    </th>
                                    <th>
                                        <div className="font-semibold text-left">
                                            Calories
                                        </div>
                                    </th>
                                    <th>
                                        <div className="font-semibold text-left">
                                            Carbs
                                        </div>
                                    </th>
                                    <th>
                                        <div className="font-semibold text-left">
                                            Fats
                                        </div>
                                    </th>
                                    <th>
                                        <div className="font-semibold text-left">
                                            Protein
                                        </div>
                                    </th>
                                    <th>
                                        <div className="font-semibold text-left">
                                            Action
                                        </div>
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="text-sm divide-y divide-gray-100">
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
                                        allowDelete={true}
                                    />
                                ))}
                            </tbody>
                            <tfoot className="h-8 text-xs sm:text-[16px] font-semibold uppercase text-yellow-50 bg-blue-900/60">
                                <tr className="p-2 whitespace-nowrap">
                                    <th className="font-semibold text-left">
                                        <div>Total</div>
                                    </th>
                                    <th className="font-semibold text-left">
                                        <div>{totalCalories}</div>
                                    </th>
                                    <th className="font-semibold text-left">
                                        <div>{totalCarbs}g</div>
                                    </th>
                                    <th className="font-semibold text-left">
                                        <div>{totalFats}g</div>
                                    </th>
                                    <th className="font-semibold text-left">
                                        <div>{totalProtein}g</div>
                                    </th>
                                    <th><div></div></th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            ) : (
                ""
            )}
        </section>
    );
}
