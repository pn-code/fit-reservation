import MeasurementsForm from "../../components/MeasurementsForm";
import StatisticsSection from "../../components/StatisticsSection";

async function DashboardPage() {
	return (
		<main className="w-full h-full mt-24 bg-[#f3f3f3] px-4 py-6 rounded-md flex flex-col gap-4 shadow-md">
			<header className="flex justify-between font-bold pb-2 border-b-2 border-b-[#F15B2A] items-center">
				<h1 className="text-3xl">Dashboard</h1>
			</header>

			{/* Statistics */}
			<StatisticsSection/>

			{/* Add Measurements */}
			<MeasurementsForm />

			{/* Calorie Goals */}
			<section></section>
		</main>
	);
}

export default DashboardPage;
