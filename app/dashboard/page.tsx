import BodyFatSection from "@/components/dashboard/BodyFatSection";
import BodyWeightSection from "@/components/dashboard/BodyWeightSection";
import getUserBodyFats from "@/helpers/user-bodyfat/getUserBodyFats";
import getUserWeights from "@/helpers/user-weight/getUserWeights";

export const metadata = {
    title: "Dashboard | FitHeroes",
};

async function DashboardPage() {
    const userWeights = (await getUserWeights()) as WeightMeasurement[];
    const userBodyFats = (await getUserBodyFats()) as BodyFatMeasurement[];

    return (
        <main className="w-full min-h-[calc(100vh-64px)] py-6 flex flex-col gap-4 px-4 md:px-[4%] relative">
            <header className="bg-white border border-primary p-4 rounded-sm shadow-md">
                <h1 className="font-bold">Dashboard</h1>
                <p className="text-secondary tracking-tighter">
                    View your progress
                </p>
            </header>

            <section className="flex flex-col gap-4 lg:flex-row lg:gap-24">
                <BodyWeightSection userWeights={userWeights} />
                <BodyFatSection userBodyfats={userBodyFats} />
            </section>
        </main>
    );
}

export default DashboardPage;
