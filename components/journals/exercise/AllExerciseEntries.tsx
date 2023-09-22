"use client";

import { sortEntriesByDate } from "@/helpers/sortEntriesByDate";

export default function AllExerciseEntries({ entries }: any) {
  const sortedJournals = sortEntriesByDate(entries);
  const dates = Object.keys(sortedJournals);

  return (
    <section className="h-full mb-20">
      <div className="flex flex-col gap-4">
        {dates.map((date: any) => (
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
                  {sortedJournals[date].map((item: ExerciseEntry) => (
                    <tbody
                      className="text-sm divide-y divide-gray-100"
                      key={item.id}
                    >
                      <tr className="text-[14px] bg-blue-900/20 cursor-pointer hover:text-white">
                        <td className="py-2 whitespace-nowrap">{item.name}</td>

                        {item.type == "resistance" ? (
                          <td className="py-2 whitespace-nowrap">{`${item.sets} x ${item.reps} at ${item.weight}lbs`}</td>
                        ) : (
                          <td className="py-2 whitespace-nowrap">
                            {item.duration} mins
                          </td>
                        )}
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
