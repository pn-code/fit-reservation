interface Props {
    recommendedProteinIntake: number | null;
}

export default function MacroRecommendations({
    recommendedProteinIntake,
}: Props) {
    return (
        <section className="bg-slate-900 py-4 px-6 rounded-md flex-1">
            <header className="mb-2">
                <h2 className="text-xl font-bold border-b-indigo-600 border-b-2">
                    Recommendations
                </h2>
                <p className="text-amber-400 text-sm font-semibold">
                    Follow these guidelines.
                </p>
            </header>

            <section>
                <article>
                    <header className="flex justify-between items-center font-semibold">
                        <h3 className="text-red-400">Protein</h3>
                        <span className="text-sm">
                            {recommendedProteinIntake
                                ? `${recommendedProteinIntake} g`
                                : ""}
                        </span>
                    </header>

                    <section className="flex flex-col gap-4 text-sm">
                        <p>
                            It is generally recommended that you consume at
                            least 0.8 grams of protein per pound of lean body
                            mass.
                        </p>

                        <p className="text-green-300">
                            Move the bars to meet the recommended protein
                            intake.
                        </p>
                    </section>
                </article>

                <article className="border-t-2 border-indigo-600 mt-2 pt-2">
                    <header className="flex justify-between items-center font-semibold">
                        <h3>General Guidelines</h3>
                    </header>

                    <section className="flex flex-col gap-4 text-sm">
                        <p className="text-red-400">
                            It is not recommended to remove an entire
                            macronutrient section.
                        </p>

                        <p>
                            Know that each macronutrient has its place and is
                            important in different ways to our physiological
                            functions.
                        </p>

                        <ul>
                            <li className="mb-2">
                                <h4 className="text-yellow-300 font-semibold">
                                    Carbs:
                                </h4>
                                <p>Too little may result in low energy.</p>
                            </li>
                            <li className="mb-2">
                                <h4 className="text-blue-400 font-semibold">
                                    Fats:
                                </h4>
                                <p>
                                    Too little may result in low energy, hormone
                                    imbalance, and no libido.
                                </p>
                            </li>
                            <li className="mb-2">
                                <h4 className="text-red-400 font-semibold">
                                    Protein:
                                </h4>
                                <p>
                                    Too little may result in muscle
                                    degeneration.
                                </p>
                            </li>
                        </ul>
                    </section>
                </article>
            </section>
        </section>
    );
}
