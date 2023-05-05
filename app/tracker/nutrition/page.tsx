"use client";
import { useEffect, useState } from "react";
import TrackerHeader from "../../../components/TrackerHeader";
import { foodEntrySchema } from "../../../validations/foodEntryValidator";
import { ZodError } from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import NutritionJournal from "../../../components/NutritionJournal";

function NutritionPage() {
    const [name, setName] = useState("");
    const [calories, setCalories] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [fats, setFats] = useState(0);
    const [protein, setProtein] = useState(0);

    const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);

    useEffect(() => {
        const getFoodData = async () => {
            const res = await axios.get("/api/food_entries");
            setFoodEntries(res.data);
        };
        getFoodData();
    }, []);

    const [loading, setLoading] = useState(false);

    const validateFoodIntake = () => {
        const foodIntake = {
            name,
            calories,
            carbs,
            fats,
            protein,
        };

        try {
            foodEntrySchema.parse(foodIntake);
            return true;
        } catch (error) {
            if (error instanceof ZodError) {
                toast.error("An error has occurred during validation.");
            }
        }
    };

    const createFoodEntry = async () => {
        setLoading(true);
        try {
            if (validateFoodIntake()) {
                const res = await axios.post("/api/food_entries", {
                    name,
                    calories,
                    carbs,
                    fats,
                    protein,
                });

                toast.success(`${name} has been added.`);
                setFoodEntries((prev: FoodEntry[]) => [...prev, res.data]);
                setName("");
                setCalories(0);
                setCarbs(0);
                setFats(0);
                setProtein(0);
            }
        } catch (error) {
            toast.error("An error has occurred.");
        } finally {
            setLoading(false);
        }
    };

    const deleteFoodEntry = async (id: number) => {
        try {
            const res = await axios.delete(`/api/food_entries/${id}`);
            toast.success(
                `Successfully deleted: ${res.data.name.substring(0, 30)}!`
            );
            const updatedFoodEntries = foodEntries.filter(
                (entry) => entry.id != id
            );
            setFoodEntries(updatedFoodEntries);
        } catch (error) {
            toast.error(
                `An error has occurred while attempting to delete ${name}.`
            );
        }
    };

    return (
        <main className="w-full h-full bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-10 text-white/90">
            <TrackerHeader title="Nutrition" />
            <h2 className="lg:text-center text-2xl font-semibold text-amber-400">
                Add Nutrition Item
            </h2>

            <form className="w-full flex flex-col gap-8 lg:flex-row py-2 lg:items-center lg:justify-center">
                <section className="flex flex-col gap-4 sm:flex-row">
                    <section className="flex flex-col gap-2">
                        <label htmlFor="name">Name:</label>
                        <input
                            className="w-54"
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            id="name"
                            value={name}
                            required
                            disabled={loading}
                        />
                    </section>
                    <section className="flex justify-between w-full sm:justify-start sm:gap-4">
                        <section className="flex flex-col gap-2">
                            <label htmlFor="calories">Calories: </label>
                            <input
                                className="w-20"
                                onChange={(e) =>
                                    setCalories(Number(e.target.value))
                                }
                                type="number"
                                id="calories"
                                value={calories}
                                required
                                disabled={loading}
                            />
                        </section>
                        <section className="flex flex-col gap-2">
                            <label htmlFor="carbs">Carbs: </label>
                            <input
                                className="w-14"
                                onChange={(e) =>
                                    setCarbs(Number(e.target.value))
                                }
                                type="number"
                                id="carbs"
                                value={carbs}
                                required
                                disabled={loading}
                            />
                        </section>

                        <section className="flex flex-col gap-2">
                            <label htmlFor="fats">Fats: </label>
                            <input
                                className="w-14"
                                onChange={(e) =>
                                    setFats(Number(e.target.value))
                                }
                                type="number"
                                id="fats"
                                value={fats}
                                required
                                disabled={loading}
                            />
                        </section>

                        <section className="flex flex-col gap-2">
                            <label htmlFor="protein">Protein: </label>
                            <input
                                className="w-14"
                                onChange={(e) =>
                                    setProtein(Number(e.target.value))
                                }
                                type="number"
                                id="protein"
                                value={protein}
                                required
                                disabled={loading}
                            />
                        </section>
                    </section>
                </section>

                <button
                    disabled={loading}
                    type="button"
                    onClick={createFoodEntry}
                    className="bg-indigo-600 hover:bg-indigo-500 text-[#fafafa] px-4 h-10 lg:mt-7 rounded-md disabled:bg-slate-400 disabled:cursor-wait sm"
                >
                    {loading ? "Adding..." : "Submit"}
                </button>
            </form>

            <NutritionJournal
                foodEntries={foodEntries}
                deleteFoodEntry={deleteFoodEntry}
            />
        </main>
    );
}

export default NutritionPage;
