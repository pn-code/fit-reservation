"use client";

import { findTotalsFromJournalDate } from "@/helpers/findTotalsFromJournalDate";
import { sortEntriesByDate } from "@/helpers/sortEntriesByDate";

export default function AllNutritionEntries({ entries }: any) {
  // Sort journals based on client time and date
  const sortedJournals = sortEntriesByDate(entries) as any[];

  // Grab dates
  const dates = Object.keys(sortedJournals);

  return (
    <section>
      <div>
        {dates.map((date: any) => (
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
                        <div className="font-semibold text-left">Calories</div>
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
                    <tr className="text-[14px] bg-blue-900/20  cursor-pointer hover:text-white">
                      <td className="py-2 whitespace-nowrap bg-gray-800">
                        TOTAL
                      </td>
                      <td className="py-2 whitespace-nowrap bg-gray-800">
                        {
                          findTotalsFromJournalDate(sortedJournals[date])
                            .calories
                        }
                      </td>
                      <td className="hidden sm:table-cell py-2 whitespace-nowrap bg-gray-800">
                        {findTotalsFromJournalDate(sortedJournals[date]).carbs}{" "}
                        g
                      </td>
                      <td className="hidden sm:table-cell py-2 whitespace-nowrap bg-gray-800">
                        {findTotalsFromJournalDate(sortedJournals[date]).fats} g
                      </td>
                      <td className="hidden sm:table-cell py-2 whitespace-nowrap bg-gray-800">
                        {
                          findTotalsFromJournalDate(sortedJournals[date])
                            .protein
                        }{" "}
                        g
                      </td>
                      <td className="table-cell sm:hidden py-2 whitespace-nowrap bg-gray-800">
                        {`${
                          findTotalsFromJournalDate(sortedJournals[date]).carbs
                        }/${
                          findTotalsFromJournalDate(sortedJournals[date]).fats
                        }/${
                          findTotalsFromJournalDate(sortedJournals[date])
                            .protein
                        }`}
                      </td>
                    </tr>
                  </tbody>
                  {sortedJournals[date].map((item: FoodEntry) => (
                    <tbody
                      className="text-sm divide-y divide-gray-100"
                      key={item.id}
                    >
                      <tr className="text-[14px] bg-blue-900/20 cursor-pointer hover:text-white">
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
  );
}
