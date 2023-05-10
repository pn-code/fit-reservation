"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import LineDivider from "./LineDivider";
import Spinner from "./Spinner";

export default function OverviewPhysicalActivitySection() {
    const [exerciseEntries, setExerciseEntries] = useState<ExerciseEntry[]>([]);
    const [loading, setLoading] = useState(true);

    const totalActivity = exerciseEntries.reduce(
        (acc, curr) => {
            if (curr.type === "cardio" && curr.duration != null) {
                acc.cardio = acc.cardio + curr.duration;
            } else if (
                curr.type === "resistance" &&
                curr.reps != null &&
                curr.sets != null
            ) {
                acc.resistance = acc.resistance + curr.reps * curr.sets;
            }
            return acc;
        },
        { resistance: 0, cardio: 0 }
    );

    useEffect(() => {
        async function fetchExerciseEntries() {
            const res = await axios.get("/api/exercise_entries");
            console.log(res);
            setExerciseEntries(res.data);
        }
        try {
            fetchExerciseEntries();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <section className="flex flex-col items-center gap-4 md:w-full mt-4">
            <h2 className="text-2xl font-semibold text-amber-400">
                Your Physical Activity
            </h2>

            {!loading ? (
                <>
                    <article className="flex flex-col items-center">
                        <h3 className="text-xl font-bold">Total Cardio</h3>
                        <span className="text-lg">
                            {totalActivity.cardio} minutes
                        </span>
                    </article>

                    <article className="flex flex-col items-center">
                        <h3 className="text-xl font-bold">Total Tonnage</h3>
                        <span className="text-lg">
                            {totalActivity.resistance} lbs
                        </span>
                    </article>
                </>
            ) : (
                <Spinner />
            )}
            <LineDivider hidden={true} />
        </section>
    );
}
