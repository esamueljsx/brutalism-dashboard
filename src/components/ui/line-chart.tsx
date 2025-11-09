import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
} from "chart.js";
import type { FC } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineChartProps {
  labels: string[];
  datasets?: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
  options: ChartOptions<"line">;
}

const LineChart: FC<LineChartProps> = ({ labels, datasets, options }) => {
  const defaultDatasets = [
    {
      label: "default",
      data: [10, 20, 30, 40],
      backgroundColor: "#fff9b320",
      borderColor: "#23CE6B",
      //borderWidth: 2,
      borderCapStyle: "round",
      borderDashOffset: [10],
      //fill: true,
      lineTension: "0.4",
      pointBackgroundColor: "#23CE6B",
      pointRadius: 0,
      pointHitRadius: 10,
    },
  ];

  const defaultChartOptions: ChartOptions<"line"> = {
    maintainAspectRatio: false,
    responsive: true,
    animation: { duration: 1000 },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data = {
    labels,
    datasets: datasets ?? defaultDatasets,
  };

  return <Line data={data} options={options ?? defaultChartOptions} />;
};

export default LineChart;
