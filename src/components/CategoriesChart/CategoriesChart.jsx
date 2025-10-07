import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = [
  "#6366F1", // indigo-500
  "#22C55E", // green-500
  "#F59E0B", // amber-500
  "#EF4444", // red-500
  "#3B82F6", // blue-500
  "#A855F7", // purple-500
  "#10B981", // emerald-500
  "#F97316", // orange-500
  "#06B6D4", // cyan-500
  "#84CC16", // lime-500
];

export const CategoriesChart = ({ data = [] }) => {
  const categoryData = data.reduce((acc, item) => {
    const category = item.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const categoryDataArr = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
  }));

  const CustomTick = ({ x, y, payload }) => (
    <text
      x={x}
      y={y + 4}
      textAnchor="end"
      transform={`rotate(-30, ${x}, ${y})`}
      style={{ fontSize: 12 }}
    >
      {payload.value.length > 15
        ? payload.value.slice(0, 15) + "…"
        : payload.value}
    </text>
  );

  return (
    <ResponsiveContainer width="100%" maxHeight={400}>
      <BarChart
        data={categoryDataArr}
        layout="vertical"
        margin={{ top: 8, right: 16, bottom: 8, left: 120 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis
          type="category"
          dataKey="name"
          width={140}
          tick={<CustomTick />}
        />
        <Tooltip />
        <Legend />
        <Bar
          name={"Number of Questions"}
          dataKey="value"
          radius={[4, 4, 4, 4]}
          fill="none"
        >
          {categoryDataArr.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
