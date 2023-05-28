"use client";
import axios from "axios";
import { useState } from "react";
import { exerciseSchema } from "../validations/exerciseValidator";
import { toast } from "react-hot-toast";
import { planSchema } from "../validations/planValidator";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function BuildPlanForm() {
    const [planName, setPlanName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [exercise, setExercise] = useState<string>("");
    const [type, setType] = useState<string>("resistance");
    const [sets, setSets] = useState<number>(0);
    const [reps, setReps] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    const [exercises, setExercises] = useState<Exercise[]>([]);

    const [loading, setLoading] = useState(false);

    const user = useUser();
    const router = useRouter();

    const validateExercise = (exercise: any) => {
        try {
            if (exerciseSchema.parse(exercise)) {
                return true;
            }
        } catch (error) {
            toast.error("Something went wrong during validation!");
            return false;
        }
    };

    const addExerciseToList = () => {
        const exerciseObj = { name: exercise, type, sets, reps, duration };

        if (!validateExercise(exerciseObj)) return;

        setExercises((prev) => {
            return [...prev, exerciseObj];
        });

        setExercise("");
        setType("resistance");
        setSets(0);
        setReps(0);
        setDuration(0);
    };

    const handleSubmitPlan = async () => {
        const planObj = { name: planName, description, exercises };
        setLoading(true);
        try {
            planSchema.parse(planObj);

            const res = await axios.post("/api/plans", planObj);

            if (res.status === 200) {
                toast.success("Successfully built your new plan!");
            }
            router.refresh()
            router.push(`/plans/${user?.user?.id}`);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex flex-col gap-4">
            <form className="flex flex-col gap-4 justify-center bg-gray-800 px-4 py-2 rounded-md sm:flex-row">
                {/* Form Section */}
                <section className="flex flex-col w-full gap-4">
                    <section className="w-full flex flex-col gap-4">
                        <h2 className="text-lg font-bold">Plan Details</h2>
                        {/* Plan Name */}
                        <section className="flex flex-col gap-2">
                            <label htmlFor="name">Plan Name</label>
                            <input
                                disabled={loading}
                                id="name"
                                className="w-full sm:w-72"
                                type="text"
                                value={planName}
                                placeholder="Add Plan Name"
                                onChange={(e) => setPlanName(e.target.value)}
                            />
                        </section>
                        {/* Description */}
                        <section className="flex flex-col gap-2">
                            <label htmlFor="description">
                                Plan Description
                            </label>
                            <textarea
                                disabled={loading}
                                id="description"
                                className="w-full sm:w-72 p-2 rounded-sm text-black"
                                value={description}
                                placeholder="Add Description"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </section>
                    </section>

                    <section className="w-full flex flex-col gap-2">
                        <h2 className="text-lg font-bold">Add Exercises</h2>
                        {/* Exercise Name */}
                        <section className="flex flex-col gap-2">
                            <label htmlFor="exercise">Exercise</label>
                            <input
                                disabled={loading}
                                id="exercise"
                                className="w-full sm:w-72"
                                type="text"
                                value={exercise}
                                placeholder="Add exercise"
                                onChange={(e) => setExercise(e.target.value)}
                            />
                        </section>

                        {/* Type */}
                        <section className="flex flex-col gap-2">
                            <label htmlFor="type">Type</label>
                            <select
                                disabled={loading}
                                className="w-full sm:w-72"
                                name="type"
                                id="type"
                                onChange={(e) => setType(e.target.value)}
                                value={type}
                            >
                                <option value="resistance">Resistance</option>
                                <option value="cardio">Cardio</option>
                            </select>
                        </section>

                        <section className="flex flex-col gap-2">
                            <label htmlFor="sets">Sets</label>
                            <input
                                disabled={loading}
                                id="sets"
                                className="w-full sm:w-72"
                                type="text"
                                value={sets}
                                placeholder="Add sets"
                                onChange={(e) =>
                                    setSets(Number(e.target.value))
                                }
                            />
                        </section>

                        <section className="flex flex-col gap-2">
                            <label htmlFor="reps">Reps</label>
                            <input
                                disabled={loading}
                                id="reps"
                                className="w-full sm:w-72"
                                type="text"
                                value={reps}
                                placeholder="Add reps"
                                onChange={(e) =>
                                    setReps(Number(e.target.value))
                                }
                            />
                        </section>

                        <section className="flex flex-col gap-2">
                            <label htmlFor="duration">Duration (min)</label>
                            <input
                                disabled={loading}
                                id="duration"
                                className="w-full sm:w-72"
                                type="text"
                                value={duration}
                                placeholder="Add duration in minutes"
                                onChange={(e) =>
                                    setDuration(Number(e.target.value))
                                }
                            />
                        </section>

                        <button
                            disabled={loading}
                            onClick={addExerciseToList}
                            type="button"
                            className="w-full sm:w-72 bg-green-600 hover:bg-green-700 rounded-lg mt-4 text-white px-4 py-2 hover:underline disabled:bg-gray-300"
                        >
                            Add Exercise
                        </button>
                    </section>
                </section>

                <section className="w-full flex flex-col gap-4">
                    <h2 className="text-lg font-bold">Exercise List</h2>
                    {/* Exercise List */}
                    <table className="table-auto w-full">
                        <thead className="h-8 text-xs sm:text-[16px] font-semibold uppercase text-yellow-50 bg-blue-900/60">
                            <tr className="p-2 whitespace-nowrap">
                                <th>
                                    <div className="font-semibold text-left">
                                        Exercise
                                    </div>
                                </th>
                                <th>
                                    <div className="font-semibold text-left">
                                        Type
                                    </div>
                                </th>
                                <th>
                                    <div className="font-semibold text-left">
                                        Reps
                                    </div>
                                </th>
                                <th>
                                    <div className="font-semibold text-left">
                                        Duration
                                    </div>
                                </th>
                            </tr>
                        </thead>

                        <tbody className="text-sm divide-y divide-gray-100 w-full">
                            {exercises.map((exercise, idx) => (
                                <tr
                                    key={idx}
                                    className="w-full text-xs sm:text-[14px] bg-blue-900/20 hover:bg-indigo-600 cursor-pointer hover:text-white"
                                >
                                    <td className="py-2 whitespace-nowrap">
                                        {exercise.name}
                                    </td>
                                    <td className="py-2 whitespace-nowrap">
                                        {exercise.type}
                                    </td>
                                    <td className="py-2 whitespace-nowrap">{`${exercise.sets} x ${exercise.reps}`}</td>
                                    <td className="py-2 whitespace-nowrap">
                                        {exercise.duration}m
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <section className="flex justify-end">
                        <button
                            disabled={loading}
                            onClick={handleSubmitPlan}
                            type="button"
                            className="w-full sm:w-40 bg-indigo-600 hover:bg-indigo-700 rounded-lg mt-4 text-white px-4 py-2 hover:underline disabled:bg-gray-300"
                        >
                            Submit
                        </button>
                    </section>
                </section>
            </form>
        </section>
    );
}
