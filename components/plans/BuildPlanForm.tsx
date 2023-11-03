"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

import { exerciseSchema } from "@/validations/exerciseValidator";
import { planSchema } from "@/validations/planValidator";
import { useUser } from "@clerk/nextjs";

export default function BuildPlanForm() {
  const [planName, setPlanName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [exercise, setExercise] = useState<string>("");
  const [type, setType] = useState<string>("resistance");
  const [sets, setSets] = useState<number>(0);
  const [reps, setReps] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const [exercises, setExercises] = useState<Exercise[]>([]);

  const [loading, setLoading] = useState(false);

  const user = useUser();
  const router = useRouter();

  const validateExercise = (exercise: any) => {
    try {
      if (exerciseSchema.parse(exercise)) {
        return true;
      }
    } catch (error) {
      toast.error("Something went wrong during validation!");
      return false;
    }
  };

  const addExerciseToList = () => {
    const exerciseObj = { name: exercise, type, sets, reps, duration };

    if (!validateExercise(exerciseObj)) return;

    setExercises((prev) => {
      return [...prev, exerciseObj];
    });

    setExercise("");
    setType("resistance");
    setSets(0);
    setReps(0);
    setDuration(0);
  };

  const handleSubmitPlan = async () => {
    const planObj = { name: planName, description, exercises };
    setLoading(true);
    try {
      planSchema.parse(planObj);

      const res = await axios.post("/api/plans", planObj);

      if (res.status === 200) {
        toast.success("Successfully built your new plan!");
      }
      router.refresh();
      router.push(`/plans/${user?.user?.id}`);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <form className="flex flex-col gap-4 justify-center py-2 rounded-md md:flex-row">
        {/* Form Section */}

        <section className="flex flex-col w-full gap-4">
          <h2 className="text-lg font-bold">Plan Details</h2>
          <section className="w-full flex flex-col gap-4">
            {/* Plan Name */}
            <section className="flex flex-col gap-2">
              <label htmlFor="name">Plan Name</label>
              <input
                disabled={loading}
                id="name"
                className="w-full md:w-72"
                type="text"
                value={planName}
                placeholder="Plan Name"
                onChange={(e) => setPlanName(e.target.value)}
              />
            </section>
            {/* Description */}
            <section className="flex flex-col gap-2">
              <label htmlFor="description">Plan Description</label>
              <textarea
                disabled={loading}
                id="description"
                className="w-full md:w-72 p-2 rounded-sm text-black md:h-24"
                value={description}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </section>
          </section>
        </section>

        <section className="w-full flex flex-col gap-4">
          <h2 className="text-lg font-bold">Exercise List</h2>
          <section className="w-full flex flex-col md:flex-row gap-2 md:items-center">
            {/* Exercise Name */}
            <section className="flex flex-col gap-2">
              <label htmlFor="exercise">Exercise Name</label>
              <input
                disabled={loading}
                id="exercise"
                className="w-full md:w-36"
                type="text"
                value={exercise}
                placeholder="Exercise Name"
                onChange={(e) => setExercise(e.target.value)}
              />
            </section>

            {/* Type */}
            <section className="flex flex-col gap-2">
              <label htmlFor="type">Type</label>
              <select
                disabled={loading}
                className="w-full md:w-32 h-8"
                name="type"
                id="type"
                onChange={(e) => setType(e.target.value)}
                value={type}
              >
                <option value="resistance">Resistance</option>
                <option value="cardio">Cardio</option>
              </select>
            </section>

            {type != "cardio" && (
              <section className="flex flex-col gap-2">
                <label htmlFor="sets">Sets</label>
                <input
                  disabled={loading}
                  id="sets"
                  className="w-full md:w-10"
                  type="text"
                  value={sets}
                  placeholder="Sets"
                  onChange={(e) => setSets(Number(e.target.value))}
                />
              </section>
            )}

            {type != "cardio" && (
              <section className="flex flex-col gap-2">
                <label htmlFor="reps">Reps</label>
                <input
                  disabled={loading}
                  id="reps"
                  className="w-full md:w-10"
                  type="text"
                  value={reps}
                  placeholder="Reps"
                  onChange={(e) => setReps(Number(e.target.value))}
                />
              </section>
            )}

            {type === "cardio" && (
              <section className="flex flex-col gap-2 relative">
                <label htmlFor="duration">Duration</label>
                <input
                  disabled={loading}
                  id="duration"
                  className="w-full md:w-[88px]"
                  type="text"
                  value={duration}
                  placeholder="Duration in minutes"
                  onChange={(e) => setDuration(Number(e.target.value))}
                />
                <span className="text-black absolute right-1.5 bottom-[5px] text-sm bg-white">
                  mins
                </span>
              </section>
            )}

            <button
              disabled={loading}
              onClick={addExerciseToList}
              type="button"
              className="w-full bg-green-600 hover:bg-green-700 rounded-sm text-white px-4 py-2 disabled:bg-gray-300 ease-linear duration-200 mt-8"
            >
              Add
            </button>
          </section>
          {/* Exercise List */}
          <table className="table-auto w-full">
            <thead className="h-8 text-xs md:text-[16px] font-semibold uppercase text-yellow-50 bg-blue-900/60">
              <tr className="p-2 whitespace-nowrap">
                <th>
                  <div className="font-semibold text-left px-2">Exercise</div>
                </th>
                <th>
                  <div className="font-semibold text-left px-2">Type</div>
                </th>
                <th>
                  <div className="font-semibold text-left px-2">Reps</div>
                </th>
                <th>
                  <div className="font-semibold text-left px-2">Duration</div>
                </th>
              </tr>
            </thead>

            <tbody className="text-sm divide-y divide-gray-100 w-full">
              {exercises.length > 0 ? (
                exercises.map((exercise, idx) => (
                  <tr
                    key={idx}
                    className="w-full text-xs md:text-[14px] bg-blue-900/20 hover:bg-indigo-600 cursor-pointer hover:text-white"
                  >
                    <td className="py-2 whitespace-nowrap px-2">
                      {exercise.name}
                    </td>
                    <td className="py-2 whitespace-nowrap px-2">
                      {exercise.type}
                    </td>
                    <td className="py-2 whitespace-nowrap px-2">{`${exercise.sets} x ${exercise.reps}`}</td>
                    <td className="py-2 whitespace-nowrap px-2">
                      {exercise.duration}m
                    </td>
                  </tr>
                ))
              ) : (
                <span className="w-full">
                  <td className="pt-2 px-2">No exercises added.</td>
                </span>
              )}
            </tbody>
          </table>
          <section className="flex justify-end">
            <button
              disabled={loading}
              onClick={handleSubmitPlan}
              type="button"
              className="w-full md:w-40 bg-indigo-600 hover:bg-indigo-700 rounded-sm mt-4 text-white px-4 py-2 hover:underline disabled:bg-gray-300"
            >
              Submit
            </button>
          </section>
        </section>
      </form>
    </section>
  );
}
