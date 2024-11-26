import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { x: 'Jan', Data1: 200, Data2: 300 },
  { x: 'Feb', Data1: 250, Data2: 280 },
  { x: 'Mar', Data1: 300, Data2: 260 },
  { x: 'Apr', Data1: 220, Data2: 310 },
  { x: 'May', Data1: 280, Data2: 290 },
  { x: 'Jun', Data1: 310, Data2: 250 },
  { x: 'Jul', Data1: 270, Data2: 240 },
  { x: 'Aug', Data1: 290, Data2: 300 },
  { x: 'Sep', Data1: 320, Data2: 310 },
  { x: 'Oct', Data1: 540, Data2: 330 },
  { x: 'Nov', Data1: 162, Data2: 292 },
  { x: 'Dec', Data1: 220, Data2: 280 },
];

export const Chart = () => {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <h3 style={{ textAlign: 'center' }}>Nombre de connexions par mois</h3>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 20, right: 40, bottom: 20, left: 20 }}
        >
          {/* Grid lines */}
          <CartesianGrid strokeDasharray="3 3" />
          {/* Axes */}
          <XAxis dataKey="x" />
          <YAxis />
          {/* Tooltip */}
          <Tooltip />
          {/* Legend */}
          <Legend verticalAlign="top" />
          {/* Data Lines */}
          <Line
            type="monotone"
            dataKey="Data1"
            stroke="#34a853"
            strokeWidth={2}
            dot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Data2"
            stroke="#3b4cc0"
            strokeWidth={2}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
