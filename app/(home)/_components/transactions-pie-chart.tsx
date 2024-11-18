"use client";

import { Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionType } from "@prisma/client";
import { Card, CardContent } from "@/app/_components/ui/card";
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types";
import PercentageItem from "./percentage-item";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Ivestido",
    color: "#ffffff",
  },
  [TransactionType.DEPOSIT]: {
    label: "Rendimentos",
    color: "#55802e",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#e93630",
  },
} satisfies ChartConfig;

interface TransactionsPieChartProps {
  typesPercentage: TransactionPercentagePerType;
  depositsTotal: number;
  investimentstotal: number;
  expensesTotal: number;
}

const TransactionsPieChart = ({
  depositsTotal,
  investimentstotal,
  expensesTotal,
  typesPercentage,
}: TransactionsPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#55802e",
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#e93630",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investimentstotal,
      fill: "#ffffff",
    },
  ];
  return (
    <Card className="flex flex-col p-6">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
        <div className="mb-2 mt-3 space-y-3">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            value={typesPercentage[TransactionType.DEPOSIT]}
            title="Receita"
          />
          <PercentageItem
            icon={<TrendingDownIcon size={16} className="text-red-500" />}
            value={typesPercentage[TransactionType.EXPENSE]}
            title="Despesas"
          />
          <PercentageItem
            icon={<PiggyBankIcon size={16} />}
            value={typesPercentage[TransactionType.INVESTMENT]}
            title="Investimentos"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsPieChart;
