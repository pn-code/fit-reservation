"use client";
import axios from "axios";
import { useState } from "react";

function MeasurementsForm() {
	const [weight, setWeight] = useState(160);
	const [bodyFat, setBodyFat] = useState(15);

	const submitCurrentWeight = async () => {
		try {
			const res = await axios.post("/api/weight_measurements", {
				weight,
			});
			console.log(res);
		} catch (error) {
			console.error(error);
		}
	};
	const submitCurrentBodyFat = async () => {
		try {
			const res = await axios.post("/api/bf_measurements", {
				bodyfat: bodyFat,
			});
			console.log(res);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<section className="flex flex-col gap-4 md:flex-row md:justify-start">
			<form className="flex flex-col gap-4 md:flex-row md:justify-start md:items-center">
				<label htmlFor="weight">Current Weight (lbs):</label>
				<input
					type="number"
					id="weight"
					value={weight}
					onChange={(e) => setWeight(Number(e.target.value))}
					required
					min={70}
					max={1000}
				/>
				<button
					type="button"
					onClick={submitCurrentWeight}
					className="bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white px-4 py-2 hover:underline"
				>
					Submit Weight
				</button>
			</form>

			<form className="flex flex-col gap-2 md:flex-row md:justify-start md:items-center">
				<label htmlFor="bf">Current Body Fat (%):</label>
				<input
					type="number"
					id="bf"
					value={bodyFat}
					onChange={(e) => setBodyFat(Number(e.target.value))}
					required
					min={2}
					max={99}
				/>
				<button
					type="button"
					onClick={submitCurrentBodyFat}
					className="bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white px-4 py-2 hover:underline"
				>
					Submit Body Fat
				</button>
			</form>
		</section>
	);
}
export default MeasurementsForm;
