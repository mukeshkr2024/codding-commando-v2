import { Card } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export const Chart = ({ data }) => {
  return (
    <Card className="mt-8 rounded-md bg-white p-4 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        Revenue Chart
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="course"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#f0f0f0",
              border: "1px solid #e0e0e0",
              color: "#333",
            }}
          />
          <Legend wrapperStyle={{ color: "#333", fontSize: "12px" }} />
          <Bar
            dataKey="revenue"
            fill="#3182ce"
            radius={[4, 4, 0, 0]}
            name="Total Revenue"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
