import TrackerHeader from "../../../components/TrackerHeader";
import MacroChart from "../../../components/MacroChart";

const Tracker = () => {
	return (
		<main className="w-full h-[calc(100vh-96px)] mt-24 bg-[#f3f3f3] px-4 py-6 rounded-md flex flex-col gap-4 shadow-md">
			<TrackerHeader title={"Tracker Overview"} />

			<section className="flex flex-col items-center w-full">
				<h2 className="text-2xl font-semibold text-slate-900 text-center">
					April 19, 2023
				</h2>
				<div className="w-full border-b-2 border-b-orange-600 pb-4"></div>
			</section>

			<section className="flex flex-col items-center gap-4">
				<h2 className="text-2xl font-semibold text-indigo-700">Your Nutrition</h2>
				<article className="flex flex-col items-center">
					<h3 className="text-xl text-slate-900 font-bold">
						Total Calories
					</h3>
					<span className="text-lg text-slate-800">1800 kcal</span>
				</article>

				<article className="flex flex-col items-center">
					<h3 className="text-xl text-slate-900 font-bold">
						Macronutrients
					</h3>
					<MacroChart carbs={300} fats={60} protein={200} />
				</article>
			</section>
		</main>
	);
};

export default Tracker;
