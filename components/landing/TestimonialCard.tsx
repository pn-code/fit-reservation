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
        <article className="flex flex-col gap-2">
            <h3 className="text-2xl font-bold tracking-tighter">{title}</h3>
            <div className="flex gap-1 my-2">
                <Star fill="gold" size={18} color="bronze"/>
                <Star fill="gold" size={18} color="bronze" />
                <Star fill="gold" size={18} color="bronze" />
                <Star fill="gold" size={18} color="bronze" />
                <Star fill="gold" size={18} color="bronze" />
            </div>

            <p className="text-slate-300 text-sm">{text}</p>

            <div className="text-lg font-bold mt-2">- {name}</div>
        </article>
    );
}
