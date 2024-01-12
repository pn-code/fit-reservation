"use client";

import { ChangeEvent } from "react";

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
        <div className="flex gap-2">
            <input
                onChange={(e) => handleDateChange(e)}
                value={selectedDate}
                aria-label="journal date"
                className="btn btn--secondary"
                type="date"
            />
        </div>
    );
}
