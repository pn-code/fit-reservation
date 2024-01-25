"use client";

import FoodEntryCard from "@/components/journals/nutrition/FoodEntryCard";
import { getSingleDayEntries } from "@/helpers/getSingleDayEntries";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface NutritionJournalProps {
    foodEntries: FoodEntry[];
    date?: Date | string;
}

export default function NutritionJournal({
    foodEntries,
    date,
}: NutritionJournalProps) {
    const [foodEntriesToShow, setFoodEntriesToShow] = useState<FoodEntry[]>([]);

    useEffect(() => {
        const fetchEntriesByDate = (date: string | Date) => {
            try {
                const currentEntries = getSingleDayEntries(
                    new Date(date),
                    foodEntries
                );
                setFoodEntriesToShow(currentEntries);
            } catch (error) {
                toast.error("Please enter a valid date.");
                console.error(error);
            }
        };

        if (date) {
            fetchEntriesByDate(date);
        } else {
            setFoodEntriesToShow(foodEntries)
        }
    }, [date, foodEntries]);

    const totalCalories = foodEntriesToShow?.reduce(
        (acc, curr) => curr.calories + acc,
        0
    );
    const totalCarbs = foodEntriesToShow?.reduce(
        (acc, curr) => curr.carbs + acc,
        0
    );
    const totalFats = foodEntriesToShow?.reduce(
        (acc, curr) => curr.fats + acc,
        0
    );
    const totalProtein = foodEntriesToShow?.reduce(
        (acc, curr) => curr.protein + acc,
        0
    );

    return (
        <section className="flex flex-col items-between gap-4 py-5 w-full bg-white border border-primary p-4 rounded-sm shadow-md">
            <header className="flex justify-between">
                <h3 className="font-bold text-xl tracking-tight">
                    Nutrition Journal
                </h3>
            </header>

            <div className="overflow-x-auto w-full">
                <table className="table-auto w-full text-xs md:text-sm">
                    <thead className="h-8 font-semibold uppercase text-white bg-primary">
                        <tr className="p-2 whitespace-nowrap border border-primary">
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
                                <div className="p-2 font-semibold text-left"></div>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="text-sm divide-y divide-primary">
                        {foodEntriesToShow?.map((entry) => (
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
                        <tr className="p-2 whitespace-nowrap border border-primary">
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

                {!foodEntriesToShow.length && (
                    <p className="text-center w-full pt-4">
                        You currently have no nutrition entries.
                    </p>
                )}
            </div>
        </section>
    );
}
