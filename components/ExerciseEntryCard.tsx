"use client";
import { ArrowBigLeft, Check, Edit, X } from "lucide-react";
import { useState } from "react";

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
    const [isEditing, setIsEditing] = useState(false);

    return (
        <tr className="text-xs sm:text-sm bg-blue-900/20 hover:bg-indigo-600 cursor-pointer hover:text-white">
            <td className="py-2 whitespace-nowrap">
                <div>
                    {name.length > 30 ? name.substring(0, 30) + "..." : name}
                </div>
            </td>
            <td className="py-2 whitespace-nowrap hidden sm:table-cell">
                <div>{type}</div>
            </td>
            <td className="py-2 whitespace-nowrap">
                {isEditing ? (
                    <input className="w-9" aria-label="Exercise Sets" />
                ) : (
                    <div>{sets}</div>
                )}
            </td>
            <td className="py-2 whitespace-nowrap">
                {isEditing ? (
                    <input
                        className="w-9"
                        aria-label="Exercise repetitions or duration"
                    />
                ) : (
                    <div>
                        {type == "resistance" ? `${reps}` : duration + " mins"}
                    </div>
                )}
            </td>
            <td className="py-2 whitespace-nowrap">
                {isEditing ? (
                    <input className="w-12" aria-label="Exercise weight" />
                ) : (
                    <div>{weight} lbs</div>
                )}
            </td>
            <td className="py-2 whitespace-nowrap hidden sm:table-cell">
                {isEditing ? (
                    <input
                        className="w-12"
                        aria-label="Calories burnt during exercise"
                    />
                ) : (
                    <div>{calories}</div>
                )}
            </td>
            <td className="py-2 whitespace-nowrap flex">
                <section className="flex items-center gap-2">
                    {!isEditing && (
                        <button onClick={() => deleteExerciseEntry(id)}>
                            <X
                                className="hover:bg-slate-300 rounded-full p-1 text-red-500"
                                size={30}
                            />
                        </button>
                    )}
                    <button onClick={() => setIsEditing((editing) => !editing)}>
                        {!isEditing ? (
                            <Edit
                                className="hover:bg-slate-300 rounded-full text-green-500 p-1"
                                size={30}
                            />
                        ) : (
                            <ArrowBigLeft
                                className="hover:bg-slate-300 rounded-full p-1 text-red-500"
                                size={30}
                            />
                        )}
                    </button>
                    {isEditing && (
                        <button>
                            <Check
                                className="hover:bg-slate-300 rounded-full p-1 text-green-500"
                                size={30}
                            />
                        </button>
                    )}
                </section>
            </td>
        </tr>
    );
}

export default ExerciseEntryCard;
