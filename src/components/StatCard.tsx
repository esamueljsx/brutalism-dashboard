import type { Statistics } from "@/types";
import { Card } from "./ui/card";

const StatCard = ({
  name,
  value,
  icon: Icon,
  previous,
  progress,
  trend,
}: Statistics) => {
  return (
    <Card className="w-full gap-1">
      <p className="text-base font-medium">{name}</p>

      <div className="flex items-center justify-between gap-2">
        <h5 className="text-3xl font-semibold">{value}</h5>
        <Icon className="text-lime-500 text-3xl" />
      </div>

      <div className="flex justify-between gap-2 text-xs">
        <div className="flex flex-col items-start">
          <span>Previous</span>
          <span className="font-semibold">{previous}</span>
        </div>
        <div className="flex flex-col items-end">
          <span>Progress</span>
          <span
            className={`font-semibold ${
              trend === "up" ? "text-lime-500" : "text-red-500"
            }`}
          >
            {progress}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
