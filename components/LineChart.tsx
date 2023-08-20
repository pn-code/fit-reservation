import {
    Chart,
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import "chartjs-adapter-moment";
import { Line } from "react-chartjs-2";
import LineDivider from "./LineDivider";

Chart.register(
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface Props {
    userData: unknown[];
    label: string;
    title: string;
    borderColor?: string;
    pointColor?: string;
}

export default function LineChart({
    userData,
    title,
    label,
    borderColor,
    pointColor,
}: Props) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: "rgb(224, 224, 224)",
                },
                position: "bottom" as const,
            },
            title: {
                display: true,
                text: title,
                color: "rgb(240, 240, 240)",
            },
        },
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "day",
                    displayFormats: {
                        day: "MMM DD",
                    },
                },
                ticks: {
                    color: "rgb(224, 224, 224)",
                },
            },
            y: {
                beginAtZero: false,
                ticks: {
                    stepSize: 1,
                    color: "rgb(224, 224, 224)",
                },
            },
        },
    };

    const data = {
        datasets: [
            {
                label: label,
                data: userData,
                borderColor: borderColor || "gray",
                backgroundColor: pointColor || "white",
                pointRadius: 5,
                pointHoverRadius: 10,
            },
        ],
    };

    return (
        <section className="w-full h-full max-w-[700px]">
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <Line data={data} options={options} />
            <LineDivider />
        </section>
    );
}
