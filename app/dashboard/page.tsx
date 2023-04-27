import MeasurementsForm from "../../components/MeasurementsForm";
import StatisticsSection from "../../components/StatisticsSection";

async function DashboardPage() {
	return (
		<main className="w-full h-full bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-10 text-white/90">
			<header className="flex justify-between font-bold pb-2 border-b-2 border-b-indigo-600 items-center">
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
