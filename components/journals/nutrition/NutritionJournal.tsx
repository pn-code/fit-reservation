"use client";

import FoodEntryCard from "@/components/journals/nutrition/FoodEntryCard";
import Spinner from "@/components/Spinner";
import Link from "next/link";

interface Props {
    foodEntries: FoodEntry[];
    userId: string;
}

export default function NutritionJournal({ foodEntries, userId }: Props) {
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
        <section className="flex flex-col items-between gap-4 py-5 w-full bg-white border border-primary p-4 rounded-sm shadow-md">
            <header className="flex justify-between">
                <h3 className="font-bold text-xl tracking-tight">
                    Nutrition Journal
                </h3>
                <Link
                    className="btn btn--primary"
                    href={`/journal/nutrition/user/${userId}`}
                >
                    View All
                </Link>
            </header>

            <div className="overflow-x-auto w-full">
                <table className="table-auto w-full text-xs md:text-sm">
                    <thead className="h-8 font-semibold uppercase text-white bg-primary">
                        <tr className="p-2 whitespace-nowrap">
                            <th>
                                <div className="p-2 font-semibold text-left">
                                    Name
                                </div>
                            </th>
                            <th>
                                <div className="p-2 font-semibold text-left">
                                    Calories
                                </div>
                            </th>

                            <th className="hidden sm:table-cell">
                                <div className="p-2 font-semibold text-left">
                                    Carbs
                                </div>
                            </th>

                            <th className="hidden sm:table-cell">
                                <div className="p-2 font-semibold text-left">
                                    Fats
                                </div>
                            </th>

                            <th className="hidden sm:table-cell">
                                <div className="p-2 font-semibold text-left">
                                    Protein
                                </div>
                            </th>

                            <th className="sm:hidden">
                                <div className="p-2 font-semibold text-left">
                                    C/F/P
                                </div>
                            </th>
                            <th>
                                <div className="p-2 font-semibold text-left">
                                    
                                </div>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="text-sm divide-y divide-primary">
                        {foodEntries?.map((entry) => (
                            <FoodEntryCard
                                id={entry.id}
                                name={entry.name}
                                calories={entry.calories}
                                carbs={entry.carbs}
                                fats={entry.fats}
                                protein={entry.protein}
                                key={entry.id}
                                allowDelete={true}
                            />
                        ))}
                    </tbody>

                    <tfoot className="h-8 font-semibold uppercase text-white bg-secondary">
                        <tr className="p-2 whitespace-nowrap">
                            <th className="font-semibold text-left">
                                <div className="p-2">Total</div>
                            </th>
                            <th className="font-semibold text-left">
                                <div className="p-2">{totalCalories}</div>
                            </th>
                            <th className="font-semibold text-left hidden sm:table-cell">
                                <div className="p-2">{totalCarbs}g</div>
                            </th>
                            <th className="font-semibold text-left hidden sm:table-cell">
                                <div className="p-2">{totalFats}g</div>
                            </th>
                            <th className="font-semibold text-left hidden sm:table-cell">
                                <div className="p-2">{totalProtein}g</div>
                            </th>
                            <th className="font-semibold text-left sm:hidden">
                                <div className="p-2">{`${totalCarbs}/${totalFats}/${totalProtein}`}</div>
                            </th>
                            <th>
                                <div></div>
                            </th>
                        </tr>
                    </tfoot>
                </table>

                {!foodEntries.length && (
                    <p className="text-center w-full pt-4">
                        You currently have no nutrition entries.
                    </p>
                )}
            </div>
        </section>
    );
}
