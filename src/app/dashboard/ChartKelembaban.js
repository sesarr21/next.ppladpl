"use client";

import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


export default function ChartKelembaban() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/kelembaban-tanah")
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
        <ResponsiveContainer width="100%" minHeight={300}>
            <LineChart data={data}>
        <CartesianGrid />
        <XAxis dataKey="date"/>
        <YAxis ticks={[200, 400, 600, 800, 1000]} domain={[0, 1000]} />
        <Tooltip />
        <Line dataKey="value" type="monotone" name="Kelembaban tanah" stroke="#205781" strokeWidth={2}  dot={{ fill: "#205781", stroke: "#ffffff", strokeWidth: 2, r: 4 }} />
        </LineChart>
        </ResponsiveContainer>        
    )
}