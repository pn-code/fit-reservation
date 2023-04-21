"use client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

interface FoodEntryCardProps {
	name: string;
	calories: number;
	carbs: number;
	fats: number;
	protein: number;
}

function FoodEntryCard({
	id,
	name,
	calories,
	carbs,
	fats,
	protein,
}: FoodEntryCardProps) {
	const router = useRouter();

	const handleDeleteFoodEntry = async (id: number) => {
		try {
			await axios.delete("/api/food_entries", {
				data: {
					id: id,
				},
			});
			toast.success(`Successfully deleted item ${name.length > 30 ? name.substring(0, 30) + "..." : name}!`);
			router.refresh();
		} catch (error) {
			toast.error(
				`An error has occurred while attempting to delete ${name}.`
			);
		}
	};

	return (
		<>
			<tr className="hover:bg-slate-200 cursor-pointer hover:text-indigo-600">
				<td>
					{name.length > 30 ? name.substring(0, 30) + "..." : name}
				</td>
				<td>{calories}</td>
				<td>{carbs}g</td>
				<td>{fats}g</td>
				<td>{protein}g</td>
				<td>
					<button onClick={() => handleDeleteFoodEntry(id)}>
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

export default FoodEntryCard;
