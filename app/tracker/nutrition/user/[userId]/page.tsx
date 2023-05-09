import { currentUser } from "@clerk/nextjs/app-beta";
import { prisma } from "../../../../../lib/client";
import Link from "next/link";

export const metadata = {
    title: "All Nutrition Journals | FitHeroes",
};

async function fetchUserNutritionJournals(userId: string) {
	const journals = await prisma.foodEntry.findMany({
		where: { userId: userId },
		orderBy: {
			date: "desc",
		},
	});
	return journals;
}

function sortEntriesByDate(entriesArr: any[]) {
	const sortedEntries = entriesArr.reduce((acc, curr) => {
		const currentEntryDate = curr.date;
		const convertDateToUserTimezone = new Date(currentEntryDate)
			.toLocaleString()
			.substring(0, 11)
			.replace(",", "")
			.split(" ")[0];

		// If converted time already exists in acc, then add it to the end of the array
		if (acc[convertDateToUserTimezone]) {
			acc[convertDateToUserTimezone] = [
				...acc[convertDateToUserTimezone],
				curr,
			];
		} else {
			// If converted time does not exist in acc, then create it and add curr obj to array
			acc[convertDateToUserTimezone] = [curr];
		}
		return acc;
	}, {});

	return sortedEntries;
}

export default async function UserNutritionJournals() {
	const user = await currentUser();
	const journals = await fetchUserNutritionJournals(user?.id as string);

	const sortedJournals = journals ? sortEntriesByDate(journals) : [];
	const dates = Object.keys(sortedJournals);

	return (
		<main className="w-full h-full bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 sm:px-10 text-white/90">
			<header className="flex justify-between font-bold pb-2 border-b-2 border-b-indigo-600 items-center">
				<h1 className="text-3xl">
					{`${user?.firstName || "User"}'s Nutrition Journals`}
				</h1>
				<Link
					className="bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white px-4 py-3"
					passHref={true}
					href="/tracker/nutrition"
				>
					Back
				</Link>
			</header>

			{/* Render Journals */}
			<section>
				<div>
					{dates.map((date) => (
						<div key={date}>
							<h2 className="text-lg text-amber-300">{date}</h2>
							<table className="w-full">
								<thead className="text-left">
									<tr>
										<th className="w-56">Name</th>
										<th>Calories</th>
										<th>Carbs</th>
										<th>Fats</th>
										<th>Protein</th>
									</tr>
								</thead>
								{sortedJournals[date].map((item: FoodEntry) => (
									<tbody key={item.id}>
										<tr>
											<td>
												{item.name.length > 20
													? `${item.name.substring(
															0,
															20
													  )}...`
													: item.name}
											</td>
											<td>{item.calories}</td>
											<td>{item.carbs} g</td>
											<td>{item.fats} g</td>
											<td>{item.protein} g</td>
										</tr>
									</tbody>
								))}
							</table>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}
