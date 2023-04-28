import CalculatorForm from "../../components/CalculatorForm";
import MacroBuilder from "../../components/MacroBuilder";
import getCalorieGoal from "../../helpers/getCalorieGoal";

const CalculatorPage = async () => {
    const currentCalorieGoal = await getCalorieGoal();
    return (
        <main className="w-full h-full bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-10 text-white/90">
            <header className="flex flex-col w-full gap-2">
                <h1 className="text-3xl font-bold border-b-indigo-600 border-b-2">
                    Calculator
                </h1>
                <span className="text-[16px] font-semibold text-amber-400">
                    Current Goal: {currentCalorieGoal} kcal
                </span>
            </header>

            <section className="flex flex-col sm:flex-row sm:justify-between gap-4">
                <CalculatorForm />
                <MacroBuilder currentCalorieGoal={currentCalorieGoal}/>
            </section>
        </main>
    );
};

export default CalculatorPage;
