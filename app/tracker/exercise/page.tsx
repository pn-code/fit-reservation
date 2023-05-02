"use client";
import { useEffect, useState } from "react";
import TrackerHeader from "../../../components/TrackerHeader";
import { exerciseEntrySchema } from "../../../validations/exerciseEntryValidator";
import { toast } from "react-hot-toast";
import axios from "axios";
import ExerciseJournal from "../../../components/ExerciseJournal";

function ExercisePage() {
    const [exercise, setExercise] = useState("");
    const [type, setType] = useState("resistance");
    const [weight, setWeight] = useState(0);
    const [calories, setCalories] = useState(0);
    const [duration, setDuration] = useState(0);
    const [sets, setSets] = useState(0);
    const [reps, setReps] = useState(0);

    const [exercises, setExercises] = useState<ExerciseEntry[]>([]);

    useEffect(() => {
        const getExerciseData = async () => {
            const res = await axios.get("/api/exercise_entries");
            setExercises(res.data);
        };
        getExerciseData();
    }, []);

    const [loading, setLoading] = useState(false);

    const validateExerciseSchema = () => {
        try {
            exerciseEntrySchema.parse({
                name: exercise,
                type,
                weight,
                calories,
                duration,
                sets,
                reps,
            });
            return true;
        } catch (error) {
            toast.error(`An error has occurred in one of the input fields!}`);
            return false;
        }
    };

    const createExerciseEntry = async () => {
        setLoading(true);
        try {
            const validated = validateExerciseSchema();
            if (validated) {
                const res = await axios.post("/api/exercise_entries", {
                    name: exercise,
                    type,
                    weight,
                    calories,
                    duration,
                    sets,
                    reps,
                });

                toast.success(`${exercise} has been added.`);

                setExercises((prev: ExerciseEntry[]) => [...prev, res.data]);

                // Clear Inputs
                setExercise("");
                setType("resistance");
                setWeight(0);
                setCalories(0);
                setDuration(0);
                setSets(0);
                setReps(0);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteExerciseEntry = async (id: number) => {
        try {
            const res = await axios.delete("/api/exercise_entries", {
                data: {
                    id: id,
                },
            });

            toast.success(
                `Successfully deleted: ${res.data.name.substring(0, 30)}!`
            );

            const updatedExercises = exercises.filter(
                (exercise) => exercise.id != id
            );

            setExercises(updatedExercises);
        } catch (error) {
            toast.error(
                `An error has occurred while attempting to delete item.`
            );
        }
    };

    return (
        <main className="w-full h-full bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-10 text-white/90">
            <TrackerHeader title="Exercise" />
            <h2 className="text-xl font-semibold max-w-[120px]">
                Add Exercise
            </h2>

            <form className="w-full flex flex-col gap-8 lg:flex-row py-2 lg:items-center lg:justify-center">
                <section className="flex flex-col gap-2">
                    <label htmlFor="exercise">Exercise: </label>
                    <input
                        type="text"
                        id="exercise"
                        onChange={(e) => setExercise(e.target.value)}
                        value={exercise}
                        placeholder="exercise name"
                        required
                    />
                </section>

                <section className="flex flex-col gap-2">
                    <label htmlFor="type">Type: </label>
                    <select
                        name="type"
                        id="type"
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                        required
                    >
                        <option value="resistance">Resistance</option>
                        <option value="cardio">Cardio</option>
                    </select>
                </section>

                {type === "cardio" && (
                    <section className="flex lg:justify-between gap-4">
                        <>
                            <label htmlFor="duration">
                                Duration (minutes):
                            </label>
                            <input
                                className="w-16"
                                type="number"
                                id="duration"
                                onChange={(e) =>
                                    setDuration(Number(e.target.value))
                                }
                                value={duration}
                                min={0}
                            />
                        </>
                        <>
                            <label htmlFor="calories">Calories:</label>
                            <input
                                className="w-16"
                                type="text"
                                id="calories"
                                onChange={(e) =>
                                    setCalories(Number(e.target.value))
                                }
                                value={calories}
                            />
                        </>
                    </section>
                )}

                {type === "resistance" && (
                    <section className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                        <section className="flex flex-col gap-2">
                            <label htmlFor="weight">Weight (lbs):</label>
                            <input
                                className="w-24"
                                type="number"
                                id="weight"
                                onChange={(e) =>
                                    setWeight(Number.parseFloat(e.target.value))
                                }
                                value={weight}
                                min={0}
                            />
                        </section>

                        <section className="flex flex-col gap-2">
                            <label htmlFor="sets">Sets:</label>
                            <input
                                className="w-16"
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
                                className="w-16"
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

                <button
                    disabled={loading}
                    onClick={createExerciseEntry}
                    type="button"
                    className="lg:mt-7 bg-indigo-600 hover:bg-indigo-500 text-[#fafafa] px-4 py-2 rounded-md disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                    Add Item
                </button>
            </form>

            <ExerciseJournal
                exercises={exercises}
                deleteExerciseEntry={deleteExerciseEntry}
            />
        </main>
    );
}

export default ExercisePage;
