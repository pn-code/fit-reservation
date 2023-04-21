import MeasurementsForm from "../../components/MeasurementsForm";

async function DashboardPage() {
	return (
		<main className="w-full h-full mt-24 bg-[#f3f3f3] px-4 py-6 rounded-md flex flex-col gap-4 shadow-md">
			<header className="flex justify-between font-bold pb-2 border-b-2 border-b-[#F15B2A] items-center">
				<h1 className="text-3xl">Dashboard</h1>
			</header>

			{/* Add Measurements */}
			<h2 className="text-slate-800 text-2xl font-semibold">
				Add Measurements
			</h2>
			<MeasurementsForm />

			{/* Calorie Goals */}
			<section></section>
		</main>
	);
}

export default DashboardPage;
