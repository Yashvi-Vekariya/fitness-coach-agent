import React from 'react';
import { TrendingUp, Flame, Dumbbell, Trophy } from 'lucide-react';

export default function StatsCards({ stats = {}, report = {}, gamification = {} }) {
  const cards = [
    { label: 'Current Weight', value: `${stats?.user?.weight || '--'} kg`, icon: TrendingUp, color: 'from-blue-500 to-cyan-500', change: report?.weightChange ? `${report.weightChange > 0 ? '+' : ''}${report.weightChange}kg` : null },
    { label: 'Streak', value: `${stats?.user?.streak || 0} days`, icon: Flame, color: 'from-orange-500 to-red-500', extra: '🔥' },
    { label: 'Workouts/Week', value: report?.workoutsCompleted || 0, icon: Dumbbell, color: 'from-primary-500 to-emerald-500' },
    { label: 'Points', value: gamification?.points || 0, icon: Trophy, color: 'from-yellow-500 to-amber-500', extra: gamification?.level?.badge },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((stat, i) => (
        <div key={i} className="glass rounded-2xl p-5 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
              <stat.icon size={20} className="text-white" />
            </div>
            {stat.extra && <span className="text-xl">{stat.extra}</span>}
          </div>
          <div className="font-display font-bold text-2xl">{stat.value}</div>
          <div className="text-xs text-dark-200/40 mt-1">{stat.label}</div>
          {stat.change && (
            <div className={`text-xs mt-1 ${parseFloat(stat.change) <= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stat.change} this week
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
