import React from "react";
import TrackerHeader from "../../../components/TrackerHeader";

function ExercisePage() {
	return (
		<main className="w-full h-full mt-24 bg-[#f3f3f3] px-4 py-6 rounded-md flex flex-col gap-4 shadow-md">
			<TrackerHeader title="Exercise" />
			<section className="bg-gray-100 text-black rounded-sm">
				<form className="flex flex-col gap-4 md:flex-row bg-gray-100 py-2 md:items-center">
					<label htmlFor="">Exercise</label>
					<input type="text" />
					<label htmlFor="">Weight</label>
					<input className="w-16" type="text" />
					<label htmlFor="">Reps</label>
					<input className="w-16" type="text" />
					<button className="bg-[#05204A] text-[#fafafa] px-4 py-2 rounded-md">
						Add Item
					</button>
				</form>
			</section>
		</main>
	);
}

export default ExercisePage;
