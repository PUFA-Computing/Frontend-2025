//ts no-check
"use client";

import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend
);

export default function LineChart() {
    const data = {
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
        ],
        datasets: [
            {
                label: "My First Dataset",
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                tension: 0.1,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
            title: {
                display: true,
                text: "Line Chart Example",
            },
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: "Month",
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: "Value",
                },
            },
        },
    };
    return <Line data={data} options={options} />;
}
