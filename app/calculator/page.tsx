import CalculatorForm from "@/components/calculator/CalculatorForm";
import MacroBuilder from "@/components/calculator/MacroBuilder";
import getCalorieGoal from "@/helpers/getCalorieGoal";

export const metadata = {
  title: "Calculator | FitHeroes",
};

const CalculatorPage = async () => {
  const currentCalorieGoal = await getCalorieGoal();

  return (
    <main className="w-full min-h-[calc(100vh-100px)] mb-20 py-6 rounded-md px-4 flex flex-col gap-2 shadow-md lg:px-[4%]">
      <header className="flex flex-col w-full gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold border-b-primary border-b-2">
          Calculator
        </h1>
      </header>

      <section className="flex flex-col lg:flex-row lg:gap-24 w-full">
        <CalculatorForm />
        <MacroBuilder currentCalorieGoal={currentCalorieGoal} />
      </section>
    </main>
  );
};

export default CalculatorPage;
