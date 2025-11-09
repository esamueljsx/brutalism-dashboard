import StatCard from "@/components/StatCard";
import StackedBarChart from "@/components/ui/bar-chart";
import { Card } from "@/components/ui/card";
import LineChart from "@/components/ui/line-chart";
import { Progress } from "@/components/ui/progress";
import { acquisitionVersusCostYScale } from "@/lib/utils";
import type { Statistics } from "@/types";
import {
  acquisitionVersusCostData,
  budgetByPlatform,
  statisticsData,
  trafficSourceData,
} from "@/utils/data";

export function Dashboard() {
  const { labels, datasets } = acquisitionVersusCostData;

  const lineChartData = datasets.map((data, index) => ({
    ...data,
    fill: index === 1,
    yAxisID: index === 0 ? "y1" : "y2",
    backgroundColor: index === 0 ? "" : "rgba(96, 165, 250, 0.1)",
    tension: 0.3,
    pointRadius: 0,
  }));

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex w-full justify-between gap-2">
          <h1 className="text-lg font-bold">Marketing</h1>

          {/* <div className="relative">
            <div className="radio-segmented inline-flex   shadow-[2px_2px_0_0_#000000] rounded">
              <label className="h-8 py-2  relative inline-flex    gap-x-2 text-sm tracking-[.00714em] font-medium border border-black bg-white dark:bg-neutral-600 first:rounded-s-sm last:rounded-e-sm cursor-pointer">
                <input
                  id="check4"
                  type="radio"
                  name="radios"
                  className="opacity-0 absolute inset-0"
                  value="1"
                />
                <span>
                  7 D<span className="max-sm:hidden">ays</span>
                </span>
              </label>

              <label className="h-8 py-2  relative inline-flex    gap-x-2 text-sm tracking-[.00714em] font-medium border border-black bg-white dark:bg-neutral-600 first:rounded-s-sm last:rounded-e-sm cursor-pointer">
                <input
                  id="check5"
                  type="radio"
                  name="radios"
                  className="opacity-0 absolute inset-0"
                  value="2"
                />
                <span>
                  14 D<span className="max-sm:hidden">ays</span>
                </span>
              </label>

              <label className="h-8 py-2  relative inline-flex    gap-x-2 text-sm tracking-[.00714em] font-medium border border-black bg-white dark:bg-neutral-600 first:rounded-s-sm last:rounded-e-sm cursor-pointer">
                <input
                  id="check6"
                  type="radio"
                  name="radios"
                  className="opacity-0 absolute inset-0"
                  value="3"
                />
                <span>
                  1 M<span className="max-sm:hidden">onth</span>
                </span>
              </label>
            </div>
          </div> */}
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 w-full gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
            {statisticsData.map((stat) => (
              <StatCard key={stat.name} {...(stat as Statistics)} />
            ))}
          </div>

          <Card className="w-full gap-2">
            <h5 className="font-medium">Acquisition vs Cost</h5>
            <LineChart
              labels={labels}
              datasets={lineChartData}
              options={acquisitionVersusCostYScale}
            />
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
          {/* Traffic Source */}
          <Card className="w-full gap-2">
            <h5 className="font-medium">Traffic Source</h5>
            <StackedBarChart data={trafficSourceData} />
          </Card>

          {/* Platform Budget */}
          <Card className="w-full gap-2">
            <h5 className="font-medium">Budget by Platform</h5>
            <div className="flex flex-col space-y-2">
              {budgetByPlatform.map((budget) => (
                <div key={budget.name} className="flex space-x-4 items-center">
                  <budget.icon size={30} />
                  <div className="w-full">
                    <div className="text-sm flex justify-between mb-1.5">
                      <p>Remaining {budget.remaining}</p>
                      <p>{budget.percentage}%</p>
                    </div>
                    <Progress
                      value={budget.percentage}
                      className={budget.color}
                      trackClassName={budget.track}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
