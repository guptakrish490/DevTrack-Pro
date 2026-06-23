import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["purple", "orange", "gray"];

const RadialChart = ({ taskCounts }) => {
  const data = [
    { name: "Completed", value: taskCounts?.completed || 0 },
    { name: "In Progress", value: taskCounts?.inProgress || 0 },
    { name: "Planned", value: taskCounts?.planned || 0 },
  ];

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="text-sm text-white/80 flex w-full justify-center lg:flex-col lg:items-start space-y-1">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} className="flex lg:justify-start justify-center items-center gap-2 w-full px-4">
            <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
            <span className="text-sm">{entry.value}: {data[index].value}</span>
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
            innerRadius="58%"
            outerRadius="80%"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} stroke="none"/>
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
