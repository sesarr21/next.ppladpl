"use client";

import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function ChartAir() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/ketinggian-air")
      .then((res) => res.json())
      .then((data) => {
        const transformed = data.map(item => ({
          value: item.nilai,
          date: new Date(item.timestamp).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })
        }));
        setData(transformed);
      });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid />
        <XAxis dataKey="date" />
        <YAxis ticks={[2, 4, 6, 8, 10]} domain={[0, 10]} />
        <Tooltip />
        <Line dataKey="value" type="monotone" name="Ketinggian air" stroke="#205781" strokeWidth={2}  dot={{ fill: "#205781", stroke: "#ffffff", strokeWidth: 2, r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
