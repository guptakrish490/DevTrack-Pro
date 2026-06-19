import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#D94C25", "#0F5EDB", "#5CBF1F"];

const RadialChart = ({ taskCounts }) => {
  const data = [
    { name: "Completed", value: taskCounts?.completed || 0 },
    { name: "In Progress", value: taskCounts?.inProgress || 0 },
    { name: "Planned", value: taskCounts?.planned || 0 },
  ];

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="text-sm text-white/80 flex gap-4 space-y-1">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} className="flex items-center gap-1 justify-center w-full px-1">
            <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
            <span className="text-xs">{entry.value}: {data[index].value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-full h-full flex">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="80%"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Legend content={renderLegend} />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadialChart;
