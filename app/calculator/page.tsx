import CalculatorForm from "../../components/CalculatorForm";
import getCalorieGoal from "../../helpers/getCalorieGoal";

const CalculatorPage = async () => {
	const currentCalorieGoal = await getCalorieGoal();
	return (
		<main className="w-full h-full mt-24 bg-[#f3f3f3] px-4 py-6 rounded-md flex flex-col gap-4 shadow-md md:items-center">
			<header className="flex justify-between  pb-2 border-b-2 border-b-[#F15B2A] items-center md:gap-32">
				<h1 className="text-3xl font-bold">Calculator</h1>
				<span className="text-sm">
					Current Goal: {currentCalorieGoal} kcal
				</span>
			</header>

			<CalculatorForm />
		</main>
	);
};

export default CalculatorPage;
