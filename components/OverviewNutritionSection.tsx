"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MacroChart from "./MacroChart";
import Spinner from "./Spinner";

export default function OverviewNutritionSection() {
    const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
    const [loading, setLoading] = useState(true);

    const totalCalories = foodEntries.reduce(
        (acc, curr) => curr.calories + acc,
        0
    );
    const totalCarbs = foodEntries.reduce((acc, curr) => curr.carbs + acc, 0);
    const totalFats = foodEntries.reduce((acc, curr) => curr.fats + acc, 0);
    const totalProtein = foodEntries.reduce(
        (acc, curr) => curr.protein + acc,
        0
    );

    useEffect(() => {
        async function fetchFoodEntries() {
            const res = await axios.get("/api/food_entries");
            console.log(res);
            setFoodEntries(res.data);
        }

        try {
            fetchFoodEntries();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <section className="flex flex-col items-center gap-4 md:w-full pt-4">
            <h2 className="text-2xl font-semibold text-amber-400">
                Your Nutrition
            </h2>
            {!loading ? (
                <>
                    <article className="flex flex-col items-center">
                        <h3 className="text-xl font-bold">Total Calories</h3>
                        <span className="text-lg">{totalCalories} kcal</span>
                    </article>
                    <article className="flex flex-col items-center w-[80%] md:w-full max-w-[400px]">
                        <h3 className="text-xl font-bold">Macronutrients</h3>
                        {totalCarbs != 0 ||
                        totalFats != 0 ||
                        totalProtein != 0 ? (
                            <MacroChart
                                carbs={totalCarbs || 0}
                                fats={totalFats || 0}
                                protein={totalProtein || 0}
                            />
                        ) : (
                            <p>No Stats Available</p>
                        )}
                    </article>
                </>
            ) : (
                <Spinner />
            )}
        </section>
    );
}
