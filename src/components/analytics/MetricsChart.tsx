
import React from 'react';
import { CreatorMetrics } from '@/types/sponsorship';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MetricsChartProps {
  data: CreatorMetrics[];
}

export default function MetricsChart({ data }: MetricsChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="updatedAt" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="engagement" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="followers" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
