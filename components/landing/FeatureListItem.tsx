import Link from "next/link";
import React from "react";

interface FeatureListItemProps {
    title: string;
    description: string;
    learnHref: string;
}

export default function FeatureListItem({
    title,
    description,
    learnHref,
}: FeatureListItemProps) {
    return (
        <li className="w-full flex flex-col gap-4 max-w-[500px]">
            <h2 className="text-4xl font-semibold tracking-tighter">{title}</h2>
            <p>{description}</p>
            <div className="flex gap-4 justify-center md:justify-start">
                <Link
                    className="py-2 px-4 border border-slate-600 hover:bg-slate-300/90 duration-150"
                    href={learnHref}
                >
                    Learn More
                </Link>
                <Link
                    className="py-2 px-4 border underline border-transparent hover:border-slate-600 duration-150"
                    href="/register"
                >
                    Register
                </Link>
            </div>
        </li>
    );
}
