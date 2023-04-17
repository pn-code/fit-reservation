"use client";
import React from "react";
import Link from "next/link";

interface TrackerHeaderProps {
	title: String;
}

function TrackerHeader({ title }: TrackerHeaderProps) {
	return (
		<header className="flex justify-between font-bold pb-2 border-b-2 border-b-[#F15B2A] items-center">
			<h1 className="text-3xl">{title}</h1>
			<nav>
				<ul className="flex gap-5 text-white">
					<li
						className={
							title == "Tracker Overview"
								? "hidden"
								: "bg-slate-600 hover:bg-slate-700 rounded-lg text-white px-4 py-2 hover:underline"
						}
					>
						<Link href="/tracker/overview">Overview</Link>
					</li>
					<li
						className={
							title == "Exercise"
								? "hidden"
								: "bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white px-4 py-2 hover:underline"
						}
					>
						<Link href="/tracker/exercise">Exercise</Link>
					</li>
					<li
						className={
							title == "Nutrition"
								? "hidden"
								: "bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white px-4 py-2 hover:underline"
						}
					>
						<Link href="/tracker/nutrition">Nutrition</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default TrackerHeader;
