interface Props {
    recommendedProteinIntake: number | null;
}

export default function MacroRecommendations({
    recommendedProteinIntake,
}: Props) {
    return (
        <section className="bg-slate-900 py-4 px-6 rounded-md flex-1">
            <header>
                <h2 className="text-xl font-bold border-b-indigo-600 border-b-2">
                    Recommendations
                </h2>

                <section>
                    <article>
                        <header className="flex justify-between items-center font-semibold">
                            <h3 className="text-amber-400">
                                Protein
                            </h3>
                            <span className="text-sm">
                                {recommendedProteinIntake
                                    ? `${recommendedProteinIntake} g`
                                    : ""}
                            </span>
                        </header>

                        <p className="text-sm">
                            It is generally recommended that you consume 0.8
                            grams of protein per pound of lean body mass.
                        </p>
                    </article>
                </section>
            </header>
        </section>
    );
}
