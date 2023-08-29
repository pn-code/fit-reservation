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
  console.log(sortedJournals);

  const findTotalsFromJournalDate = (journalEntry: any[]) => {
    return journalEntry.reduce(
      (acc, curr) => {
        acc.calories += curr.calories;
        acc.carbs += curr.carbs;
        acc.fats += curr.fats;
        acc.protein += curr.protein;

        return acc;
      },
      {
        calories: 0,
        carbs: 0,
        fats: 0,
        protein: 0,
      }
    );
  };

  const dates = Object.keys(sortedJournals);

  return (
    <main className="w-full min-h-[calc(100vh-90px)] bg-gray-900 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 lg:px-[20%] text-white/90">
      <header className="flex justify-between font-bold pb-2 border-b-2 border-b-indigo-600 items-center">
        <h1 className="text-3xl">
          {`${user?.firstName || "User"}'s Nutrition Journals`}
        </h1>
        <Link
          className="bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white px-4 py-3"
          passHref={true}
          href="/journal"
        >
          Back
        </Link>
      </header>

      {journals.length === 0 && <span>No journals were found.</span>}

      {/* Render Journals */}
      <section>
        <div>
          {dates.map((date) => (
            <div key={date}>
              <h2 className="text-lg text-amber-300">{date}</h2>
              <div className="py-2 w-full sm:w-[75%]">
                <div className="overflow-x-auto w-full">
                  <table className="table-auto w-full">
                    <thead className="h-8 text-xs sm:text-[16px] font-semibold uppercase text-yellow-50 bg-blue-900/60">
                      <tr className="p-2 whitespace-nowrap">
                        <th className="w-40 sm:w-56">
                          <div className="font-semibold text-left">Name</div>
                        </th>
                        <th>
                          <div className="font-semibold text-left">
                            Calories
                          </div>
                        </th>
                        <th className="hidden sm:table-cell">
                          <div className="font-semibold text-left">Carbs</div>
                        </th>
                        <th className="hidden sm:table-cell">
                          <div className="font-semibold text-left">Fats</div>
                        </th>
                        <th className="hidden sm:table-cell">
                          <div className="font-semibold text-left">Protein</div>
                        </th>
                        <th className="sm:hidden">
                          <div className="font-semibold text-left">C/F/P</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-[14px] bg-blue-900/20 hover:bg-indigo-600 cursor-pointer hover:text-white">
                        <td className="py-2 whitespace-nowrap bg-gray-800">
                          TOTAL
                        </td>
                        <td className="py-2 whitespace-nowrap bg-gray-800">
                          {
                            findTotalsFromJournalDate(sortedJournals[date])
                              .calories
                          }
                        </td>
                        <td className="py-2 whitespace-nowrap bg-gray-800">
                          {
                            findTotalsFromJournalDate(sortedJournals[date])
                              .carbs
                          }{" "} g
                        </td>
                        <td className="py-2 whitespace-nowrap bg-gray-800">
                          {findTotalsFromJournalDate(sortedJournals[date]).fats}{" "} g
                        </td>
                        <td className="py-2 whitespace-nowrap bg-gray-800">
                          {
                            findTotalsFromJournalDate(sortedJournals[date])
                              .protein
                          }{" "} g
                        </td>
                      </tr>
                    </tbody>
                    {sortedJournals[date].map((item: FoodEntry) => (
                      <tbody
                        className="text-sm divide-y divide-gray-100"
                        key={item.id}
                      >
                        <tr className="text-[14px] bg-blue-900/20 hover:bg-indigo-600 cursor-pointer hover:text-white">
                          <td className="py-2 whitespace-nowrap">
                            {item.name.length > 20
                              ? `${item.name.substring(0, 20)}...`
                              : item.name}
                          </td>

                          <td className="py-2 whitespace-nowrap">
                            {item.calories}
                          </td>
                          <td className="py-2 whitespace-nowrap hidden sm:table-cell">
                            {item.carbs} g
                          </td>
                          <td className="py-2 whitespace-nowrap hidden sm:table-cell">
                            {item.fats} g
                          </td>
                          <td className="py-2 whitespace-nowrap hidden sm:table-cell">
                            {item.protein} g
                          </td>
                          <td className="sm:hidden">{`${item.carbs}/${item.fats}/${item.protein}`}</td>
                        </tr>
                      </tbody>
                    ))}
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
