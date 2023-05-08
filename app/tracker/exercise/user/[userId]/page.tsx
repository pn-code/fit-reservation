import { currentUser } from "@clerk/nextjs/app-beta";
import { prisma } from "../../../../../lib/client";

async function fetchUserNutritionJournals(userId: string) {
	const journals = await prisma.exerciseEntry.findMany({
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

export default async function UserExerciseJournals() {
	const user = await currentUser();
	const journals = await fetchUserNutritionJournals(user?.id as string);

	const sortedJournals = journals ? sortEntriesByDate(journals) : [];
	const dates = Object.keys(sortedJournals);

	return (
		<main className="w-full h-full bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-10 text-white/90">
			<header className="flex justify-between font-bold pb-2 border-b-2 border-b-indigo-600 items-center">
				<h1 className="text-3xl">
					{`${user?.firstName || "User"}'s Exercise Journals`}
				</h1>
			</header>

			{/* Render Journals */}
			<section>
				<div>
					{dates.map((date) => (
						<div key={date}>
							<h2 className="text-lg text-amber-300">{date}</h2>
							<table>
								<thead className="text-left">
									<tr>
										<th>Name</th>
										<th>Calories</th>
										<th>Carbs</th>
										<th>Fats</th>
										<th>Protein</th>
									</tr>
								</thead>
								{sortedJournals[date].map((item: ExerciseEntry) => (
									<tbody key={item.id}>
										<tr>
											<td>{item.name}</td>
											<td>{item.type}</td>
											<td>{item.weight} g</td>
											<td>{item.sets} g</td>
											<td>{item.reps} g</td>
											<td>{item.duration} g</td>
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
