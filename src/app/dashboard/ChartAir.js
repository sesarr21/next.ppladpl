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
        <YAxis ticks={[20, 40, 60, 80, 100]} domain={[0, 100]} />
        <Tooltip />
        <Line dataKey="value" type="monotone" name="Ketinggian air" stroke="#007bff" />
      </LineChart>
    </ResponsiveContainer>
  );
}
