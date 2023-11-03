import React from "react";
import Link from "next/link";

import Spinner from "@/components/Spinner";

export default function Loading() {
    return (
        <main className="w-full min-h-[calc(100vh-90px)] bg-gray-900 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 lg:px-[20%] text-white/90">
            <header className="w-full flex justify-between border-b-2 border-b-indigo-600">
                <section className="w-full flex justify-between font-bold pb-2 items-center h-full">
                    <h1 className="text-xl sm:text-3xl">Journal</h1>
                    <div>
                        <Link
                            className="text-sm font-semibold p-2 underline hover:text-slate-300"
                            href={`/journal/nutrition/user/`}
                        >
                            All Nutrition
                        </Link>
                        <Link
                            className="text-sm font-semibold p-2 underline hover:text-slate-300"
                            href={`/journal/exercise/user/`}
                        >
                            All Exercises
                        </Link>
                    </div>
                </section>
            </header>

            <section className="w-full h-full flex justify-center mt-40">
                <Spinner size={16}/>
            </section>
        </main>
    );
}
