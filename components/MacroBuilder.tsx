"use client";
import React, { useState } from "react";

export default function MacroBuilder() {
    const [carbs, setCarbs] = useState(40);
    const [fats, setFats] = useState(30);
    const [protein, setProtein] = useState(30);

    return (
        <section className="bg-slate-900 p-4 rounded-md flex-1">
            <header>
                <h2 className="text-xl font-bold border-b-indigo-600 border-b-2">
                    Macronutrients
                </h2>
                <p className="text-amber-400 text-sm font-semibold">
                    Build your macros.
                </p>
            </header>

            <form className="mt-4">
                <section className="flex flex-col gap-1">
                    <label htmlFor="carbs">Carbohydrates ({carbs}%)</label>
                    <input
                        id="carbs"
                        onChange={(e) => setCarbs(Number(e.target.value))}
                        value={carbs}
                        type="range"
                        min={0}
                        max={100}
                        step={1}
                        list="%"
                    />
                </section>

                <section className="flex flex-col gap-1">
                    <label htmlFor="fats">Fats ({fats}%)</label>
                    <input
                        id="fats"
                        onChange={(e) => setFats(Number(e.target.value))}
                        value={fats}
                        type="range"
                        min={0}
                        max={100}
                        step={1}
                    />
                </section>

                <section className="flex flex-col gap-1">
                    <label htmlFor="protein">Protein ({protein}%)</label>
                    <input
                        id="protein"
                        onChange={(e) => setProtein(Number(e.target.value))}
                        value={protein}
                        type="range"
                        min={0}
                        max={100}
                        step={1}
                    />
                </section>
            </form>
        </section>
    );
}
