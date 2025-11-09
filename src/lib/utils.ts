import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const acquisitionVersusCostYScale = {
  responsive: true,
  animation: { duration: 1000 },
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y1: {
      type: "linear" as const,
      position: "left" as const,
      beginAtZero: true,
      min: 0,
      max: 800,
      ticks: {
        stepSize: 100,
      },
      title: {
        display: false,
        text: "acquisition",
      },
    },
    y2: {
      type: "linear" as const,
      position: "right" as const,
      beginAtZero: true,
      min: 0,
      max: 6000,
      ticks: {
        stepSize: 1000,
        callback: (value: number | string) => `${value}$`,
      },
      grid: {
        drawOnChartArea: false,
      },
      title: {
        display: false,
        text: "cost ($)",
      },
    },
  },
};