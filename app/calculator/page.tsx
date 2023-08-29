import CalculatorForm from "../../components/CalculatorForm";
import MacroBuilder from "../../components/MacroBuilder";
import getCalorieGoal from "../../helpers/getCalorieGoal";

export const metadata = {
    title: "Calculator | FitHeroes",
};

const CalculatorPage = async () => {
    const currentCalorieGoal = await getCalorieGoal();

    return (
        <main className="w-full min-h-[calc(100vh-100px)] mb-20 bg-gray-900 py-6 rounded-md px-4 flex flex-col gap-2 shadow-md text-white/90 lg:px-[20%]">
            <header className="flex flex-col w-full gap-2">
                <h1 className="text-3xl font-bold border-b-indigo-600 border-b-2">
                    Calculator
                </h1>
            </header>

            <section className="flex flex-col">
                <CalculatorForm />
                <MacroBuilder currentCalorieGoal={currentCalorieGoal} />
            </section>
        </main>
    );
};

export default CalculatorPage;
