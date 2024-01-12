"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { ZodError, z } from "zod";
import axios from "axios";

import { calculatorValidator } from "@/validations/calculatorValidator";

function CalculatorForm() {
    const [age, setAge] = useState(25);
    const [gender, setGender] = useState("male");
    const [height, setHeight] = useState({ feet: 5, inches: 10 });
    const [weight, setWeight] = useState(160);
    const [activity, setActivity] = useState(1.2);
    const [plan, setPlan] = useState(0);
    const [calories, setCalories] = useState(2060);

    const router = useRouter();

    const handleCalculate = () => {
        try {
            calculatorValidator.parse({
                age,
                gender,
                height,
                weight,
                activity,
                plan,
            });

            if (gender == "male") {
                const { feet, inches } = height;
                const totalHeightInCm = feet * 12 * 2.54 + inches * 2.54;
                const formulaMale =
                    (10 * weight * 0.453592 +
                        6.25 * totalHeightInCm -
                        5 * age +
                        5) *
                        activity +
                    plan;
                setCalories(Math.round(formulaMale));
            }

            if (gender == "female") {
                const { feet, inches } = height;
                const totalHeightInCm = feet * 12 * 2.54 + inches * 2.54;
                const formulaFemale =
                    (10 * weight * 0.453592 +
                        6.25 * totalHeightInCm -
                        5 * age -
                        161) *
                        activity +
                    plan;
                setCalories(Math.round(formulaFemale));
            }
        } catch (errors) {
            if (errors instanceof ZodError) {
                const errorFields = Object.keys(errors.formErrors.fieldErrors);
                return toast.error(
                    `The following field${
                        errorFields.length > 1 ? "s are" : " is"
                    } not filled in correctly: ${errorFields.join(", ")}`
                );
            }

            toast.error("An error has occurred. Please try again later...");
        }
    };

    const submitCalorieGoal = async () => {
        try {
            const calorieValidator = z
                .number()
                .gt(400)
                .lt(20000)
                .parse(calories);

            if (calorieValidator) {
                await axios.put("/api/calorie_goal", { goal: calories });
                toast.success("Successfully updated profile.");
                router.refresh();
            }
        } catch (error) {
            if (error instanceof ZodError) {
                return toast.error("Calories is not valid");
            }
            console.error(error);
            return toast.error(
                "An error has occurred. Please try again later."
            );
        }
    };

    return (
        <section className="flex flex-col gap-2">
            <form className="py-4 rounded-md flex-1 w-full">
                <header className="mb-2">
                    <h2 className="text-xl sm:text-2xl font-semibold">
                        Calculate Calorie Goal
                    </h2>
                    <p className="text-secondary text-sm font-semibold">
                        Find your starting point.
                    </p>
                </header>

                {/* Input Section */}
                <section className="flex flex-col md:flex-row md:gap-8 gap-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2 flex-col relative">
                            <label htmlFor="age">Age:</label>
                            <input
                                className="w-32"
                                onChange={(e) => setAge(Number(e.target.value))}
                                value={age}
                                id="age"
                                type="tel"
                            />
                            <span className="text-black absolute left-12 bottom-1">
                                years old
                            </span>
                        </div>

                        <div className="flex gap-2 flex-col w-full">
                            <label>Gender:</label>
                            <section className="flex gap-4">
                                <section className="flex gap-2 items-center">
                                    <input
                                        className="w-5 h-5"
                                        defaultChecked
                                        id="male"
                                        onClick={() => setGender("male")}
                                        name="gender"
                                        type="radio"
                                    />
                                    <label htmlFor="male">male</label>
                                </section>
                                <section className="flex gap-2 items-center">
                                    <input
                                        className="w-5 h-5"
                                        id="female"
                                        onClick={() => setGender("female")}
                                        value="female"
                                        name="gender"
                                        type="radio"
                                    />
                                    <label htmlFor="female">female</label>
                                </section>
                            </section>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="feet">Height:</label>
                            <section className="flex gap-2">
                                <section className="relative">
                                    <input
                                        className="w-14 pr-5"
                                        id="feet"
                                        onChange={(e) =>
                                            setHeight((height) => ({
                                                ...height,
                                                feet: Number(e.target.value),
                                            }))
                                        }
                                        value={height.feet}
                                        type="tel"
                                    />
                                    <label
                                        className="absolute right-4 top-1 text-black"
                                        htmlFor="feet"
                                    >
                                        ft
                                    </label>
                                </section>
                                <section className="relative">
                                    <input
                                        className="w-16"
                                        id="inches"
                                        onChange={(e) =>
                                            setHeight((height) => ({
                                                ...height,
                                                inches: Number(e.target.value),
                                            }))
                                        }
                                        value={height.inches}
                                        type="tel"
                                    />
                                    <label
                                        className="absolute right-4 top-1 text-black"
                                        htmlFor="inches"
                                    >
                                        in
                                    </label>
                                </section>
                            </section>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="weight">Weight:</label>
                            <section className="relative">
                                <input
                                    className="w-[130px] appearance-none"
                                    onChange={(e) =>
                                        setWeight(Number(e.target.value))
                                    }
                                    value={weight}
                                    id="weight"
                                    type="tel"
                                />
                                <span className="absolute left-24 top-1 text-black">
                                    lb
                                </span>
                            </section>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2 flex-col w-72">
                            <label htmlFor="activity">Activity Level:</label>
                            <select
                                className="h-8"
                                onChange={(e) =>
                                    setActivity(Number(e.target.value))
                                }
                                value={activity}
                                name="activity"
                                id="activity"
                            >
                                <option value={1.2}>
                                    little to no exercise
                                </option>
                                <option value={1.375}>
                                    light exercise 1-3 days/wk
                                </option>
                                <option value={1.55}>
                                    moderate exercise 3-5 days/wk
                                </option>
                                <option value={1.725}>
                                    hard exercise 6-7 days/wk
                                </option>
                                <option value={1.9}>
                                    2x hard exercise 6-7 days/wk
                                </option>
                            </select>
                        </div>

                        <div className="flex gap-2 flex-col w-72">
                            <label htmlFor="plan">Diet Plan:</label>
                            <select
                                className="h-8"
                                onChange={(e) =>
                                    setPlan(Number(e.target.value))
                                }
                                value={plan}
                                name="plan"
                                id="plan"
                            >
                                <option value={0}>Maintain Weight</option>
                                <option value={-500}>Lose 1 pound/week</option>
                                <option value={-1000}>
                                    Lose 2 pounds/week
                                </option>
                                <option value={250}>Gain 0.5 pound/week</option>
                                <option value={500}>Gain 1 pound/week</option>
                                <option value={1000}>Gain 2 pounds/week</option>
                            </select>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col gap-2 my-4 mb-12 w-full flex-1 justify-between">
                    <section className="flex flex-col gap-2">
                        <div className="flex flex-col">
                            <label className="font-bold text-primary">
                                Daily Calories:
                            </label>
                            <p className="text-secondary font-semibold text-sm mb-2">
                                Calculate using our form or manually set by
                                clicking calories.
                            </p>
                            <div className="relative">
                                <input
                                    onChange={(e) =>
                                        setCalories(Number(e.target.value))
                                    }
                                    type="text"
                                    value={calories}
                                    className="w-[100px] absolute left-0 top-0"
                                />
                                <span className="absolute z-20 top-1 left-14">
                                    kcal
                                </span>
                            </div>
                        </div>
                    </section>
                </section>

                {/* Action Buttons Section */}
                <section className="flex gap-4">
                    <button
                        onClick={handleCalculate}
                        className="btn btn--primary"
                        type="button"
                    >
                        Calculate
                    </button>
                    <button
                        onClick={submitCalorieGoal}
                        type="button"
                        className="btn btn--secondary"
                    >
                        Apply to Profile
                    </button>
                </section>
            </form>

            {/* Display Calories Section */}
        </section>
    );
}

export default CalculatorForm;
