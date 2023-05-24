"use client";
import axios from "axios";
import { useState } from "react";

export default function BuildPlanForm() {
    const [planName, setPlanName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [exercise, setExercise] = useState<string>("");
    const [type, setType] = useState<string>("resistance");
    const [sets, setSets] = useState<number>(0);
    const [reps, setReps] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    const [exercises, setExercises] = useState<Exercise[]>([]);

    const addExerciseToList = () => {
        const exerciseObj = { name: exercise, type, sets, reps, duration };

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
        console.log(planObj)
        const res = await axios.post("/api/plans", planObj);

        console.log(res)
    };

    return (
        <section className="flex flex-col gap-4 lg:flex-row">
            <form className="flex flex-col gap-4 justify-center bg-gray-800 px-4 py-2 rounded-md">
                <h2 className="text-lg font-bold">Plan Details</h2>
                {/* Plan Name */}
                <section className="flex flex-col gap-2">
                    <label htmlFor="name">Plan Name</label>
                    <input
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
                    <label htmlFor="description">Plan Description</label>
                    <textarea
                        id="description"
                        className="w-full sm:w-72 p-2 rounded-sm text-black"
                        value={description}
                        placeholder="Add Description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </section>

                <form className="flex flex-col gap-4 justify-center bg-gray-800 py-2 rounded-md">
                    <h2 className="text-lg font-bold">Add Exercises</h2>
                    {/* Exercise Name */}
                    <section className="flex flex-col gap-2">
                        <label htmlFor="exercise">Exercise</label>
                        <input
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
                            id="sets"
                            className="w-full sm:w-72"
                            type="text"
                            value={sets}
                            placeholder="Add sets"
                            onChange={(e) => setSets(Number(e.target.value))}
                        />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="reps">Reps</label>
                        <input
                            id="reps"
                            className="w-full sm:w-72"
                            type="text"
                            value={reps}
                            placeholder="Add reps"
                            onChange={(e) => setReps(Number(e.target.value))}
                        />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="duration">Duration (min)</label>
                        <input
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
                        onClick={addExerciseToList}
                        type="button"
                        className="w-full sm:w-72 bg-green-600 hover:bg-green-700 rounded-lg mt-4 text-white px-4 py-2 hover:underline"
                    >
                        Add Exercise
                    </button>
                </form>

                {/* Exercise List */}
                <section className="w-full">
                    <h2 className="text-lg font-bold">Exercise List</h2>

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
                            {exercises.map((exercise) => (
                                <tr className="w-full text-xs sm:text-[14px] bg-blue-900/20 hover:bg-indigo-600 cursor-pointer hover:text-white">
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
                </section>

                <button
                    onClick={handleSubmitPlan}
                    type="button"
                    className="w-full sm:w-72 bg-indigo-600 hover:bg-indigo-700 rounded-lg mt-4 text-white px-4 py-2 hover:underline"
                >
                    Submit
                </button>
            </form>
        </section>
    );
}
