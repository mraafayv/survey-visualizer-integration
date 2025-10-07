import React from "react";
import {
  Pie,
  PieChart,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import "./DifficultyChart.css";

const COLORS = {
  easy: "green",
  medium: "orange",
  hard: "red",
};

const placeholderData = [
  { name: "easy", value: 1 },
  { name: "medium", value: 1 },
  { name: "hard", value: 1 },
];

export const DifficultyChart = ({ data = [], isLoading }) => {
  const easy = data?.filter((q) => q.difficulty === "easy");
  const medium = data?.filter((q) => q.difficulty === "medium");
  const hard = data?.filter((q) => q.difficulty === "hard");

  const difficultyData = [
    { name: "easy", value: easy?.length },
    { name: "medium", value: medium?.length },
    { name: "hard", value: hard?.length },
  ];

  const ChartSkeleton = () => (
    <div className="chart-skeleton">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={placeholderData}
            dataKey="value"
            outerRadius={100}
            fill="#e5e7eb" // gray placeholder
          >
            {placeholderData.map((entry, idx) => (
              <Cell key={idx} fill="#e5e7eb" />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="overlay">
        <span className="loading-text">Loading…</span>
      </div>
    </div>
  );

  return (
    <>
      {isLoading ? (
        <ChartSkeleton />
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie
              data={difficultyData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {difficultyData.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      )}
    </>
  );
};
