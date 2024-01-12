import MeasurementsComponent from "@/components/dashboard/MeasurementsComponent";

export const metadata = {
    title: "Dashboard | FitHeroes",
};

async function DashboardPage() {
	return (
		<main className="w-full min-h-[calc(100vh-120px)] mb-12 py-6 rounded-md flex flex-col gap-4 shadow-md px-4 md:px-[4%]">
			<header className="flex justify-between font-bold pb-2 border-b-2 border-slate-900 items-center">
				<h1 className="text-2xl">Dashboard</h1>
			</header>

			<MeasurementsComponent />
		</main>
	);
}

export default DashboardPage;
