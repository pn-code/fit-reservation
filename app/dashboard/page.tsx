import MeasurementsComponent from "../../components/MeasurementsComponent";

export const metadata = {
    title: "Dashboard | FitHeroes",
};

async function DashboardPage() {
	return (
		<main className="w-full min-h-[calc(100vh-120px)] mb-12 bg-gray-900 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 sm:px-[20%] text-white/90">
			<header className="flex justify-between font-bold pb-2 border-b-2 border-b-indigo-600 items-center">
				<h1 className="text-3xl">Dashboard</h1>
			</header>

			<MeasurementsComponent />
		</main>
	);
}

export default DashboardPage;
