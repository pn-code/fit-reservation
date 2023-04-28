import TrackerHeader from "../../../components/TrackerHeader";
import MacroChart from "../../../components/MacroChart";
import LineDivider from "../../../components/LineDivider";
import getFoodEntries from "../../../helpers/getFoodEntries";
import FoodEntryCard from "../../../components/FoodEntryCard";
import ExerciseEntryCard from "../../../components/ExerciseEntryCard";
import getExerciseEntries from "../../../helpers/getExerciseEntries";
import moment from "moment";

const TrackerOverview = async () => {
    // Nutrition Data
    const foodEntries = await getFoodEntries();
    const totalCalories = foodEntries?.reduce(
        (acc, curr) => curr.calories + acc,
        0
    );
    const totalCarbs = foodEntries?.reduce((acc, curr) => curr.carbs + acc, 0);
    const totalFats = foodEntries?.reduce((acc, curr) => curr.fats + acc, 0);
    const totalProtein = foodEntries?.reduce(
        (acc, curr) => curr.protein + acc,
        0
    );

    // Exercise Data
    const exerciseEntries = await getExerciseEntries();
    const totalActivity = exerciseEntries?.reduce(
        (acc, curr) => {
            if (curr.type === "cardio") {
                acc.cardio = acc.cardio + curr.duration!;
            } else {
                acc.resistance = acc.resistance + curr.reps! * curr.sets!;
            }
            return acc;
        },
        { resistance: 0, cardio: 0 }
    );

    return (
        <main className="w-full h-full bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-10 text-white/90">
            <TrackerHeader title={"Tracker Overview"} />

            <section className="flex flex-col items-center w-full">
                <h2 className="text-2xl font-semibold text-center">
                    {moment().format("MMMM D, YYYY")}
                </h2>
                <LineDivider />
            </section>

            <section className="flex flex-col justify-center md:flex-row md:justify-around">
                {/* Physical Activity Section */}
                <section className="flex flex-col items-center gap-4 md:w-full mt-4">
                    <h2 className="text-2xl font-semibold text-amber-400">
                        Your Physical Activity
                    </h2>

                    <article className="flex flex-col items-center">
                        <h3 className="text-xl font-bold">Total Cardio</h3>
                        <span className="text-lg">
                            {totalActivity?.cardio} minutes
                        </span>
                    </article>

                    <article className="flex flex-col items-center">
                        <h3 className="text-xl font-bold">Total Tonnage</h3>
                        <span className="text-lg">
                            {totalActivity?.resistance} lbs
                        </span>
                    </article>
                    <LineDivider hidden={true} />
                </section>

                {/* Nutrition Section */}
                <section className="flex flex-col items-center gap-4 md:w-full pt-4">
                    <h2 className="text-2xl font-semibold text-amber-400">
                        Your Nutrition
                    </h2>
                    <article className="flex flex-col items-center">
                        <h3 className="text-xl font-bold">Total Calories</h3>
                        <span className="text-lg">{totalCalories} kcal</span>
                    </article>

                    <article className="flex flex-col items-center w-[80%] md:w-full max-w-[400px]">
                        <h3 className="text-xl font-bold">Macronutrients</h3>
                        {totalCarbs != 0 ||
                        totalFats != 0 ||
                        totalProtein != 0 ? (
                            <MacroChart
                                carbs={totalCarbs || 0}
                                fats={totalFats || 0}
                                protein={totalProtein || 0}
                            />
                        ) : (
                            <p>No Stats Available</p>
                        )}
                    </article>
                </section>
            </section>

            <section className="flex flex-col my-5 lg:items-center lg:justify-center">
                <section className="flex flex-col items-center gap-4 py-5 lg:w-[60%]">
                    <LineDivider />
                    <h2 className="text-2xl font-semibold text-amber-400">
                        Nutrition Journal
                    </h2>
                    {foodEntries?.length === 0 && (
                        <p className="font-semibold text-sm">
                            Currently has no entries.
                        </p>
                    )}
                    {foodEntries?.length! > 0 && (
                        <table className="w-full text-left">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Calories</th>
                                    <th>Carbs</th>
                                    <th>Fats</th>
                                    <th>Protein</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody className="text-sm">
                                {foodEntries?.map((entry) => (
                                    <FoodEntryCard
                                        id={entry.id}
                                        name={entry.name}
                                        calories={entry.calories}
                                        carbs={entry.carbs}
                                        fats={entry.fats}
                                        protein={entry.protein}
                                        key={entry.id}
                                    />
                                ))}
                            </tbody>
                            <tfoot className="border-t border-slate-50 pt-2">
                                <tr>
                                    <th>Total</th>
                                    <th>{totalCalories}</th>
                                    <th>{totalCarbs}g</th>
                                    <th>{totalFats}g</th>
                                    <th>{totalProtein}g</th>
                                </tr>
                            </tfoot>
                        </table>
                    )}
                </section>
            </section>
        </main>
    );
};

export default TrackerOverview;
