"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { diets } from "../lib/diets";

interface Props {
    currentCalorieGoal: number | null | undefined;
}

export default function MacroBuilder({ currentCalorieGoal }: Props) {
    const [carbs, setCarbs] = useState<number>(40);
    const [fats, setFats] = useState<number>(30);
    const [protein, setProtein] = useState<number>(30);

    const handleProteinChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        const maxCarbs = 100 - value - fats;
        const maxProtein = 100 - maxCarbs - fats;
        setProtein(value);
        setCarbs(Math.min(carbs, maxCarbs));
        setFats(Math.min(fats, maxProtein));
    };

    const handleCarbsChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        const maxProtein = 100 - value - fats;
        const maxCarbs = 100 - maxProtein - fats;
        setCarbs(value);
        setProtein(Math.min(protein, maxProtein));
        setFats(Math.min(fats, maxCarbs));
    };

    const handleFatChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        const maxProtein = 100 - carbs - value;
        const maxCarbs = 100 - maxProtein - value;
        setFats(value);
        setProtein(Math.min(protein, maxProtein));
        setCarbs(Math.min(carbs, maxCarbs));
    };

    const [calories, setCalories] = useState<number>(
        currentCalorieGoal || 2000
    );
    const [dietPlan, setDietPlan] = useState<string>("zone");

    useEffect(() => {
        setCarbs(diets[dietPlan].carbs);
        setFats(diets[dietPlan].fats);
        setProtein(diets[dietPlan].protein);
    }, [dietPlan]);

    return (
        <section className="py-4 rounded-md flex-1">
            <header>
                <h2 className="text-xl sm:text-2xl font-semibold">Macronutrients</h2>
                <p className="text-amber-400 text-sm font-semibold">
                    Build your macros.
                </p>
            </header>

            {/* Macronutrient Section Wrapper */}
            <section className="flex md:justify-between flex-col md:flex-row gap-4">
                <form className="my-2 flex flex-col gap-2 w-full flex-1">
                    {/* Calories Input and Diet Selector */}
                    <section className="flex flex-col gap-1">
                        <label htmlFor="calories">Calories</label>
                        <input
                            onChange={(e) =>
                                setCalories(Number(e.target.value))
                            }
                            value={calories}
                            type="number"
                            id="calories"
                        />
                    </section>

                    <section className="flex flex-col gap-1">
                        <label htmlFor="diet">Diet</label>
                        <select
                            onChange={(e) => setDietPlan(e.target.value)}
                            value={dietPlan}
                            name="diet"
                            id="diet"
                        >
                            <option value="zone">Zone</option>
                            <option value="med">Mediterranean</option>
                            <option value="keto">Ketogenic</option>
                            <option value="paleo">Paleo</option>
                            <option value="lowfat">Low Fat</option>
                        </select>
                    </section>

                    {/* Macronutrient Sliders */}
                    <section className="flex flex-col gap-1 w-full">
                        <label htmlFor="carbs">Carbohydrates ({carbs}%)</label>
                        <input
                            id="carbs"
                            onChange={(e) => handleCarbsChange(e)}
                            value={carbs}
                            type="range"
                            min={0}
                            max={100 - fats - protein}
                            step={1}
                            list="%"
                        />
                    </section>

                    <section className="flex flex-col gap-1">
                        <label htmlFor="fats">Fats ({fats}%)</label>
                        <input
                            id="fats"
                            onChange={(e) => handleFatChange(e)}
                            value={fats}
                            type="range"
                            min={0}
                            max={100 - carbs - protein}
                            step={1}
                        />
                    </section>

                    <section className="flex flex-col gap-1">
                        <label htmlFor="protein">Protein ({protein}%)</label>
                        <input
                            id="protein"
                            onChange={(e) => handleProteinChange(e)}
                            value={protein}
                            type="range"
                            min={0}
                            max={100 - carbs - fats}
                            step={1}
                        />
                    </section>
                </form>

                <section className="border-indigo-600 border-2 p-4 w-full flex-1 flex flex-col items-center justify-center rounded-md bg-gray-800/50">
                    <table className="w-full text-center text-sm mt-2">
                        <thead>
                            <tr>
                                <th className="font-semibold">Carbs</th>
                                <th className="font-semibold">Fats</th>
                                <th className="font-semibold">Protein</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {Math.round((carbs * 0.01 * calories) / 4)}{" "}
                                    g
                                </td>
                                <td>
                                    {Math.round((fats * 0.01 * calories) / 9)} g
                                </td>
                                <td>
                                    {Math.round(
                                        (protein * 0.01 * calories) / 4
                                    )}{" "}
                                    g
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </section>
        </section>
    );
}
