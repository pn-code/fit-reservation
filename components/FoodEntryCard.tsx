"use client";
import { X } from "lucide-react";

interface FoodEntryCardProps {
	id: number;
	name: string;
	calories: number;
	carbs: number;
	fats: number;
	protein: number;
	deleteFoodEntry: any
}

function FoodEntryCard({
	id,
	name,
	calories,
	carbs,
	fats,
	protein,
	deleteFoodEntry
}: FoodEntryCardProps) {
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
					<button onClick={() => deleteFoodEntry(id)}>
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
