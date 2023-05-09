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
            <tr className="text-[14px] bg-blue-900/20 hover:bg-indigo-600 cursor-pointer hover:text-white">
                <td className="p-2 whitespace-nowrap">
                    {name.length > 30 ? name.substring(0, 30) + "..." : name}
                </td>
                <td className="p-2 whitespace-nowrap">{type}</td>
                <td className="p-2 whitespace-nowrap">
                    {type == "resistance"
                        ? `${sets} x ${reps}`
                        : duration + " mins"}
                </td>
                <td className="p-2 whitespace-nowrap">{weight} lbs</td>
                <td className="p-2 whitespace-nowrap">{calories}</td>
                <td className="p-2 whitespace-nowrap">
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
