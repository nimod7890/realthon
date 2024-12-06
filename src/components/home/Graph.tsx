"use client";

import { LabelList, Line, LineChart, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useGetReportList from "@hooks/query/useGetReportList.ts";

const chartConfig = {
  exp: {
    label: "exp",
    color: "hsl(var(--chart-5))",
  },
  dot: {
    label: "dot",
    color: "hsl(var(--chart-1))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function Graph() {
  const { reports } = useGetReportList();

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="flex flex-col justify-center items-center mb-8">
        <h4>녹색의 미래를 만드는 기록</h4>
        <p className="text-body-3">내 일상 속에서 계산된 탄소 배출량을 그래프로 확인해보세요</p>
      </div>
      <Card className="max-w-[800px] w-full px-10 py-4">
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart accessibilityLayer data={reports}>
              <XAxis
                dataKey="createdAt"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickMargin={20}
                tickFormatter={value => {
                  const date = new Date(value);
                  return date.toLocaleString("ko-KR", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                label="포인트"
                content={<ChartTooltipContent indicator="line" hideLabel />}
              />
              <Line
                dataKey="dailyExp"
                type="natural"
                stroke="var(--color-exp)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-dot)",
                }}
                activeDot={{
                  r: 6,
                }}
              >
                <LabelList position="top" offset={16} className="fill-foreground" fontSize={12} />
              </Line>
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
