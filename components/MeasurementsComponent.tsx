"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import LineChart from "./LineChart";
import BodyWeightForm from "./BodyWeightForm";
import BodyFatForm from "./BodyFatForm";
import { toast } from "react-hot-toast";
import { getPrevMonthDateISOString } from "../helpers/getPrevMonthDateISOString";

export default function MeasurementsComponent() {
    const [weights, setWeights] = useState<WeightMeasurement[]>([]);
    const [weightsLastMonth, setWeightsLastMonth] = useState<
        WeightMeasurement[]
    >([]);

    const [bodyFats, setBodyFats] = useState<BodyFatMeasurement[]>([]);
    const [bodyFatsLastMonth, setBodyFatsLastMonth] = useState<
        BodyFatMeasurement[]
    >([]);

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

    const formatWeights = (weights: WeightMeasurement[]) => {
        return weights.length > 0
            ? weights.map((data) => ({
                  x: formatDateString(data.createdAt),
                  y: data.weight,
              }))
            : [];
    };

    const formatBodyFats = (bodyFat: BodyFatMeasurement[]) => {
        return bodyFat.length > 0
            ? bodyFat.map((data) => ({
                  x: formatDateString(data.createdAt),
                  y: data.bodyfat,
              }))
            : [];
    };

    const formattedWeightsLastMonth = formatWeights(weightsLastMonth);
    const formattedBodyFatsLastMonth = formatBodyFats(bodyFatsLastMonth);

    const [weightsToDisplay, setWeightsToDisplay] = useState("month");
    const [bodyFatsToDisplay, setBodyFatsToDisplay] = useState("month");

    const userWeightTrend =
        weightsToDisplay == "month"
            ? calculateDataTrend(
                  weightsLastMonth[weightsLastMonth.length - 1]?.weight,
                  weightsLastMonth[0]?.weight
              )
            : calculateDataTrend(
                  weights[weights.length - 1]?.weight,
                  weights[0]?.weight
              );

    const userBodyFatTrend =
        bodyFatsToDisplay == "month"
            ? calculateDataTrend(
                  bodyFatsLastMonth[bodyFatsLastMonth.length - 1]?.bodyfat,
                  bodyFatsLastMonth[0]?.bodyfat
              )
            : calculateDataTrend(
                  bodyFats[bodyFats.length - 1]?.bodyfat,
                  bodyFats[0]?.bodyfat
              );

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
        if (weights.length > 0) {
            setCurrentWeight(weights[0].weight);
        }

        if (bodyFats.length > 0) {
            setCurrentBF(bodyFats[0].bodyfat);
        }
    }, [weights, bodyFats]);

    useEffect(() => {
        setWeightsLastMonth(getDataOnlyFromLastMonth(weights));
    }, [weights]);

    useEffect(() => {
        setBodyFatsLastMonth(getDataOnlyFromLastMonth(bodyFats));
    }, [bodyFats]);

    return (
        <section className="flex flex-col gap-4">
            {/* Charts */}
            <section className="flex flex-col gap-4 flex-1">
                <h2 className="text-2xl font-semibold">Your Measurements</h2>
                <section className="flex flex-col gap-6">
                    {/* Body Weight Charts */}
                    <section className="h-fit w-full rounded-md flex flex-col gap-2 flex-1">
                        <header className="flex justify-between sm:items-center sm:flex-row flex-col">
                            <h3 className="text-lg">
                                Body Weight Measurements
                            </h3>
                            <div className="hidden sm:flex gap-2 rounded-md px-4 py-2 bg-gray-800/80 justify-between">
                                <button
                                    onClick={() => setWeightsToDisplay("month")}
                                    className={
                                        weightsToDisplay === "month"
                                            ? "w-full px-4 py-1 text-white rounded-md border border-gray-400 hover:bg-indigo-800 ease-linear duration-200 bg-indigo-700 font-semibold"
                                            : "w-full px-4 py-1 bg-gray-800 text-white rounded-md border border-gray-400 hover:bg-gray-700 ease-linear duration-200"
                                    }
                                >
                                    30D
                                </button>
                                <button
                                    onClick={() => setWeightsToDisplay("all")}
                                    className={
                                        weightsToDisplay === "all"
                                            ? "w-full px-4 py-1 text-white rounded-md border border-gray-400 hover:bg-indigo-800 ease-linear duration-200 bg-indigo-700 font-semibold"
                                            : "w-full px-4 py-1 bg-gray-800 text-white rounded-md border border-gray-400 hover:bg-gray-700 ease-linear duration-200"
                                    }
                                >
                                    ALL
                                </button>
                            </div>
                        </header>

                        <h4 className="text-amber-300">
                            Last Recorded Body Weight:{" "}
                            {currentWeight
                                ? `${currentWeight} lbs`
                                : "No Records"}
                        </h4>

                        <span
                            className={`text-xs sm:text-[16px] ${
                                userWeightTrend < 0
                                    ? "text-red-400"
                                    : "text-blue-400"
                            }`}
                        >
                            {userWeightTrend
                                ? `${userWeightTrend} lbs ${
                                      weightsToDisplay === "month"
                                          ? "this month"
                                          : "all time"
                                  }`
                                : "Loading..."}
                        </span>

                        <div className="flex sm:hidden gap-2 rounded-md px-4 py-2 bg-gray-800/80 justify-between">
                            <button
                                onClick={() => setWeightsToDisplay("month")}
                                className={
                                    weightsToDisplay === "month"
                                        ? "w-full px-4 py-1 text-white rounded-md border border-gray-400 hover:bg-indigo-800 ease-linear duration-200 bg-indigo-700 font-semibold"
                                        : "w-full px-4 py-1 bg-gray-800 text-white rounded-md border border-gray-400 hover:bg-gray-700 ease-linear duration-200"
                                }
                            >
                                30D
                            </button>
                            <button
                                onClick={() => setWeightsToDisplay("all")}
                                className={
                                    weightsToDisplay === "all"
                                        ? "w-full px-4 py-1 text-white rounded-md border border-gray-400 hover:bg-indigo-800 ease-linear duration-200 bg-indigo-700 font-semibold"
                                        : "w-full px-4 py-1 bg-gray-800 text-white rounded-md border border-gray-400 hover:bg-gray-700 ease-linear duration-200"
                                }
                            >
                                ALL
                            </button>
                        </div>
                        <LineChart
                            title="Your Body Weight"
                            label="Weight (lbs)"
                            userData={
                                weightsToDisplay != "month"
                                    ? formattedWeights
                                    : formattedWeightsLastMonth
                            }
                            pointColor="rgb(163, 245, 157)"
                            borderColor="rgb(87, 224, 76)"
                        />

                        <BodyWeightForm setWeights={setWeights} />

                        <button
                            type="button"
                            className="rounded-sm bg-gray-500 mx-4 py-2 hover:bg-gray-600 text-sm"
                            onClick={() =>
                                setShowWeights((weights) => !weights)
                            }
                        >
                            {showWeights ? "Hide " : "Show "} Weights
                        </button>

                        {showWeights && (
                            <table>
                                <thead className="text-center">
                                    <tr>
                                        <th>Date</th>
                                        <th>Weight</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
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

                    {/* Body Fat Charts*/}
                    <section className="h-fit w-full rounded-md flex flex-col gap-2 flex-1">
                        <header className="flex justify-between sm:items-center sm:flex-row flex-col">
                            <h3 className="text-lg">Body Fat Measurements</h3>
                            <div className="hidden sm:flex gap-2 rounded-md px-4 py-2 bg-gray-800/80 justify-between">
                                <button
                                    onClick={() =>
                                        setBodyFatsToDisplay("month")
                                    }
                                    className={
                                        bodyFatsToDisplay === "month"
                                            ? "w-full px-4 py-1 text-white rounded-md border border-gray-400 hover:bg-indigo-800 ease-linear duration-200 bg-indigo-700 font-semibold"
                                            : "w-full px-4 py-1 bg-gray-800 text-white rounded-md border border-gray-400 hover:bg-gray-700 ease-linear duration-200"
                                    }
                                >
                                    30D
                                </button>
                                <button
                                    onClick={() => setBodyFatsToDisplay("all")}
                                    className={
                                        bodyFatsToDisplay === "all"
                                            ? "w-full px-4 py-1 text-white rounded-md border border-gray-400 hover:bg-indigo-800 ease-linear duration-200 bg-indigo-700 font-semibold"
                                            : "w-full px-4 py-1 bg-gray-800 text-white rounded-md border border-gray-400 hover:bg-gray-700 ease-linear duration-200"
                                    }
                                >
                                    ALL
                                </button>
                            </div>
                        </header>

                        <h4 className="text-amber-300">
                            Last Recorded Body Fat Percentage:{" "}
                            {currentBF ? `${currentBF}%` : "No Records"}
                        </h4>

                        <span
                            className={`text-xs sm:text-[16px] ${
                                userBodyFatTrend < 0
                                    ? "text-red-400"
                                    : "text-blue-400"
                            }`}
                        >
                            {userBodyFatTrend
                                ? `${userBodyFatTrend} % ${
                                      bodyFatsToDisplay == "month"
                                          ? "this month"
                                          : "all time"
                                  }`
                                : "Loading..."}
                        </span>

                        <div className="flex sm:hidden gap-2 rounded-md px-4 py-2 bg-gray-800/80 justify-between">
                            <button
                                onClick={() => setBodyFatsToDisplay("month")}
                                className={
                                    bodyFatsToDisplay === "month"
                                        ? "w-full px-4 py-1 text-white rounded-md border border-gray-400 hover:bg-indigo-800 ease-linear duration-200 bg-indigo-700 font-semibold"
                                        : "w-full px-4 py-1 bg-gray-800 text-white rounded-md border border-gray-400 hover:bg-gray-700 ease-linear duration-200"
                                }
                            >
                                30D
                            </button>
                            <button
                                onClick={() => setBodyFatsToDisplay("all")}
                                className={
                                    bodyFatsToDisplay === "all"
                                        ? "w-full px-4 py-1 text-white rounded-md border border-gray-400 hover:bg-indigo-800 ease-linear duration-200 bg-indigo-700 font-semibold"
                                        : "w-full px-4 py-1 bg-gray-800 text-white rounded-md border border-gray-400 hover:bg-gray-700 ease-linear duration-200"
                                }
                            >
                                ALL
                            </button>
                        </div>
                        <LineChart
                            title="Your Body Fat"
                            label="Body Fat (%)"
                            userData={
                                bodyFatsToDisplay != "month"
                                    ? formattedBodyFats
                                    : formattedBodyFatsLastMonth
                            }
                            pointColor="rgb(222, 155, 129)"
                            borderColor="rgb(232, 151, 70)"
                        />

                        <BodyFatForm setBodyFats={setBodyFats} />

                        <button
                            type="button"
                            className="rounded-sm bg-gray-500 mx-4 py-2 hover:bg-gray-600 text-sm"
                            onClick={() => setShowBodyFats((bf) => !bf)}
                        >
                            {showBodyFats ? "Hide " : "Show "} Body Fats
                        </button>

                        {showBodyFats && (
                            <table>
                                <thead className="text-center">
                                    <tr>
                                        <th>Date</th>
                                        <th>Body Fat</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
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
