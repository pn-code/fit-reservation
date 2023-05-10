import TrackerHeader from "../../../components/TrackerHeader";
import MacroChart from "../../../components/MacroChart";
import LineDivider from "../../../components/LineDivider";
import getFoodEntries from "../../../helpers/getFoodEntries";
import getExerciseEntries from "../../../helpers/getExerciseEntries";
import moment from "moment";

interface Props {
    foodEntries: FoodEntry[];
    exerciseEntries: ExerciseEntry[];
}

export const metadata = {
    title: "Tracker Overview | FitHeroes",
};

export async function getStaticProps() {
    // Nutrition Data
    const foodEntries = await getFoodEntries();

    // Exercise Data
    const exerciseEntries = await getExerciseEntries();

    return {
        props: {
            foodEntries,
            exerciseEntries,
        },
        revalidate: 5,
    };
}

const TrackerOverview = async ({ foodEntries, exerciseEntries }: Props) => {
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

    const totalActivity = exerciseEntries?.reduce(
        (acc, curr) => {
            if (curr.type === "cardio" && curr.duration != null) {
                acc.cardio = acc.cardio + curr.duration;
            } else if (
                curr.type === "resistance" &&
                curr.reps != null &&
                curr.sets != null
            ) {
                acc.resistance = acc.resistance + curr.reps * curr.sets;
            }
            return acc;
        },
        { resistance: 0, cardio: 0 }
    );

    return (
        <main className="w-full h-full bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 sm:px-10 text-white/90">
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
        </main>
    );
};

export default TrackerOverview;
