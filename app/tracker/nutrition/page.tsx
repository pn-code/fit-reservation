"use client";
import { useState } from "react";
import TrackerHeader from "../../../components/TrackerHeader";
import { foodEntrySchema } from "../../../validations/foodEntryValidator";
import { ZodError } from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function NutritionPage() {
	const [name, setName] = useState("");
	const [calories, setCalories] = useState(0);
	const [carbs, setCarbs] = useState(0);
	const [fats, setFats] = useState(0);
	const [protein, setProtein] = useState(0);

	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const validateFoodIntake = () => {
		const foodIntake = {
			name,
			calories,
			carbs,
			fats,
			protein,
		};

		try {
			foodEntrySchema.parse(foodIntake);
			return true;
		} catch (error) {
			if (error instanceof ZodError) {
				toast.error("An error has occurred during validation.");
			}
		}
	};

	const createFoodEntry = async () => {
		setLoading(true);

		try {
			if (validateFoodIntake()) {
				await axios.post("/api/food_entries", {
					name,
					calories,
					carbs,
					fats,
					protein,
				});
	
				toast.success(`${name} has been added.`);
				router.refresh();
			}
		} catch (error) {
			toast.error("An error has occurred.");
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="w-full h-full mt-24 bg-[#f3f3f3] px-4 py-6 rounded-md flex flex-col gap-4 shadow-md">
			<TrackerHeader title="Nutrition" />
			<h2 className="text-xl font-semibold">Food Info</h2>
			<form className="flex flex-col gap-4 md:flex-row bg-gray-100 py-2 md:items-center">
				<label htmlFor="name">Name</label>
				<input
					onChange={(e) => setName(e.target.value)}
					type="text"
					id="name"
					value={name}
					required
					disabled={loading}
				/>

				<label htmlFor="calories">Calories</label>
				<input
					onChange={(e) => setCalories(Number(e.target.value))}
					type="number"
					id="calories"
					value={calories}
					required
					disabled={loading}
				/>

				<h2 className="text-xl font-semibold mt-4">
					Macros (optional)
				</h2>
				<label htmlFor="carbs">Carbs</label>
				<input
					onChange={(e) => setCarbs(Number(e.target.value))}
					type="number"
					id="carbs"
					value={carbs}
					required
					disabled={loading}
				/>
				<label htmlFor="fats">Fats</label>
				<input
					onChange={(e) => setFats(Number(e.target.value))}
					type="number"
					id="fats"
					value={fats}
					required
					disabled={loading}
				/>
				<label htmlFor="protein">Protein</label>
				<input
					onChange={(e) => setProtein(Number(e.target.value))}
					type="number"
					id="protein"
					value={protein}
					required
					disabled={loading}
				/>
				<button
					disabled={loading}
					type="button"
					onClick={createFoodEntry}
					className="bg-[#05204A] text-[#fafafa] px-4 py-2 rounded-md disabled:bg-slate-400 disabled:cursor-wait"
				>
					{loading ? "Adding..." : "Add Item"}
				</button>
			</form>
		</main>
	);
}

export default NutritionPage;
