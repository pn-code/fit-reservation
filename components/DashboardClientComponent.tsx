"use client";
import { useEffect, useState } from "react";
import StatisticsSection from "./StatisticsSection";
import axios from "axios";
import LineChart from "./LineChart";
import moment from "moment";
import BodyWeightForm from "./BodyWeightForm";
import BodyFatForm from "./BodyFatForm";

export default function DashboardClientComponent() {
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
            <section className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                {/* Statistics */}
                <StatisticsSection
                    currentBF={currentBF}
                    currentWeight={currentWeight}
                    calorieGoal={calorieGoal}
                />
                {/* Charts */}

                <section className="flex flex-col gap-4 flex-1">
                    <h2 className="text-2xl font-semibold">
                        Your Measurements
                    </h2>
                    <section className="flex flex-col gap-4 2xl:flex-row">
                        <section className="w-full bg-blue-900/40 p-2 rounded-md flex flex-col gap-2">
                            <LineChart
                                title="Your Body Weight"
                                label="Weight (lbs)"
                                userData={formattedWeights}
                                pointColor="rgb(163, 245, 157)"
                                borderColor="rgb(87, 224, 76)"
                            />
                            <BodyWeightForm setWeights={setWeights} />
                        </section>
                        <section className="w-full bg-blue-900/40 p-2 rounded-md flex flex-col gap-2">
                            <LineChart
                                title="Your Body Fat"
                                label="Body Fat (%)"
                                userData={formattedBodyFats}
                                pointColor="rgb(222, 155, 129)"
                                borderColor="rgb(232, 151, 70)"
                            />
                            <BodyFatForm setBodyFats={setBodyFats} />
                        </section>
                    </section>
                </section>
            </section>
    );
}
