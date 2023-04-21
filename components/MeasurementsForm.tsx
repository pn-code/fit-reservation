"use client";

function MeasurementsForm() {
	return (
		<section className="flex flex-col gap-4 md:flex-row md:justify-start">
			<form className="flex flex-col gap-4 md:flex-row md:justify-start md:items-center">
				<label htmlFor="weight">Current Weight (lbs):</label>
				<input type="number" id="weight" />
				<button className="bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white px-4 py-2 hover:underline">
					Submit Weight
				</button>
			</form>

			<form className="flex flex-col gap-2 md:flex-row md:justify-start md:items-center">
				<label htmlFor="bf">Current Body Fat (%):</label>
				<input type="number" id="bf" />
				<button className="bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white px-4 py-2 hover:underline">
					Submit Body Fat
				</button>
			</form>
		</section>
	);
}

export default MeasurementsForm;
