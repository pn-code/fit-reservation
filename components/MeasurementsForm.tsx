"use client";

import axios from "axios";
import { useState } from "react";
import { weightSchema } from "../validations/weightValidator";
import { toast } from "react-hot-toast";

function MeasurementsForm() {
	const [weight, setWeight] = useState<number>();
	const [bodyFat, setBodyFat] = useState<number>();

	const submitCurrentWeight = async () => {
		try {
			const validateWeight = weightSchema.parse(weight)

			if (validateWeight) {
				const res = await axios.post("/api/weight_measurements", {
					weight,
				});

				if (res.status === 200){
					toast.success(`Current weight has been updated to ${weight} lbs.`)
				} else {
					throw Error;
				}
			}
		} catch (error) {
			console.error(error);
			toast.error("We ran into an error...")
		}
	};

	return (
		<>
			<h2 className="text-slate-800 text-2xl font-semibold">
				Add Measurements
			</h2>

			<section className="flex flex-col gap-4 md:flex-row md:justify-start">
				<form className="flex flex-col gap-4 md:flex-row md:justify-start md:items-center">
					<label htmlFor="weight">Current Weight (lbs):</label>
					<input
						onChange={(e) => setWeight(Number(e.target.value))}
						value={weight}
						type="number"
						id="weight"
						placeholder="weight"
					/>
					<button
						onClick={submitCurrentWeight}
						type="button"
						className="bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white px-4 py-2 hover:underline"
					>
						Submit Weight
					</button>
				</form>

				<form className="flex flex-col gap-2 md:flex-row md:justify-start md:items-center">
					<label htmlFor="bf">Current Body Fat (%):</label>
					<input
						onChange={(e) => setBodyFat(Number(e.target.value))}
						value={bodyFat}
						type="number"
						id="bf"
						placeholder="Body Fat Percentage"
					/>
					<button className="bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white px-4 py-2 hover:underline">
						Submit Body Fat
					</button>
				</form>
			</section>
		</>
	);
}

export default MeasurementsForm;
