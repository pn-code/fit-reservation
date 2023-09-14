import React from "react";

export default function ClientCard() {
    return (
        <article className="bg-gray-800 p-4 rounded-sm border-2 border-transparent hover:border-gray-600 ease-linear duration-200 cursor-pointer">
            <header className="flex justify-between">
                <h1 className="text-lg font-semibold">User's Full Name</h1>
                <div>Nutrition Plan</div>
            </header>

            <div>Designated Calorie Goal: 1800 Cal</div>
            <div>Designated Macro Split: 300g / 80g / 160g</div>
            <div>Current Body Weight: 175 lbs</div>
            <div>Target Body Weight: 169 lbs</div>
        </article>
    );
}
