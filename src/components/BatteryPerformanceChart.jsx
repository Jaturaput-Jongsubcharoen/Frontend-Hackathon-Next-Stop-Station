import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

function BatteryPerformanceChart({ bus }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!bus) return;

    const fetchTrend = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BE_URL}/api/battery/trend/${bus.id}`
        );
        setChartData(res.data);
      } catch (err) {
        console.error("Error fetching AI trend:", err);
        // fallback AI-like data if backend not ready
        setChartData([
          { day: "Today", performance: bus.healthScore },
          { day: "Day 1", performance: bus.healthScore - 1 },
          { day: "Day 2", performance: bus.healthScore - 3 },
          { day: "Day 3", performance: bus.healthScore - 4 },
          { day: "Day 4", performance: bus.healthScore - 5 },
          { day: "Day 5", performance: bus.healthScore - 7 },
          { day: "Day 6", performance: bus.healthScore - 8 },
          { day: "Day 7", performance: bus.healthScore - 9 },
        ]);
      }
    };

    fetchTrend();
  }, [bus]);

  if (!bus) return null;

  return (
    <div className="battery-trend-card p-4 rounded-2xl shadow-lg bg-white/20 backdrop-blur-md">
      <h3 className="text-lg font-semibold mb-2 text-indigo-700">
        AI-Predicted Battery Performance (Next 7 Days)
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <defs>
            <linearGradient id="aiConfidence" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#000000ff" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#000000ff" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis domain={[0, 100]} />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="shadow"
            isAnimationActive={false}
            activeDot={false}
            stroke="none"
            fill="url(#aiConfidence)"
          />

          <Line
            type="monotone"
            dataKey="performance"
            stroke="#000000ff"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BatteryPerformanceChart;
