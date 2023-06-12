import moment from "moment";
import React from "react";
import ExerciseForm from "../../components/ExerciseForm";
import NutritionForm from "../../components/NutritionForm";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/app-beta";

export const metadata = {
    title: "Journal | FitHeroes",
};

const JournalPage = async () => {
    const user = await currentUser();
    return (
        <main className="w-full h-fit bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 sm:px-10 text-white/90">
            <header className="w-full flex justify-between lg:border-b-2 lg:border-b-indigo-600">
                <section className="flex justify-between font-bold pb-2 items-center">
                    <h1 className="text-3xl">Journal</h1>
                </section>
                <section className="flex w-full justify-end items-center">
                    <h2 className="text-xl font-semibold text-center">
                        {moment().format("MMMM D, YYYY")}
                    </h2>
                </section>
            </header>

            <section className="flex flex-col gap-4">
                <article className="flex flex-col gap-4">
                    <header className="flex justify-between">
                        <h2 className="text-2xl font-semibold text-amber-400 text-center">
                            Nutrition Journal
                        </h2>
                        <Link href={`/journal/nutrition/user/${user?.id}`}>
                            See more
                        </Link>
                    </header>

                    <NutritionForm />
                </article>

                <article className="flex flex-col gap-4">
                    <header className="flex justify-between">
                        <h2 className="text-2xl font-semibold text-amber-400 text-center">
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
