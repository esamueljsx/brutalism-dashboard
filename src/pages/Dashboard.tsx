import StatCard from "@/components/StatCard";
import StackedBarChart from "@/components/ui/bar-chart";
import { Card } from "@/components/ui/card";
import LineChart from "@/components/ui/line-chart";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Marketing</h1>

          <Tabs defaultValue="7-days" className="max-w-[250.56px]">
            <TabsList>
              <TabsTrigger value="7-days">
                7 D<span className="max-sm:hidden">ays</span>
              </TabsTrigger>
              <TabsTrigger value="14-days">
                14 D<span className="max-sm:hidden">ays</span>
              </TabsTrigger>
              <TabsTrigger value="30-days">
                30 D<span className="max-sm:hidden">ays</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 w-full gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 md:gap-4">
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
                  <budget.icon size={32} />
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
