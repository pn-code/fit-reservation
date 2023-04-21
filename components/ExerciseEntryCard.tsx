"use client"
import axios from "axios";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
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
	const router = useRouter();

	const handleDeleteExerciseEntry = async (id: number) => {
		try {
			await axios.delete("/api/exercise_entries", {
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
				<td>{type}</td>
				<td>
					{type == "resistance"
						? `${sets} x ${reps}`
						: duration + " mins"}
				</td>
				<td>{weight} lbs</td>
				<td>{calories}</td>
				<td>
					<button onClick={() => handleDeleteExerciseEntry(id)}>
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
