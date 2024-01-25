import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

interface TestimonialCardProps {
    title: string;
    name: string;
    text: string;
}

export default function TestimonialCard({
    title,
    name,
    text,
}: TestimonialCardProps) {
    return (
        <article className="bg-slate-100 border border-primary p-6 rounded-md shadow-md flex flex-col gap-2 text-primary">
            <h3 className="text-xl font-bold tracking-tighter">{title}</h3>

            <p className="text-secondary">{text}</p>

            <div className="flex justify-between items-center">
                <div className="text-lg font-bold mt-2">- {name}</div>{" "}
                <div className="flex gap-1 mt-2">
                    <Star fill="gold" size={18} color="bronze" stroke="black" />
                    <Star fill="gold" size={18} color="bronze" stroke="black" />
                    <Star fill="gold" size={18} color="bronze" stroke="black" />
                    <Star fill="gold" size={18} color="bronze" stroke="black" />
                    <Star fill="gold" size={18} color="bronze" stroke="black" />
                </div>
            </div>
        </article>
    );
}
