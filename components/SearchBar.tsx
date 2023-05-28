"use client";

import { Search } from "lucide-react";

interface Props {
    setSearchTerm: any;
}

export default function SearchBar({ setSearchTerm }: Props) {
    return (
        <section className="w-full mx-auto flex justify-center gap-2 items-center">
            <label htmlFor="search">Search: </label>
            <span className="relative">
                <input
                    onChange={(e) => setSearchTerm(e.target.value)}
                    id="search"
                    className="w-full sm:w-96"
                    type="text"
                />
                <Search className="absolute right-2 top-1" color="black" />
            </span>
        </section>
    );
}
