import React from "react";
import TrackerHeader from "../../../components/TrackerHeader";

function NutritionPage() {
	return (
		<main className="w-full h-full mt-24 bg-[#f3f3f3] px-4 py-6 rounded-md flex flex-col gap-4 shadow-md">
			<TrackerHeader title="Nutrition" />

			<form className="flex flex-col gap-4 md:flex-row bg-gray-100 py-2 md:items-center">
				<label htmlFor="">Food</label>
				<input type="text" />
				<label htmlFor="">Calories</label>
				<input type="text" />
				<button className="bg-[#05204A] text-[#fafafa] px-4 py-2 rounded-md">
					Add Item
				</button>
			</form>
		</main>
	);
}

export default NutritionPage;
