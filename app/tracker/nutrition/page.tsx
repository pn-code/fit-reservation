import Link from "next/link";
import FoodEntryClientComponent from "../../../components/FoodEntryClientComponent";
import TrackerHeader from "../../../components/TrackerHeader";
import { currentUser } from "@clerk/nextjs/app-beta";

export const metadata = {
    title: "Nutrition Tracker | FitHeroes",
};

async function NutritionPage() {
	const user = await currentUser();

	return (
		<main className="w-full h-full bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-10 text-white/90">
			<TrackerHeader title="Nutrition" />
			<Link
				className="text-sm text-amber-400 hover:text-amber-300 hover:underline-offset-2 hover:underline"
				href={`/tracker/nutrition/user/${user?.id}`}
				passHref={true}
			>
				See previous journals
			</Link>

			<FoodEntryClientComponent />
		</main>
	);
}

export default NutritionPage;
