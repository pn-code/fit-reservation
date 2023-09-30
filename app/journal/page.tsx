import React from "react";
import ExerciseForm from "../../components/ExerciseForm";
import NutritionForm from "../../components/NutritionForm";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/app-beta";
import DateSelector from "@/components/journals/DateSelector";

export const metadata = {
    title: "Journal | FitHeroes",
};

const JournalPage = async () => {
    const user = await currentUser();
    return (
        <main className="w-full min-h-[calc(100vh-100px)] pb-20 overflow-y-auto bg-gray-900 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 lg:px-[20%] text-white/90">
            <header className="w-full flex justify-between lg:border-b-2 lg:border-b-indigo-600">
                <section className="flex justify-between font-bold pb-2 items-center h-full">
                    <h1 className="text-xl sm:text-3xl">Journal</h1>
                </section>
                <DateSelector/>
            </header>

            <section className="flex flex-col gap-8">
                <article className="flex flex-col gap-2 flex-1">
                    <header className="flex justify-between">
                        <h2 className="text-lg sm:text-2xl font-semibold text-amber-400 text-center">
                            Nutrition Journal
                        </h2>
                        <Link href={`/journal/nutrition/user/${user?.id}`}>
                            See more
                        </Link>
                    </header>
                    <NutritionForm />
                </article>

                <article className="flex flex-col gap-2 flex-1">
                    <header className="flex justify-between">
                        <h2 className="text-lg sm:text-2xl font-semibold text-amber-400 text-center">
                            Exercise Journal
                        </h2>
                        <Link href={`/journal/exercise/user/${user?.id}`}>
                            See more
                        </Link>
                    </header>
                    <ExerciseForm />
                </article>
            </section>
        </main>
    );
};

export default JournalPage;
