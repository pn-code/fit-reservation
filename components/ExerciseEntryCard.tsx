"use client";
import { X } from "lucide-react";

interface ExerciseEntryCardProps {
    id: number;
    name: string;
    type: string;
    duration: number;
    weight: number;
    sets: number;
    reps: number;
    calories: number;
    deleteExerciseEntry: (id: number) => void;
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
    deleteExerciseEntry,
}: ExerciseEntryCardProps) {
    return (
        <>
            <tr className="hover:bg-slate-200 cursor-pointer hover:text-indigo-600">
                <td>
                    {name.length > 30 ? name.substring(0, 30) + "..." : name}
                </td>
                <td>{type}</td>
                <td>
                    {type == "resistance"
                        ? `${sets} x ${reps}`
                        : duration + " mins"}
                </td>
                <td>{weight} lbs</td>
                <td>{calories}</td>
                <td>
                    <button onClick={() => deleteExerciseEntry(id)}>
                        <X
                            className="hover:bg-slate-300 ml-3 rounded-full"
                            color="red"
                        />
                    </button>
                </td>
            </tr>
        </>
    );
}

export default ExerciseEntryCard;
