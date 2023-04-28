"use client";
import { useEffect, useState } from "react";
import LineDivider from "./LineDivider";
import axios from "axios";
import ExerciseEntryCard from "./ExerciseEntryCard";
import { ExerciseEntry } from "@prisma/client";

export default function ExerciseJournal() {
    const [exercises, setExercises] = useState<ExerciseEntry[]>([]);

    useEffect(() => {
        const getExerciseData = async () => {
            const res = await axios.get("/api/exercise_entries");
            setExercises(res.data);
        };
        getExerciseData();
    }, []);

    console.log(exercises)

    return (
        <section className="flex flex-col items-center gap-4 py-5 w-full lg:w-[60%]">
            <LineDivider />
            <h2 className="text-2xl font-semibold text-amber-400">
                Exercise Journal
            </h2>
            {exercises.length === 0 && (
                <p className="font-semibold text-sm">
                    Currently has no entries.
                </p>
            )}
            {exercises.length! > 0 && (
                <table className="w-full text-left border-slate-50">
                    <thead>
                        <tr>
                            <th>Exercise</th>
                            <th>Type</th>
                            <th>Reps</th>
                            <th>Weight</th>
                            <th>Calories</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody className="text-sm">
                        {exercises?.map((entry) => (
                            <ExerciseEntryCard
                                id={entry.id}
                                name={entry.name}
                                type={entry.type}
                                duration={entry.duration!}
                                weight={entry.weight!}
                                sets={entry.sets!}
                                reps={entry.reps!}
                                calories={entry.calories!}
                                key={entry.id}
                            />
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
}
