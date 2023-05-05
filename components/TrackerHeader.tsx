"use client";
import React from "react";
import Link from "next/link";

interface TrackerHeaderProps {
    title: string;
}

function TrackerHeader({ title }: TrackerHeaderProps) {
    return (
        <header className="flex flex-col gap-4 sm:flex-row sm:justify-between font-bold pb-2 border-b-2 border-b-indigo-600 items-center">
            <h1 className="text-3xl">{title}</h1>
            <nav>
                <ul className="w-full flex gap-5 text-white mb-2">
                    <li className={title == "Tracker Overview" ? "hidden" : ""}>
                        <Link
                            className="bg-slate-600 hover:bg-slate-700 rounded-lg text-white px-2 sm:px-4 py-2"
                            href="/tracker/overview"
                            passHref={true}
                        >
                            Overview
                        </Link>
                    </li>
                    <li className={title == "Exercise" ? "hidden" : ""}>
                        <Link
                            className="bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white px-2 sm:px-4 py-2"
                            href="/tracker/exercise"
                            passHref={true}
                        >
                            Exercise
                        </Link>
                    </li>
                    <li className={title == "Nutrition" ? "hidden" : ""}>
                        <Link
                            className="bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white px-2 sm:px-4 py-2"
                            href="/tracker/nutrition"
                            passHref={true}
                        >
                            Nutrition
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default TrackerHeader;
