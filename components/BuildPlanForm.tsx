"use client";
import { useState } from "react";

export default function BuildPlanForm() {
    const [planName, setPlanName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [type, setType] = useState<string>("resistance");
    const [exercise, setExercise] = useState<string>("");
    const [sets, setSets] = useState<number>(0);
    const [reps, setReps] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    return (
        <section>
            <form className="flex flex-col gap-4 justify-center bg-gray-800 px-4 py-2 rounded-md">
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
                        onChange={(e) => setDuration(Number(e.target.value))}
                    />
                </section>
            </form>
        </section>
    );
}
