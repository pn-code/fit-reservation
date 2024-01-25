"use client";
import axios from "axios";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface FoodEntryCardProps {
    id: number;
    name: string;
    calories: number;
    carbs: number;
    fats: number;
    protein: number;
    allowDelete?: boolean;
}

function FoodEntryCard({
    id,
    name,
    calories,
    carbs,
    fats,
    protein,
    allowDelete,
}: FoodEntryCardProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const deleteFoodEntry = async (id: number) => {
        try {
            setLoading(true);
            await axios.delete(`/api/food_entries/${id}`);
            toast.success("Food entry successfully deleted.");
            router.refresh();
        } catch (error) {
            toast.error(
                "An error has occurred while deleting this food entry."
            );
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <tr className="text-xs sm:text-[14px] bg-white border border-primary">
            <td className="p-2 whitespace-nowrap">
                {name.length > 30 ? name.substring(0, 30) + "..." : name}
            </td>
            <td className="p-2 whitespace-nowrap">{calories}</td>
            <td className="p-2 whitespace-nowrap hidden sm:table-cell">
                {carbs}g
            </td>
            <td className="p-2 whitespace-nowrap hidden sm:table-cell">
                {fats}g
            </td>
            <td className="p-2 whitespace-nowrap hidden sm:table-cell">
                {protein}g
            </td>
            <td className="sm:hidden">{`${carbs}/${fats}/${protein}`}</td>
            {allowDelete && (
                <td className="p-2 whitespace-nowrap flex justify-end md:mr-4">
                    <button
                        className="btn btn--danger"
                        onClick={() => deleteFoodEntry(id)}
                        disabled={loading}
                    >
                        X
                    </button>
                </td>
            )}
        </tr>
    );
}

export default FoodEntryCard;
