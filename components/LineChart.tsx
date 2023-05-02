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
    userData: any[];
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
                position: "top" as const,
            },
            title: {
                display: true,
                text: title,
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
            },
            y: {
                beginAtZero: false,
                ticks: {
                    stepSize: 10,
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

    // @ts-ignore
    return <Line data={data} options={options} />;
}
