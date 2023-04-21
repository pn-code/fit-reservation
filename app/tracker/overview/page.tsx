import TrackerHeader from "../../../components/TrackerHeader";
import MacroChart from "../../../components/MacroChart";
import LineDivider from "../../../components/LineDivider";
import getFoodEntries from "../../../helpers/getFoodEntries";
import FoodEntryCard from "../../../components/FoodEntryCard";
import ExerciseEntryCard from "../../../components/ExerciseEntryCard";

const TrackerOverview = async () => {
	const foodEntries = await getFoodEntries();
	const totalCalories = foodEntries?.reduce(
		(acc, curr) => curr.calories + acc,
		0
	);
	const totalCarbs = foodEntries?.reduce((acc, curr) => curr.carbs + acc, 0);
	const totalFats = foodEntries?.reduce((acc, curr) => curr.fats + acc, 0);
	const totalProtein = foodEntries?.reduce(
		(acc, curr) => curr.protein + acc,
		0
	);

	return (
		<main className="w-full h-full mt-24 bg-[#f3f3f3] px-4 py-6 rounded-md flex flex-col gap-4 shadow-md">
			<TrackerHeader title={"Tracker Overview"} />

			<section className="flex flex-col items-center w-full">
				<h2 className="text-2xl font-semibold text-slate-900 text-center">
					April 19, 2023
				</h2>
				<LineDivider />
			</section>

			<section className="flex flex-col md:flex-row md:justify-around">
				{/* Physical Activity Section */}
				<section className="flex flex-col items-center gap-4 md:w-full">
					<h2 className="text-2xl font-semibold text-indigo-700">
						Your Physical Activity
					</h2>

					<article className="flex flex-col items-center">
						<h3 className="text-xl text-slate-900 font-bold">
							Activity Goal
						</h3>
						<span className="text-lg text-slate-800">90 mins</span>
					</article>

					<article className="flex flex-col items-center">
						<h3 className="text-xl text-slate-900 font-bold">
							Total Activity
						</h3>
						<span className="text-lg text-slate-800">96 mins</span>
					</article>
					<LineDivider hidden={true} />
				</section>

				{/* Nutrition Section */}
				<section className="flex flex-col items-center gap-4 md:w-full">
					<h2 className="text-2xl font-semibold text-indigo-700">
						Your Nutrition
					</h2>
					<article className="flex flex-col items-center">
						<h3 className="text-xl text-slate-900 font-bold">
							Total Calories
						</h3>
						<span className="text-lg text-slate-800">
							{totalCalories} kcal
						</span>
					</article>

					<article className="flex flex-col items-center w-[80%] md:w-full max-w-[400px]">
						<h3 className="text-xl text-slate-900 font-bold">
							Macronutrients
						</h3>
						<MacroChart
							carbs={totalCarbs || 0}
							fats={totalFats || 0}
							protein={totalProtein || 0}
						/>
					</article>
				</section>
			</section>

			<section className="flex flex-col items-center gap-4 mt-5">
				<LineDivider />
				<h2 className="text-2xl font-semibold text-indigo-700">
					Nutrition Journal
				</h2>
				<table className="w-full text-left">
					<tbody>
						<th>Name</th>
						<th>Calories</th>
						<th>Carbs</th>
						<th>Fats</th>
						<th>Protein</th>
						<th>Action</th>
					</tbody>
					<tbody className="text-sm">
						{foodEntries?.map((foodEntry) => (
							<FoodEntryCard
								id={foodEntry.id}
								name={foodEntry.name}
								calories={foodEntry.calories}
								carbs={foodEntry.carbs}
								fats={foodEntry.fats}
								protein={foodEntry.protein}
								key={foodEntry.id}
							/>
						))}
					</tbody>
					<tbody className="border-t border-slate-900 text-sm">
						<tr>
							<th>Total</th>
							<th>{totalCalories}</th>
							<th>{totalCarbs}g</th>
							<th>{totalFats}g</th>
							<th>{totalProtein}g</th>
						</tr>
					</tbody>
				</table>
			</section>

			<section className="flex flex-col items-center gap-4 mt-5">
				<LineDivider />
				<h2 className="text-2xl font-semibold text-indigo-700">
					Exercise Journal
				</h2>
				<table className="w-full text-left">
					<tbody>
						<th>Exercise</th>
						<th>Type</th>
						<th>Reps</th>
						<th>Calories</th>
						<th>Action</th>
					</tbody>
					<tbody className="text-sm">
						<ExerciseEntryCard/>
					</tbody>
				</table>
			</section>
		</main>
	);
};

export default TrackerOverview;
