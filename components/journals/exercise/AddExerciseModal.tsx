"use client";

import { exerciseSchema } from "@/validations/exerciseValidator";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

interface AddExerciseModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    isOpen: boolean;
    date: string;
}

export default function AddExerciseModal({
    isOpen,
    setIsOpen,
    date,
}: AddExerciseModalProps) {
    const [exercise, setExercise] = useState("");
    const [type, setType] = useState("");
    const [weight, setWeight] = useState(0);
    const [sets, setSets] = useState(0);
    const [reps, setReps] = useState(0);
    const [calories, setCalories] = useState(0);
    const [duration, setDuration] = useState(0);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const addExercise = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);

            const exerciseObj = {
                name: exercise,
                type,
                weight,
                sets,
                reps,
                calories,
                duration,
                date,
            };

            exerciseSchema.parse(exerciseObj);

            await axios.post("/api/exercise_entries", exerciseObj);
            toast.success(`${exercise} has been added to your journal.`);
            setExercise("");
            setType("");
            setCalories(0);
            setDuration(0);
            setSets(0);
            setReps(0);
            setWeight(0);
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
                    <h2>Add Exercise Entry</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="btn btn--primary"
                    >
                        X
                    </button>
                </header>

                <form
                    onSubmit={addExercise}
                    className="w-full flex flex-col gap-4"
                >
                    <section className="flex flex-col gap-2 w-full">
                        <label htmlFor="exercise">Exercise: </label>
                        <input
                            type="text"
                            id="exercise"
                            onChange={(e) => setExercise(e.target.value)}
                            value={exercise}
                            placeholder="Exercise Name"
                            required
                        />
                    </section>

                    <section className="flex flex-col gap-2 w-full">
                        <label htmlFor="type">Type: </label>
                        <select
                            name="type"
                            id="type"
                            onChange={(e) => setType(e.target.value)}
                            value={type}
                            required
                        >
                            <option value="">SELECT TYPE</option>
                            <option value="resistance">Resistance</option>
                            <option value="cardio">Cardio</option>
                        </select>
                    </section>

                    {type === "resistance" && (
                        <section className="flex flex-col md:flex-row md:justify-between gap-2 w-full">
                            <section className="flex flex-col gap-2">
                                <label htmlFor="weight">Weight (lbs):</label>
                                <input
                                    className="w-full"
                                    type="number"
                                    id="weight"
                                    onChange={(e) =>
                                        setWeight(
                                            Number.parseFloat(e.target.value)
                                        )
                                    }
                                    value={weight}
                                    min={0}
                                />
                            </section>

                            <section className="flex flex-col gap-2">
                                <label htmlFor="sets">Sets:</label>
                                <input
                                    className="w-full"
                                    type="text"
                                    id="sets"
                                    onChange={(e) =>
                                        setSets(Number(e.target.value))
                                    }
                                    value={sets}
                                    min={0}
                                />
                            </section>

                            <section className="flex flex-col gap-2">
                                <label htmlFor="reps">Reps:</label>
                                <input
                                    className="w-full"
                                    type="text"
                                    id="reps"
                                    onChange={(e) =>
                                        setReps(Number(e.target.value))
                                    }
                                    value={reps}
                                    min={0}
                                />
                            </section>
                        </section>
                    )}
                    {type === "cardio" && (
                        <section className="flex flex-col md:flex-row gap-2 justify-between w-full">
                            <section className="flex flex-col gap-2">
                                <label htmlFor="calories">Calories:</label>
                                <input
                                    className="w-full"
                                    type="text"
                                    id="calories"
                                    onChange={(e) =>
                                        setCalories(Number(e.target.value))
                                    }
                                    value={calories}
                                />
                            </section>
                            <section className="flex flex-col gap-2">
                                <label htmlFor="duration">
                                    Duration (min):
                                </label>
                                <input
                                    className="w-full"
                                    type="number"
                                    id="duration"
                                    onChange={(e) =>
                                        setDuration(Number(e.target.value))
                                    }
                                    value={duration}
                                    min={0}
                                />
                            </section>
                            <section className="flex flex-col gap-2">
                                <label htmlFor="distance">Distance (mi)</label>
                                <input
                                    className="w-full"
                                    type="number"
                                    id="distance"
                                    onChange={(e) =>
                                        setReps(Number(e.target.value))
                                    }
                                    value={reps}
                                    min={0}
                                />
                            </section>
                        </section>
                    )}

                    <button
                        disabled={loading}
                        type="submit"
                        className="btn btn--primary"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
