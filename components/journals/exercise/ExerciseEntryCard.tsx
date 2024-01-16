"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ExerciseEntryCardProps {
    id: number;
    name: string;
    type: string;
    duration: number;
    weight: number;
    sets: number;
    reps: number;
    calories: number;
}

function ExerciseEntryCard({
    id,
    name,
    type,
    duration,
    weight,
    sets,
    reps,
    calories,
}: ExerciseEntryCardProps) {
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const deleteExerciseEntry = async (id: number) => {
        try {
            setLoading(true);
            await axios.delete(`/api/exercise_entries/${id}`);
            toast.success("Successfully deleted entry.")
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.error("An error has occurred!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <tr className="text-xs sm:text-sm bg-white">
            <td className="py-2 whitespace-nowrap">
                <div className="p-2">
                    {name.length > 30 ? name.substring(0, 30) + "..." : name}
                </div>
            </td>

            <td className="py-2 whitespace-nowrap">
                <div className="p-2">
                    {type === "resistance"
                        ? `${sets} sets`
                        : `${duration} mins`}
                </div>
            </td>

            <td className="py-2 whitespace-nowrap">
                <div className="p-2">
                    {type === "resistance" ? `${reps} reps` : `${reps} mi`}
                </div>
            </td>

            <td className="py-2 whitespace-nowrap">
                <div className="p-2">
                    {type === "resistance"
                        ? `${weight} lbs`
                        : `${calories} Cal`}
                </div>
            </td>

            <td className="py-2 whitespace-nowrap flex">
                <section className="flex items-center gap-2">
                    <button
                        className="btn btn--danger"
                        disabled={loading}
                        onClick={() => deleteExerciseEntry(id)}
                    >
                        X
                    </button>
                </section>
            </td>
        </tr>
    );
}

export default ExerciseEntryCard;
