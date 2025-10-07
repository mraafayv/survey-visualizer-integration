import React from "react";
import {
  Pie,
  PieChart,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = {
  easy: "green",
  medium: "orange",
  hard: "red",
};

export const DifficultyChart = ({ data=[] }) => {

  const easy = data?.filter((q) => q.difficulty === "easy");
  const medium = data?.filter((q) => q.difficulty === "medium");
  const hard = data?.filter((q) => q.difficulty === "hard");

  const difficultyData = [
    { name: "easy", value: easy?.length },
    { name: "medium", value: medium?.length },
    { name: "hard", value: hard?.length },
  ];

  return (
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
  );
};
