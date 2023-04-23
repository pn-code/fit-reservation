import TrackerHeader from "../../../components/TrackerHeader";
import MacroChart from "../../../components/MacroChart";
import LineDivider from "../../../components/LineDivider";
import getFoodEntries from "../../../helpers/getFoodEntries";
import FoodEntryCard from "../../../components/FoodEntryCard";
import ExerciseEntryCard from "../../../components/ExerciseEntryCard";
import getExerciseEntries from "../../../helpers/getExerciseEntries";
import moment from "moment";

const TrackerOverview = async () => {
	// Nutrition Data
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

	// Exercise Data
	const exerciseEntries = await getExerciseEntries();

	return (
		<main className="w-full h-full mt-24 bg-[#f3f3f3] px-4 py-6 rounded-md flex flex-col gap-4 shadow-md">
			<TrackerHeader title={"Tracker Overview"} />

			<section className="flex flex-col items-center w-full">
				<h2 className="text-2xl font-semibold text-slate-900 text-center">
					{moment().format("MMMM D, YYYY")}
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
						{totalCarbs != 0 &&
						totalFats != 0 &&
						totalProtein != 0 ? (
							<MacroChart
								carbs={totalCarbs || 0}
								fats={totalFats || 0}
								protein={totalProtein || 0}
							/>
						) : (
							<p className="text-slate-800">No Stats Available</p>
						)}
					</article>
				</section>
			</section>

			<section className="flex flex-col gap-4 md:flex-row md:justify-around md:gap-0">
				<section className="flex flex-col items-center gap-4 my-5">
					<LineDivider />
					<h2 className="text-2xl font-semibold text-indigo-700">
						Exercise Journal
					</h2>
					{exerciseEntries?.length === 0 && (
						<p className="font-semibold text-sm text-slate-800">
							Currently has no entries.
						</p>
					)}
					{exerciseEntries?.length! > 0 && (
						<table className="w-full text-left">
							<tbody>
								<th>Exercise</th>
								<th>Type</th>
								<th>Reps</th>
								<th>Weight</th>
								<th>Calories</th>
								<th>Action</th>
							</tbody>
							<tbody className="text-sm">
								{exerciseEntries?.map((entry) => (
									<ExerciseEntryCard
										id={entry.id}
										name={entry.name}
										type={entry.type}
										duration={entry.duration!}
										weight={entry.weight!}
										sets={entry.sets!}
										reps={entry.reps!}
										calories={entry.calories!}
										key={entry.id}
									/>
								))}
							</tbody>
						</table>
					)}
				</section>
				<section className="flex flex-col items-center gap-4 mt-5">
					<LineDivider />
					<h2 className="text-2xl font-semibold text-indigo-700">
						Nutrition Journal
					</h2>
					{foodEntries?.length === 0 && (
						<p className="font-semibold text-sm text-slate-800">
							Currently has no entries.
						</p>
					)}
					{foodEntries?.length! > 0 && (
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
								{foodEntries?.map((entry) => (
									<FoodEntryCard
										id={entry.id}
										name={entry.name}
										calories={entry.calories}
										carbs={entry.carbs}
										fats={entry.fats}
										protein={entry.protein}
										key={entry.id}
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
					)}
				</section>
			</section>
		</main>
	);
};

export default TrackerOverview;
