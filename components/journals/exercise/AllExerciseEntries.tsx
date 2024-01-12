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
            <h2 className="text-xl font-bold tracking-tighter">{date}</h2>
            <div className="py-2 w-full sm:w-[75%] lg:w-[40%]">
              <div className="overflow-x-auto w-full">
                <table className="table-auto w-full divide-y divide-primary border border-primary">
                  <thead className="h-8 text-xs sm:text-[16px] font-semibold uppercase text-white bg-primary">
                    <tr className="p-2 whitespace-nowrap">
                      <th className="w-44 p-2">
                        <div className="font-semibold text-left">
                          Exercise Name
                        </div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold text-left">
                          Exercise Details
                        </div>
                      </th>
                    </tr>
                  </thead>
                  {sortedJournals[date].map((item: ExerciseEntry) => (
                    <tbody
                      className="text-sm"
                      key={item.id}
                    >
                      <tr className="text-[14px] bg-white cursor-pointer hover:bg-slate-100">
                        <td className="p-2 whitespace-nowrap">{item.name}</td>

                        {item.type == "resistance" ? (
                          <td className="p-2 whitespace-nowrap">{`${item.sets} x ${item.reps} at ${item.weight}lbs`}</td>
                        ) : (
                          <td className="p-2 whitespace-nowrap">
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
