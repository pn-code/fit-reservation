"use client";

import { Calendar } from "lucide-react";
import { ChangeEvent, useState } from "react";

interface DateSelectorProps {
    selectedDate: string;
    setSelectedDate: (dateString: string) => void;
}

export default function DateSelector({
    selectedDate,
    setSelectedDate,
}: DateSelectorProps) {
    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
    };

    return (
        <section className="flex w-full justify-end sm:items-center">
            <h2 className="text-lg sm:text-xl font-semibold text-center flex gap-2 items-center">
                <button className="inline-block relative w-7 h-7 text-indigo-500 hover:text-indigo-600 cursor-pointer">
                    <Calendar className="absolute left-0 top-0 w-full h-full" />
                    <input
                        onChange={(e) => handleDateChange(e)}
                        value={selectedDate}
                        aria-label="journal date"
                        className="absolute left-0 top-0 h-full w-full opacity-0"
                        type="date"
                    />
                </button>
                <div>{selectedDate}</div>
            </h2>
        </section>
    );
}
