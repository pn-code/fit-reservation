"use client";
import { X } from "lucide-react";

interface FoodEntryCardProps {
    id: number;
    name: string;
    calories: number;
    carbs: number;
    fats: number;
    protein: number;
    deleteFoodEntry: (id: number) => void;
    allowDelete?: boolean;
}

function FoodEntryCard({
    id,
    name,
    calories,
    carbs,
    fats,
    protein,
    deleteFoodEntry,
    allowDelete,
}: FoodEntryCardProps) {
    return (
        <>
            <tr className="text-xs sm:text-[14px] bg-blue-900/20 hover:bg-indigo-600 cursor-pointer hover:text-white">
                <td className="py-2 whitespace-nowrap">
                    {name.length > 30 ? name.substring(0, 30) + "..." : name}
                </td>
                <td className="py-2 whitespace-nowrap">{calories}</td>
                <td className="py-2 whitespace-nowrap hidden sm:table-cell">
                    {carbs}g
                </td>
                <td className="py-2 whitespace-nowrap hidden sm:table-cell">
                    {fats}g
                </td>
                <td className="py-2 whitespace-nowrap hidden sm:table-cell">
                    {protein}g
                </td>
                <td className="sm:hidden">{`${carbs}/${fats}/${protein}`}</td>
                {allowDelete && (
                    <td className="p-2 whitespace-nowrap">
                        <button onClick={() => deleteFoodEntry(id)}>
                            <X
                                className="hover:bg-white ml-3 rounded-full"
                                color="red"
                                size={24}
                            />
                        </button>
                    </td>
                )}
            </tr>
        </>
    );
}

export default FoodEntryCard;
