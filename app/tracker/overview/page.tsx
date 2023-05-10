import TrackerHeader from "../../../components/TrackerHeader";
import LineDivider from "../../../components/LineDivider";
import getFoodEntries from "../../../helpers/getFoodEntries";
import getExerciseEntries from "../../../helpers/getExerciseEntries";
import moment from "moment";
import OverviewPhysicalActivitySection from "../../../components/OverviewPhysicalActivitySection";
import OverviewNutritionSection from "../../../components/OverviewNutritionSection";

export const metadata = {
    title: "Tracker Overview | FitHeroes",
};

const TrackerOverview = async () => {
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
                <OverviewPhysicalActivitySection />

                {/* Nutrition Section */}
                <OverviewNutritionSection />
            </section>
        </main>
    );
};

export default TrackerOverview;
