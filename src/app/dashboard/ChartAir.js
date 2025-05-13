"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
    { value: 12, date: "2025-5-6" },
    { value: 25, date: "2025-5-5" },
    { value: 40, date: "2025-5-4" },
    { value: 75, date: "2025-5-3" },
    { value: 20, date: "2025-5-2" },
    { value: 34, date: "2025-5-1" },
    { value: 27, date: "2025-4-30" }
]

export default function ChartAir() {
    return (
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                <CartesianGrid />
                <XAxis dataKey="date"/>
                <YAxis ticks={[20, 40, 60, 80, 100]} domain={[0, 100]} />
                <Tooltip />
                <Line dataKey="value" type="monotone" name="Ketinggian air" />
                </LineChart>
            </ResponsiveContainer>      
    )
}