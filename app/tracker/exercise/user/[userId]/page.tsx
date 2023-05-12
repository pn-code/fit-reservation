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
        <main className="w-full min-h-[calc(100vh-90px)] bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 sm:px-10 text-white/90">
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

            {journals.length === 0 && <span>No journals were found.</span>}

            {/* Render Journals */}
            <section>
                <div className="flex flex-col gap-4">
                    {dates.map((date) => (
                        <div key={date}>
                            <h2 className="text-lg text-amber-300">{date}</h2>
                            <div className="py-2 w-full sm:w-[75%]">
                                <div className="overflow-x-auto w-full">
                                    <table className="table-auto w-full">
                                        <thead className="h-8 text-xs sm:text-[16px] font-semibold uppercase text-yellow-50 bg-blue-900/60">
                                            <tr className="p-2 whitespace-nowrap">
                                                <th className="w-44">
                                                    <div className="font-semibold text-left">
                                                        Exercise Name
                                                    </div>
                                                </th>
                                                <th>
                                                    <div className="font-semibold text-left">
                                                        Exercise Details
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        {sortedJournals[date].map(
                                            (item: ExerciseEntry) => (
                                                <tbody
                                                    className="text-sm divide-y divide-gray-100"
                                                    key={item.id}
                                                >
                                                    <tr className="text-[14px] bg-blue-900/20 hover:bg-indigo-600 cursor-pointer hover:text-white">
                                                        <td className="py-2 whitespace-nowrap">
                                                            {item.name}
                                                        </td>

                                                        {item.type ==
                                                        "resistance" ? (
                                                            <td className="py-2 whitespace-nowrap">{`${item.sets} x ${item.reps} at ${item.weight}lbs`}</td>
                                                        ) : (
                                                            <td className="py-2 whitespace-nowrap">
                                                                {item.duration}{" "}
                                                                mins
                                                            </td>
                                                        )}
                                                    </tr>
                                                </tbody>
                                            )
                                        )}
                                    </table>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
