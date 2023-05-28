"use client";
import React, { useState } from "react";
import TrainingPlanCard from "./TrainingPlanCard";
import SearchBar from "./SearchBar";

export default function DisplayPlans({ currentPlans }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPlans = currentPlans.filter((plan: any) =>
        plan.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log(filteredPlans, "plans when filtered");
    console.log(searchTerm, "search terms");
    return (
        <div className="flex flex-col gap-4">
            <SearchBar setSearchTerm={setSearchTerm} />
            {/* Plans Here */}
            <section className="flex flex-col gap-2">
                {filteredPlans.map((plan: any) => (
                    <TrainingPlanCard plan={plan} key={plan.id} />
                ))}
            </section>
        </div>
    );
}
