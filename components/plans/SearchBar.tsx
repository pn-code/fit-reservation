"use client";

import { Search } from "lucide-react";

interface Props {
  setSearchTerm: any;
}

export default function SearchBar({ setSearchTerm }: Props) {
  return (
    <section className="w-full mx-auto flex sm:justify-center gap-2 items-center">
      <span className="relative w-full sm:w-fit">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          id="search"
          className="w-full sm:w-96"
          type="text"
          placeholder="Search for Plans"
          aria-label="Search for Plans"
        />
        <Search className="absolute right-2 top-1" color="black" />
      </span>
    </section>
  );
}
