import MacroChart from "../../components/MacroChart";

function DashboardPage() {
	return (
		<main className="h-[100vh-200px] w-full mt-32 mx-4">
			<header>
				<h1>Dashboard</h1>
			</header>
			<main>
				<MacroChart />
			</main>
		</main>
	);
}

export default DashboardPage;
