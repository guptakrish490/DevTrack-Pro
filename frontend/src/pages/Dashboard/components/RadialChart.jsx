import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#a855f7", "#f97316", "#22c55e"];

const RadialChart = ({ taskCounts }) => {
  const data = [
    { name: "Completed", value: taskCounts?.completed ?? 10 },
    { name: "In Progress", value: taskCounts?.inProgress ?? 5 },
    { name: "Planned", value: taskCounts?.planned ?? 8 },
  ];


  return (
    <div className="w-full h-75">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} stroke="none" />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadialChart;
