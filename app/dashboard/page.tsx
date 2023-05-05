"use client";
import { useEffect, useState } from "react";
import MeasurementsForm from "../../components/MeasurementsForm";
import StatisticsSection from "../../components/StatisticsSection";
import axios from "axios";
import LineChart from "../../components/LineChart";
import moment from "moment";

function DashboardPage() {
    const [weights, setWeights] = useState<WeightMeasurement[]>([]);
    const [bodyFats, setBodyFats] = useState<BodyFatMeasurement[]>([]);
    const [calorieGoal, setCalorieGoal] = useState<number | null>(null);

    // Format weights and body fat for charts
    const formattedWeights =
        weights.length > 0
            ? weights?.map((data) => ({
                  x: moment(data.createdAt),
                  y: data.weight,
              }))
            : [];

    const formattedBodyFats =
        bodyFats.length > 0
            ? bodyFats.map((data) => ({
                  x: moment(data.createdAt),
                  y: data.bodyfat,
              }))
            : [];

    const [currentWeight, setCurrentWeight] = useState<number | null>(null);
    const [currentBF, setCurrentBF] = useState<number | null>(null);

    useEffect(() => {
        const getWeightData = async () => {
            const res = await axios.get("/api/weight_measurements");
            setWeights(res.data);
        };

        const getBFData = async () => {
            const res = await axios.get("/api/bf_measurements");
            setBodyFats(res.data);
        };

        const getCalorieGoalData = async () => {
            const res = await axios.get("/api/calorie_goal");
            if (res.data?.goal) {
                setCalorieGoal(res.data.goal);
            }
        };

        getCalorieGoalData();
        getWeightData();
        getBFData();
    }, []);

    useEffect(() => {
        if (weights.length > 0) {
            setCurrentWeight(weights[weights.length - 1].weight);
        }

        if (bodyFats.length > 0) {
            setCurrentBF(bodyFats[bodyFats.length - 1].bodyfat);
        }
    }, [weights, bodyFats]);

    return (
        <main className="w-full h-full bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-10 text-white/90">
            <header className="flex justify-between font-bold pb-2 border-b-2 border-b-indigo-600 items-center">
                <h1 className="text-3xl">Dashboard</h1>
            </header>

            <section className="flex flex-col gap-8 sm:flex-row sm:justify-between">
                {/* Statistics */}
                <StatisticsSection
                    currentBF={currentBF}
                    currentWeight={currentWeight}
                    calorieGoal={calorieGoal}
                />

                {/* Charts */}
                <section className="flex flex-col gap-4 justify-center items-center bg-blue-900/60 rounded-md py-2 px-4 xl:flex-row flex-1 sm:flex-[2]">
                    <LineChart
                        title="Your Body Weight"
                        label="Weight (lbs)"
                        userData={formattedWeights}
                        pointColor="rgb(163, 245, 157)"
                        borderColor="rgb(87, 224, 76)"
                    />

                    <LineChart
                        title="Your Body Fat"
                        label="Body Fat (%)"
                        userData={formattedBodyFats}
                        pointColor="rgb(222, 155, 129)"
                        borderColor="rgb(232, 151, 70)"
                    />
                </section>
            </section>

            {/* Add Measurements */}
            <MeasurementsForm
                setWeights={setWeights}
                setBodyFats={setBodyFats}
            />
        </main>
    );
}

export default DashboardPage;
