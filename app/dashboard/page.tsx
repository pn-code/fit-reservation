"use client";
import { useEffect, useState } from "react";
import MeasurementsForm from "../../components/MeasurementsForm";
import StatisticsSection from "../../components/StatisticsSection";
import axios from "axios";

function DashboardPage() {
    const [weights, setWeights] = useState<WeightMeasurement[]>([]);
    const [bodyFats, setBodyFats] = useState<BodyFatMeasurement[]>([]);

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

        getWeightData();
        getBFData();
    }, []);

    useEffect(() => {
		if(weights.length > 0) {
			setCurrentWeight(weights[weights.length - 1].weight);
		}

		if(bodyFats.length > 0) {
			setCurrentBF(bodyFats[bodyFats.length - 1].bodyfat);
		}
    }, [weights, bodyFats]);

    return (
        <main className="w-full h-full bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-10 text-white/90">
            <header className="flex justify-between font-bold pb-2 border-b-2 border-b-indigo-600 items-center">
                <h1 className="text-3xl">Dashboard</h1>
            </header>

            {/* Statistics */}
            <StatisticsSection
                currentBF={currentBF}
                currentWeight={currentWeight}
            />

            {/* Add Measurements */}
            <MeasurementsForm
                setWeights={setWeights}
                setBodyFats={setBodyFats}
            />

            {/* Calorie Goals */}
            <section></section>
        </main>
    );
}

export default DashboardPage;
