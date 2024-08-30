import ProductHeader from "../ProductHeader";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import SalaryItem from "./SalaryItem";
import YourCompensation from "./YourCompensation";
import Benefits from "./Benefits";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

const TotalRewards = () => {
  const { getUser, user, isLoading } = useAuth();
  console.log(user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUser(); // Ensure this updates the user state correctly
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchData();
  }, [getUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Loading user data...</div>;
  }

  const salaryTypes = [
    {
      type: "base",
      color: "hsl(190, 100%, 42%)",
    },
    {
      type: "variable",
      color: "hsl(41, 93%, 65%)",
    },
    {
      type: "bonus",
      color: "hsl(165, 99%, 34%)",
    },
    {
      type: "equity",
      color: "hsl(337, 93%, 67%)",
    },
    {
      type: "benefits",
      color: "hsl(219, 99%, 53%)",
    },
  ];

  const chartData = [
    {
      salaryType: "base",
      salary: user.salary.base,
      fill: "var(--color-base)",
    },
    {
      salaryType: "variable",
      salary: user.salary.variable,
      fill: "var(--color-variable)",
    },
    {
      salaryType: "bonus",
      salary: user.salary.bonus,
      fill: "var(--color-bonus)",
    },
    {
      salaryType: "equity",
      salary: user.salary.equity,
      fill: "var(--color-equity)",
    },
    {
      salaryType: "benefits",
      salary: user.salary.benefits,
      fill: "var(--color-benefits)",
    },
  ];
  const chartConfig = {
    base: {
      label: "Base",
      color: "hsl(190, 100%, 42%)",
    },
    variable: {
      label: "Variable",
      color: "hsl(41, 93%, 65%)",
    },
    bonus: {
      label: "Bonus",
      color: "hsl(165, 99%, 34%)",
    },
    equity: {
      label: "Equity",
      color: "hsl(337, 93%, 67%)",
    },
    benefits: {
      label: "Benefits",
      color: "hsl(219, 99%, 53%)",
    },
  };

  const employee = user;
  console.log(employee.salary);

  return (
    <div className="w-full bg-white shadow-md rounded-md  lg:max-w-[67vw] md:max-w-[63vw] mx-auto pb-10 mb-10">
      <ProductHeader header={"Total Rewards"} />
      <div className="flex items-center justify-center sm:justify-between flex-wrap px-6 lg:gap-x-10 gap-x-6 gap-y-4 pt-4">
        <div className="lg:pr-6">
          <div className="flex flex-col w-[200px]">
            <div className="flex-1 pb-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={chartData}
                    dataKey="salary"
                    nameKey="salaryType"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            ></text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 px-6 py-6 flex flex-col gap-4 justify-center rounded-md">
          <p className="text-sm font-semibold">Annual Total Rewards</p>
          <p className="text-3xl lg:text-4xl font-semibold">
            $
            {Object.values(employee.salary)
              .filter((s) => typeof s === "number")
              .reduce((total, curr) => (total += curr), 0)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            <span className="text-xl -translate-y-2 font-bold"> USD</span>
          </p>
        </div>
        <div className="flex flex-col flex-grow gap-1 min-w-[200px] mt-6">
          {salaryTypes.map((type) => (
            <SalaryItem
              key={type.color}
              salary={employee.salary[type.type]}
              salaryType={type.type}
              color={type.color}
            />
          ))}
        </div>
      </div>
      <YourCompensation employee={employee} />
      <Benefits employee={employee} />
    </div>
  );
};

export default TotalRewards;
