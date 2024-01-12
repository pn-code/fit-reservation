import BodyWeightSection from "@/components/dashboard/BodyWeightSection";
import getUserWeights from "@/helpers/user-weight/getUserWeights";

export const metadata = {
    title: "Dashboard | FitHeroes",
};

async function DashboardPage() {
    const userWeights = (await getUserWeights()) as WeightMeasurement[];

    return (
        <main className="w-full min-h-[calc(100vh-64px)] py-6 rounded-md flex flex-col gap-4 px-4 md:px-[4%] relative">
            <header className="flex justify-between font-bold pb-2 border-b-2 border-slate-900 items-center">
                <h1 className="text-2xl">Dashboard</h1>
            </header>

            {/* <MeasurementsComponent /> */}
            <BodyWeightSection userWeights={userWeights} />
        </main>
    );
}

export default DashboardPage;
