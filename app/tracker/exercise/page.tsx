"use client";
import { useState } from "react";
import TrackerHeader from "../../../components/TrackerHeader";

function ExercisePage() {
	const [exercise, setExercise] = useState("");
	const [type, setType] = useState("resistance");
	const [weight, setWeight] = useState(0);
	const [calories, setCalories] = useState(0);
	const [duration, setDuration] = useState(0);
	const [sets, setSets] = useState(0);
	const [reps, setReps] = useState(0);

	return (
		<main className="w-full h-full mt-24 bg-[#f3f3f3] px-4 py-6 rounded-md flex flex-col gap-4 shadow-md">
			<TrackerHeader title="Exercise" />
			<section className="bg-gray-100 text-black rounded-sm">
				<form className="flex flex-col gap-4 md:flex-row bg-gray-100 py-2 md:items-center">
					<label htmlFor="exercise">Exercise: </label>
					<input
						type="text"
						id="exercise"
						onChange={(e) => setExercise(e.target.value)}
						value={exercise}
						placeholder="exercise name"
						required
					/>

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

					{type === "cardio" && (
						<section className="flex justify-between my-4">
							<>
								<label htmlFor="duration">
									Duration (minutes):
								</label>
								<input
									className="w-16"
									type="number"
									id="duration"
									onChange={(e) =>
										setDuration(
											Number.parseInt(e.target.value)
										)
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
										setCalories(
											Number.parseInt(e.target.value)
										)
									}
									value={calories}
								/>
							</>
						</section>
					)}

					{type === "resistance" && (
						<section className="flex justify-between my-4">
							<label htmlFor="weight">Weight (lbs):</label>
							<input
								className="w-16"
								type="number"
								id="weight"
								onChange={(e) =>
									setWeight(Number.parseFloat(e.target.value))
								}
								value={weight}
								min={0}
							/>

							<label htmlFor="sets">Sets:</label>
							<input
								className="w-16"
								type="text"
								id="sets"
								onChange={(e) =>
									setSets(Number.parseInt(e.target.value))
								}
								value={sets}
								min={0}
							/>

							<label htmlFor="reps">Reps:</label>
							<input
								className="w-16"
								type="text"
								id="reps"
								onChange={(e) =>
									setReps(Number.parseInt(e.target.value))
								}
								value={reps}
								min={0}
							/>
						</section>
					)}

					<button className="bg-[#05204A] text-[#fafafa] px-4 py-2 rounded-md">
						Add Item
					</button>
				</form>
			</section>
		</main>
	);
}

export default ExercisePage;
