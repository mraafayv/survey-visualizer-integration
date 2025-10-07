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
import "./CategoriesChart.css";

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

export const CategoriesChart = ({ data = [], singleCategory, isLoading }) => {
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
      transform={`rotate(${singleCategory ? 0 : -30}, ${x}, ${y})`}
      style={{ fontSize: `${singleCategory ? 16 : 12}` }}
    >
      {payload.value.length > 15
        ? payload.value.slice(0, 15) + "…"
        : payload.value}
    </text>
  );
  const ChartSkeleton = () => (
    <div className="chart-skeleton">
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis width={140} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="overlay">
        <span className="loading-text">Loading...</span>
      </div>
    </div>
  );

  return (
    <>
      {isLoading ? (
        <ChartSkeleton />
      ) : (
        <ResponsiveContainer width="100%" maxHeight={400}>
          <BarChart
            data={categoryDataArr}
            layout="vertical"
            margin={{ top: 8, right: 16, bottom: 8, left: 120 }}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis type="number" />
            <YAxis
              type="category"
              dataKey="name"
              width={140}
              interval={0}
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
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
};
