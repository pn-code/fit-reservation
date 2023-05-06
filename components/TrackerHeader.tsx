"use client";
import React from "react";
import Link from "next/link";

interface TrackerHeaderProps {
	title: string;
}

function TrackerHeader({ title }: TrackerHeaderProps) {
	return (
		<header className="flex flex-col gap-4 lg:flex-row lg:border-b-2 lg:border-b-indigo-600 lg:justify-between">
			<section className="flex justify-between font-bold pb-2 border-b-2 lg:border-b-0 border-b-indigo-600 items-center">
				<h1 className="text-3xl">{title}</h1>
			</section>
			<nav className="border-b-2 border-b-indigo-600 lg:border-b-0 pb-2">
				<ul className="w-full flex gap-5 text-white mb-2 justify-between text-lg font-semibold">
					<li className={title == "Tracker Overview" ? "hidden" : ""}>
						<Link
							className="bg-slate-600 hover:bg-slate-700 rounded-lg text-white px-4 py-3"
							href="/tracker/overview"
							passHref={true}
						>
							Overview
						</Link>
					</li>
					<li className={title == "Exercise" ? "hidden" : ""}>
						<Link
							className="bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white px-4 py-3"
							href="/tracker/exercise"
							passHref={true}
						>
							Exercise
						</Link>
					</li>
					<li className={title == "Nutrition" ? "hidden" : ""}>
						<Link
							className="bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white px-4 py-3"
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
