"use client";
import { useEffect, useState } from "react";
import StatisticsSection from "./StatisticsSection";
import axios from "axios";
import LineChart from "./LineChart";
import BodyWeightForm from "./BodyWeightForm";
import BodyFatForm from "./BodyFatForm";
import { toast } from "react-hot-toast";
import { getPrevMonthDateISOString } from "../helpers/getPrevMonthDateISOString";

export default function DashboardClientComponent() {
    const [weights, setWeights] = useState<WeightMeasurement[]>([]);
    const [bodyFats, setBodyFats] = useState<BodyFatMeasurement[]>([]);
    const [calorieGoal, setCalorieGoal] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [showWeights, setShowWeights] = useState(false);
    const [showBodyFats, setShowBodyFats] = useState(false);

    const formatDateString = (dateString: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            month: "short",
            day: "2-digit",
            year: "numeric" as "2-digit" | "numeric",
            timeZone: "UTC",
        };
        const formattedDate: string = date.toLocaleDateString("en-US", options);

        return formattedDate;
    };

    // Format weights and body fat for charts
    const formattedWeights =
        weights.length > 0
            ? weights?.map((data) => ({
                  x: formatDateString(data.createdAt),
                  y: data.weight,
              }))
            : [];

    const formattedBodyFats =
        bodyFats.length > 0
            ? bodyFats.map((data) => ({
                  x: formatDateString(data.createdAt),
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
            setCurrentWeight(weights[0].weight);
        }

        if (bodyFats.length > 0) {
            setCurrentBF(bodyFats[0].bodyfat);
        }
    }, [weights, bodyFats]);

    const deleteWeight = async (id: number) => {
        try {
            setLoading(true);
            const res = await axios.delete(`/api/weight_measurements/${id}`);

            if (res.status == 200) {
                setWeights((prev) =>
                    [...prev].filter((weight) => weight.id !== id)
                );
                toast.success("Successfully deleted weight!");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error has occurred during deletion.");
        } finally {
            setLoading(false);
        }
    };

    const deleteBodyFat = async (id: number) => {
        try {
            setLoading(true);
            const res = await axios.delete(`/api/bf_measurements/${id}`);

            if (res.status == 200) {
                setBodyFats((prev) =>
                    [...prev].filter((bodyFats) => bodyFats.id !== id)
                );
                toast.success("Successfully deleted bodyfat!");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error has occurred during deletion.");
        } finally {
            setLoading(false);
        }
    };

    const getDataOnlyFromLastMonth = (data: any[]) => {
        const prevMonthDate = getPrevMonthDateISOString();

        const newData = data.filter(
            (dataObj) => dataObj.createdAt > prevMonthDate
        );
        return newData;
    };

    const calculateDataTrend = (
        lastValue: number,
        firstValue: number
    ): number => {
        return Number((firstValue - lastValue).toFixed(1));
    };

    const userWeightForLastMonth = getDataOnlyFromLastMonth(weights);
    const userWeightTrendLastMonth = calculateDataTrend(
        userWeightForLastMonth[userWeightForLastMonth.length - 1]?.weight,
        userWeightForLastMonth[0]?.weight
    );

    const userBodyFatForLastMonth = getDataOnlyFromLastMonth(bodyFats);
    const userBodyFatTrendLastMonth = calculateDataTrend(
        userBodyFatForLastMonth[userBodyFatForLastMonth.length - 1]?.bodyfat,
        userBodyFatForLastMonth[0]?.bodyfat
    );

    return (
        <section className="flex flex-col gap-4 lg:flex-row lg:justify-between">
            {/* Charts */}
            <section className="flex flex-col gap-4 flex-1">
                <h2 className="text-2xl font-semibold">Your Measurements</h2>
                <section className="flex flex-col gap-6 xl:flex-row">
                    <section className="h-fit w-full rounded-md flex flex-col gap-2">
                        <header className="flex justify-between sm:items-center sm:flex-row flex-col">
                            <h3 className="text-lg">
                                Body Weight Measurements
                            </h3>
                            <span
                                className={`text-xs sm:text-[16px] ${
                                    userWeightTrendLastMonth < 0
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                                {userWeightTrendLastMonth} lbs this month
                            </span>
                        </header>

                        <h4 className="text-amber-300">
                            Last Recorded Body Weight: {currentWeight} lbs
                        </h4>

                        <LineChart
                            title="Your Body Weight"
                            label="Weight (lbs)"
                            userData={formattedWeights}
                            pointColor="rgb(163, 245, 157)"
                            borderColor="rgb(87, 224, 76)"
                        />

                        <BodyWeightForm setWeights={setWeights} />
                        <button
                            type="button"
                            className="rounded-md bg-gray-500 mx-4 py-2 hover:bg-gray-600 text-sm"
                            onClick={() =>
                                setShowWeights((weights) => !weights)
                            }
                        >
                            {showWeights ? "Hide " : "Show "} Weights
                        </button>
                        {showWeights && (
                            <table>
                                <thead className="text-center sm:text-left">
                                    <tr>
                                        <th>Date</th>
                                        <th>Weight</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center sm:text-left">
                                    {weights.map((weightObj) => (
                                        <tr
                                            key={weightObj.id}
                                            className="hover:bg-gray-900"
                                        >
                                            <td>
                                                {formatDateString(
                                                    weightObj.createdAt
                                                )}
                                            </td>
                                            <td>
                                                {weightObj.weight.toFixed(1)}
                                            </td>
                                            <td>
                                                <button
                                                    disabled={loading}
                                                    type="button"
                                                    onClick={() =>
                                                        deleteWeight(
                                                            weightObj.id
                                                        )
                                                    }
                                                    className="disabled:bg-gray-700 bg-red-500 hover:bg-red-700 rounded-full w-12 text-center"
                                                >
                                                    X
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </section>
                    <section className="h-fit w-full rounded-md flex flex-col gap-2">
                        <header className="flex justify-between sm:items-center sm:flex-row flex-col">
                            <h3 className="text-lg">Body Fat Measurements</h3>
                            <span
                                className={`text-xs sm:text-[16px] ${
                                    userBodyFatTrendLastMonth < 0
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                                {userBodyFatTrendLastMonth} % this month
                            </span>
                        </header>

                        <h4 className="text-amber-300">
                            Last Recorded Body Fat Percentage: {currentBF}%
                        </h4>
                        <LineChart
                            title="Your Body Fat"
                            label="Body Fat (%)"
                            userData={formattedBodyFats}
                            pointColor="rgb(222, 155, 129)"
                            borderColor="rgb(232, 151, 70)"
                        />
                        <BodyFatForm setBodyFats={setBodyFats} />
                        <button
                            type="button"
                            className="rounded-md bg-gray-500 mx-4 py-2 hover:bg-gray-600 text-sm"
                            onClick={() => setShowBodyFats((bf) => !bf)}
                        >
                            {showBodyFats ? "Hide " : "Show "} Body Fats
                        </button>
                        {showBodyFats && (
                            <table>
                                <thead className="text-center sm:text-left">
                                    <tr>
                                        <th>Date</th>
                                        <th>Body Fat</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center sm:text-left">
                                    {bodyFats.map((bodyFatObj) => (
                                        <tr
                                            key={bodyFatObj.id}
                                            className="hover:bg-gray-900"
                                        >
                                            <td>
                                                {formatDateString(
                                                    bodyFatObj.createdAt
                                                )}
                                            </td>
                                            <td>
                                                {bodyFatObj.bodyfat.toFixed(1)}
                                            </td>
                                            <td>
                                                <button
                                                    disabled={loading}
                                                    type="button"
                                                    onClick={() =>
                                                        deleteBodyFat(
                                                            bodyFatObj.id
                                                        )
                                                    }
                                                    className="disabled:bg-gray-700 bg-red-500 hover:bg-red-700 rounded-full w-12 text-center"
                                                >
                                                    X
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </section>
                </section>
            </section>
        </section>
    );
}
