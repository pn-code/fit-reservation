"use client";

import { exerciseSchema } from "@/validations/exerciseValidator";
import { foodEntrySchema } from "@/validations/foodEntryValidator";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

interface AddFoodModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    isOpen: boolean;
    date: string;
}

export default function AddFoodModal({
    isOpen,
    setIsOpen,
    date,
}: AddFoodModalProps) {
    const [name, setName] = useState("");
    const [calories, setCalories] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [fats, setFats] = useState(0);
    const [protein, setProtein] = useState(0);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const addFood = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);

            const foodObj = {
                name,
                calories,
                carbs,
                fats,
                protein,
                date,
            };

            foodEntrySchema.parse(foodObj);

            await axios.post("/api/food_entries", foodObj);
            toast.success(`${name} has been added to your journal.`);
            setName("");
            setCalories(0);
            setCarbs(0);
            setFats(0);
            setProtein(0);
            setIsOpen(false);
            router.refresh();
        } catch (error) {
            toast.error("An error has occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bg-black/80 top-0 left-0 w-full h-full md:h-full z-50 flex justify-center pt-14 md:pt-[8%]">
            <div className="bg-white w-[340px] md:w-[500px] p-4 my-4 md:px-8 rounded border border-primary h-[420px] md:h-fit flex flex-col gap-4 overflow-y-auto">
                <header className="flex justify-between items-center gap-4">
                    <h2>Add Nutrition Entry</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="btn btn--primary"
                    >
                        X
                    </button>
                </header>

                <form
                    onSubmit={addFood}
                    className="w-full flex flex-col gap-8 py-2 lg:justify-between"
                >
                    <section className="flex flex-col gap-4">
                        <section className="flex flex-col gap-2">
                            <label htmlFor="name">Nutrition Item:</label>
                            <input
                                className="w-54"
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                id="name"
                                value={name}
                                required
                                disabled={loading}
                                placeholder="Nutrition Item Name"
                            />
                        </section>
                        <section className="flex justify-between w-full md:justify-between sm:gap-4">
                            <section className="flex flex-col gap-2">
                                <label htmlFor="calories">Calories: </label>
                                <input
                                    className="w-full"
                                    onChange={(e) =>
                                        setCalories(Number(e.target.value))
                                    }
                                    type="number"
                                    id="calories"
                                    value={calories}
                                    required
                                    disabled={loading}
                                    min={0}
                                    max={10000}
                                />
                            </section>
                            <section className="flex flex-col gap-2">
                                <label htmlFor="carbs">Carbs: </label>
                                <input
                                    className="w-full"
                                    onChange={(e) =>
                                        setCarbs(Number(e.target.value))
                                    }
                                    type="number"
                                    id="carbs"
                                    value={carbs}
                                    required
                                    disabled={loading}
                                    min={0}
                                    max={1000}
                                />
                            </section>

                            <section className="flex flex-col gap-2">
                                <label htmlFor="fats">Fats: </label>
                                <input
                                    className="w-full"
                                    onChange={(e) =>
                                        setFats(Number(e.target.value))
                                    }
                                    type="number"
                                    id="fats"
                                    value={fats}
                                    required
                                    disabled={loading}
                                    min={0}
                                    max={1000}
                                />
                            </section>

                            <section className="flex flex-col gap-2">
                                <label htmlFor="protein">Protein: </label>
                                <input
                                    className="w-full"
                                    onChange={(e) =>
                                        setProtein(Number(e.target.value))
                                    }
                                    type="number"
                                    id="protein"
                                    value={protein}
                                    required
                                    disabled={loading}
                                    min={0}
                                    max={1000}
                                />
                            </section>
                        </section>
                    </section>

                    <button
                        disabled={loading}
                        type="submit"
                        className="btn btn--primary"
                    >
                        {loading ? "Adding..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}
