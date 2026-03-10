import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b'];

export default function MacroChart({ protein = 30, carbs = 45, fat = 25 }) {
  const data = [
    { name: 'Protein', value: protein },
    { name: 'Carbs', value: carbs },
    { name: 'Fat', value: fat },
  ];

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="font-display font-bold text-lg mb-4">🥗 Macro Split</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={5} dataKey="value">
            {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
          </Pie>
          <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-6 mt-2">
        {data.map((m, i) => (
          <div key={m.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i] }} />
            <span className="text-xs text-dark-200/50">{m.name} {m.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
