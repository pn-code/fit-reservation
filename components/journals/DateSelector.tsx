"use client";

import { Calendar } from "lucide-react";
import { ChangeEvent, useState } from "react";

const findFirstDate = () => {
    const today = new Date();

    const year = today.getFullYear().toString();
    const month =
        (today.getMonth() + 1).toString().length === 2
            ? `${today.getMonth() + 1}`
            : `0${today.getMonth() + 1}`;
    const day =
        today.getDate().toString().length === 2
            ? `${today.getDate()}`
            : `0${today.getDate()}`;

    return `${year}-${month}-${day}`;
};

export default function DateSelector() {
    const [selectedDate, setSelectedDate] = useState<string>(findFirstDate());

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
