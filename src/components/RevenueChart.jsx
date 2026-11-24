import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 5500 },
  { month: "Mar", revenue: 4800 },
  { month: "Apr", revenue: 7000 },
  { month: "May", revenue: 6200 },
  { month: "Jun", revenue: 8500 },
  { month: "Jul", revenue: 7800 },
];

function RevenueChart() {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Revenue Overview</h3>
        <p>Monthly revenue performance</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;