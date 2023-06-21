import CalculatorForm from "../../components/CalculatorForm";
import MacroBuilder from "../../components/MacroBuilder";
import MacroRecommendations from "../../components/MacroRecommendations";
import getCalorieGoal from "../../helpers/getCalorieGoal";
import getCurrentBF from "../../helpers/getCurrentBF";
import getCurrentWeight from "../../helpers/getCurrentWeight";

export const metadata = {
	title: "Calculator | FitHeroes",
};

const CalculatorPage = async () => {
	const currentCalorieGoal = await getCalorieGoal();
	const currentWeight = await getCurrentWeight();
	const currentBF = await getCurrentBF();

	const calculateRecommendedProteinIntake = (
		bodyfat: number | undefined,
		weight: number | undefined
	) => {
		// Return lean body mass * .8
		if (!bodyfat || !weight) return null;
		const leanBodyMass = (1 - bodyfat * 0.01) * weight;
		return Math.round(leanBodyMass * 0.8);
	};

	const recommendedProteinIntake = calculateRecommendedProteinIntake(
		currentBF,
		currentWeight
	);

	return (
		<main className="w-full h-full mb-12 bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 sm:px-10 text-white/90">
			<header className="flex flex-col w-full gap-2">
				<h1 className="text-3xl font-bold border-b-indigo-600 border-b-2">
					Calculator
				</h1>
				<span className="text-[16px] font-semibold text-amber-400">
					Current Goal: {currentCalorieGoal} kcal
				</span>
			</header>

			<section className="flex flex-col sm:flex-row sm:justify-between gap-4">
				<CalculatorForm />
				<MacroBuilder currentCalorieGoal={currentCalorieGoal} />
			</section>
			<section>
				<MacroRecommendations
					recommendedProteinIntake={recommendedProteinIntake}
				/>
			</section>
		</main>
	);
};

export default CalculatorPage;
