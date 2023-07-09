"use client";
import { useEffect, useState } from "react";
import { exerciseEntrySchema } from "../validations/exerciseEntryValidator";
import { toast } from "react-hot-toast";
import axios from "axios";
import ExerciseJournal from "./ExerciseJournal";

export default function ExerciseForm() {
    const [exercise, setExercise] = useState("");
    const [type, setType] = useState("resistance");
    const [weight, setWeight] = useState(0);
    const [calories, setCalories] = useState(0);
    const [duration, setDuration] = useState(0);
    const [sets, setSets] = useState(0);
    const [reps, setReps] = useState(0);

    const [exercises, setExercises] = useState<ExerciseEntry[]>([]);
    const [plans, setPlans] = useState([]);
    const [selectPlanIndex, setSelectPlanIndex] = useState(-1);
    const [loadingExercises, setLoadingExercises] = useState<boolean>(true);

    // Form Change Toggle
    const [showExerciseForm, setExerciseForm] = useState(true);

    useEffect(() => {
        try {
            const getExerciseData = async () => {
                const res = await axios.get("/api/exercise_entries");
                if (res.status === 200) {
                    setExercises(res.data);
                }
            };

            const getPlanData = async () => {
                const res = await axios.get("/api/plans");
                if (res.status === 200) {
                    setPlans(res.data);
                }
            };
            getExerciseData();
            getPlanData();
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingExercises(false);
        }
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
            toast.error(`An error has occurred in one of the input fields!`);
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
            const res = await axios.delete(`/api/exercise_entries/${id}`);

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

    const updateExerciseEntry = async (
        exerciseId: number,
        exerciseType: string,
        { updatedSets = 1, updatedReps = 1, updatedWeight = 0 }
    ) => {
        try {
            const updatedExerciseEntry =
                exerciseType == "resistance"
                    ? {
                          sets: updatedSets,
                          reps: updatedReps,
                          weight: updatedWeight,
                          duration: 0,
                      }
                    : {
                          sets: updatedSets,
                          duration: updatedReps,
                          weight: updatedWeight,
                          reps: 0,
                      };

            const res = await axios.put(
                `/api/exercise_entries/${exerciseId}`,
                updatedExerciseEntry
            );
            console.log(res);

            if (res.status == 200) {
                toast.success("Successfully updated exercises.");
                setExercises((exercises) =>
                    exercises.map((exercise) =>
                        exercise.id === exerciseId
                            ? { ...exercise, ...updatedExerciseEntry }
                            : exercise
                    )
                );
            }
        } catch (error) {
            console.error(error);
            toast.error("Ran into an error!");
        }
    };

    const addPlanToJournal = async () => {
        const exercisesFromPlans = plans[selectPlanIndex].exercises;

        for (const planFromExercise of exercisesFromPlans) {
            try {
                const res = await axios.post("/api/exercise_entries", {
                    name: planFromExercise.name,
                    type: planFromExercise.type,
                    weight: 0,
                    calories: 0,
                    duration: 0,
                    sets: planFromExercise.sets,
                    reps: planFromExercise.reps,
                });
                console.log(res.data);
                setExercises((prev: ExerciseEntry[]) => [...prev, res.data]);
            } catch (error) {
                console.error(error);
                toast.error("Ran into an error");
            }
        }
    };

    return (
        <section className="flex flex-col gap-4">
            {/* Toggle Button */}
            <button
                type="button"
                onClick={() => setExerciseForm((form) => !form)}
            >
                Show {showExerciseForm ? "Plan Form" : "Exercise Form"}
            </button>

            {showExerciseForm ? (
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
                        <section className="flex gap-4 justify-between sm:justify-start">
                            <section className="flex flex-col gap-2">
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
                            </section>
                            <section className="flex flex-col gap-2">
                                <label htmlFor="duration">
                                    Duration (min):
                                </label>
                                <input
                                    className="w-24"
                                    type="number"
                                    id="duration"
                                    onChange={(e) =>
                                        setDuration(Number(e.target.value))
                                    }
                                    value={duration}
                                    min={0}
                                />
                            </section>
                        </section>
                    )}

                    {type === "resistance" && (
                        <section className="flex gap-4 justify-between sm:justify-start">
                            <section className="flex flex-col gap-2">
                                <label htmlFor="weight">Weight (lbs):</label>
                                <input
                                    className="w-20"
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
            ) : (
                <form className="w-full flex flex-col gap-8 lg:flex-row py-2 lg:items-center lg:justify-center">
                    <section className="flex flex-col gap-2">
                        <label htmlFor="select_plan">Selected Plan: </label>
                        <select
                            onChange={(e) => setSelectPlanIndex(e.target.value)}
                            name="select_plan"
                            id="select_plan"
                            value={selectPlanIndex}
                        >
                            <option value={-1}>NONE</option>
                            {plans.map((plan, idx) => (
                                <option key={plan.id} value={idx}>
                                    {plan.name}
                                </option>
                            ))}
                        </select>
                    </section>
                    <button type="button" onClick={addPlanToJournal}>
                        Add Plan
                    </button>
                </form>
            )}

            <ExerciseJournal
                exercises={exercises}
                deleteExerciseEntry={deleteExerciseEntry}
                updateExerciseEntry={updateExerciseEntry}
                loadingExercises={loadingExercises}
            />
        </section>
    );
}
