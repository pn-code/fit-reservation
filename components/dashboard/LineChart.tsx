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

import LineDivider from "@/components/LineDivider";

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
    userData: { x: string; y: number }[] | undefined;
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
        redraw: true,
        updateMode: "resize",
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: "black",
                },
                position: "bottom" as const,
            },
            title: {
                display: true,
                text: title,
                color: "black",
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
                    color: "black",
                },
            },
            y: {
                beginAtZero: false,
                ticks: {
                    stepSize: 1,
                    color: "black",
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
        <section className="w-full h-full bg-white border border-primary md:p-4 rounded-sm">
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <Line data={data} options={options} />
        </section>
    );
}
