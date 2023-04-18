"use client";
import React, { useState } from "react";
import { calculatorValidator } from "../../validations/calculatorValidator";
import { toast } from "react-hot-toast";
import { ZodError} from "zod";
import axios from "axios"

const CalculatorModal = () => {
	const [age, setAge] = useState(25);
	const [gender, setGender] = useState("male");
	const [height, setHeight] = useState({ feet: 5, inches: 10 });
	const [weight, setWeight] = useState(160);
	const [activity, setActivity] = useState(1.2);
	const [plan, setPlan] = useState(0);
	const [calories, setCalories] = useState(2000);

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
		const res = await axios.put("/api/calorie_goal", { goal: calories})
		console.log(res)
	}

	return (
		<main className="h-screen w-full flex justify-center items-center">
			<form className="bg-[#05204A] text-[#FAFAFA] w-[92%] p-4 rounded-md flex-col flex gap-4 max-w-md">
				<header className="flex justify-between items-center border-b-violet-800 border-b-2 pb-2">
					<h1 className="text-3xl font-semibold">Calculator</h1>
				</header>

				{/* Input Section */}
				<section className="flex flex-col gap-4">
					<div className="flex gap-4 items-center">
						<label htmlFor="age">Age</label>
						<input
							className="w-32"
							onChange={(e) => setAge(Number(e.target.value))}
							value={age}
							id="age"
							type="tel"
						/>
					</div>

					<div className="flex gap-4 items-center">
						<label>Gender</label>
						<section className="flex gap-2">
							<input
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
								id="female"
								onClick={() => setGender("female")}
								value="female"
								name="gender"
								type="radio"
							/>
							<label htmlFor="female">female</label>
						</section>
					</div>

					<div className="flex gap-4 items-center">
						<label htmlFor="feet">Height</label>
						<section className="relative">
							<input
								className="w-16 pr-5"
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
					</div>

					<div className="flex gap-4 relative items-center">
						<label htmlFor="weight">Weight</label>
						<section className="relative">
							<input
								className="w-24 appearance-none"
								onChange={(e) =>
									setWeight(Number(e.target.value))
								}
								value={weight}
								id="weight"
								type="tel"
							/>
							<span className="absolute right-4 top-1 text-black">
								lb
							</span>
						</section>
					</div>

					<div className="flex gap-4 flex-col sm:flex-row">
						<label htmlFor="activity">Activity Level</label>
						<select
							onChange={(e) =>
								setActivity(Number(e.target.value))
							}
							value={activity}
							name="activity"
							id="activity"
						>
							<option value={1.2}>little to no exercise</option>
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

					<div className="flex gap-4 flex-col sm:flex-row">
						<label htmlFor="plan">Diet Plan</label>
						<select
							onChange={(e) => setPlan(Number(e.target.value))}
							value={plan}
							name="plan"
							id="plan"
						>
							<option value={0}>Maintain Weight</option>
							<option value={-500}>Lose 1 pound/week</option>
							<option value={-1000}>Lose 2 pounds/week</option>
							<option value={250}>Gain 0.5 pound/week</option>
							<option value={500}>Gain 1 pound/week</option>
							<option value={1000}>Gain 2 pounds/week</option>
						</select>
					</div>
				</section>

				{/* Action Buttons Section */}
				<section className="flex justify-between gap-4 mt-4">
					<button
						onClick={handleCalculate}
						className="px-4 bg-[#493fdd] rounded-md py-3 flex-1"
						type="button"
					>
						Calculate
					</button>
					<button onClick={submitCalorieGoal} type="button" className="px-4 bg-[#424242] rounded-md py-3 flex-1">
						Apply to Profile
					</button>
				</section>

				{/* Display Calories Section */}
				<section>
					<h2 className="text-2xl">Daily Calories:</h2>
					<p>{calories} kCal</p>
				</section>
			</form>
		</main>
	);
};

export default CalculatorModal;
