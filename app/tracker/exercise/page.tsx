"use client";
import { useState } from "react";
import TrackerHeader from "../../../components/TrackerHeader";
import { exerciseEntrySchema } from "../../../validations/exerciseEntryValidator";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

function ExercisePage() {
	const [exercise, setExercise] = useState("");
	const [type, setType] = useState("resistance");
	const [weight, setWeight] = useState(0);
	const [calories, setCalories] = useState(0);
	const [duration, setDuration] = useState(0);
	const [sets, setSets] = useState(0);
	const [reps, setReps] = useState(0);

	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const validateExerciseSchema = () => {
		try {
			exerciseEntrySchema.parse({
				name: exercise,
				type,
				weight,
				calories,
				duration,
				sets,
				reps,
			});
			return true;
		} catch (error) {
			toast.error(`An error has occurred in one of the input fields!}`);
			return false;
		}
	};

	const createExerciseEntry = async () => {
		setLoading(true);
		try {
			const validated = validateExerciseSchema();
			if (validated) {
				await axios.post("/api/exercise_entries", {
					name: exercise,
					type,
					weight,
					calories,
					duration,
					sets,
					reps,
				});

				toast.success(`${exercise} has been added.`);
				router.refresh();
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="w-full h-full mt-24 bg-[#f3f3f3] px-4 py-6 rounded-md flex flex-col gap-4 shadow-md">
			<TrackerHeader title="Exercise" />
			<section className="bg-gray-100 text-black rounded-sm">
				<form className="flex flex-col gap-8 lg:flex-row bg-gray-100 py-2 lg:items-center">
					<section className="flex items-center space-x-2">
						<label htmlFor="exercise">Exercise: </label>
						<input
							type="text"
							id="exercise"
							onChange={(e) => setExercise(e.target.value)}
							value={exercise}
							placeholder="exercise name"
							required
						/>
					</section>

					<section className="flex items-center space-x-2">
						<label htmlFor="type">Type: </label>
						<select
							name="type"
							id="type"
							onChange={(e) => setType(e.target.value)}
							value={type}
							required
						>
							<option value="resistance">Resistance</option>
							<option value="cardio">Cardio</option>
						</select>
					</section>

					{type === "cardio" && (
						<section className="flex lg:justify-between gap-4">
							<>
								<label htmlFor="duration">
									Duration (minutes):
								</label>
								<input
									className="w-16"
									type="number"
									id="duration"
									onChange={(e) =>
										setDuration(Number(e.target.value))
									}
									value={duration}
									min={0}
								/>
							</>
							<>
								<label htmlFor="calories">Calories:</label>
								<input
									className="w-16"
									type="text"
									id="calories"
									onChange={(e) =>
										setCalories(Number(e.target.value))
									}
									value={calories}
								/>
							</>
						</section>
					)}

					{type === "resistance" && (
						<section className="flex lg:justify-between gap-4">
							<section className="flex items-center space-x-2">
								<label htmlFor="weight">Weight (lbs):</label>
								<input
									className="w-16"
									type="number"
									id="weight"
									onChange={(e) =>
										setWeight(
											Number.parseFloat(e.target.value)
										)
									}
									value={weight}
									min={0}
								/>
							</section>

							<section className="flex items-center space-x-2">
								<label htmlFor="sets">Sets:</label>
								<input
									className="w-16"
									type="text"
									id="sets"
									onChange={(e) =>
										setSets(Number(e.target.value))
									}
									value={sets}
									min={0}
								/>
							</section>

							<section className="flex items-center space-x-2">
								<label htmlFor="reps">Reps:</label>
								<input
									className="w-16"
									type="text"
									id="reps"
									onChange={(e) =>
										setReps(Number(e.target.value))
									}
									value={reps}
									min={0}
								/>
							</section>
						</section>
					)}

					<button
						disabled={loading}
						onClick={createExerciseEntry}
						type="button"
						className="bg-[#05204A] text-[#fafafa] px-4 py-2 rounded-md disabled:bg-slate-400 disabled:cursor-not-allowed"
					>
						Add Item
					</button>
				</form>
			</section>
		</main>
	);
}

export default ExercisePage;
