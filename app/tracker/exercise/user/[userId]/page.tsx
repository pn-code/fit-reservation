import { currentUser } from "@clerk/nextjs/app-beta";
import { prisma } from "../../../../../lib/client";
import Link from "next/link";

export const metadata = {
    title: "All Exercise Journals | FitHeroes",
};

async function fetchUserExerciseJournals(userId: string) {
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
	const journals = await fetchUserExerciseJournals(user?.id as string);

	const sortedJournals = journals ? sortEntriesByDate(journals) : [];
	const dates = Object.keys(sortedJournals);

	return (
		<main className="w-full h-full bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-10 text-white/90">
			<header className="flex justify-between font-bold pb-2 border-b-2 border-b-indigo-600 items-center">
				<h1 className="text-3xl">
					{`${user?.firstName || "User"}'s Exercise Journals`}
				</h1>
				<Link
					className="bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white px-4 py-3"
					passHref={true}
					href="/tracker/exercise"
				>
					Back
				</Link>
			</header>

			{/* Render Journals */}
			<section>
				<div className="flex flex-col gap-4">
					{dates.map((date) => (
						<div key={date}>
							<h2 className="text-lg text-amber-300">{date}</h2>
							<table className="w-full">
								<thead className="text-left">
									<tr>
										<th className="w-44">Exercise Name</th>
										<th>Exercise Details</th>
									</tr>
								</thead>
								{sortedJournals[date].map(
									(item: ExerciseEntry) => (
										<tbody key={item.id}>
											<tr>
												<td>{item.name}</td>

												{item.type == "resistance" ? (
													<td>{`${item.sets} x ${item.reps} at ${item.weight}lbs`}</td>
												) : (
													<td>
														{item.duration} mins
													</td>
												)}
											</tr>
										</tbody>
									)
								)}
							</table>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}
