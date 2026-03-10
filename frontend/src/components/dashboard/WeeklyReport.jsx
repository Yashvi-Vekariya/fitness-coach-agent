import React from 'react';

export default function WeeklyReport({ report = {} }) {
  const items = [
    { label: 'Workouts Done', value: report.workoutsCompleted || 0, icon: '🏋️' },
    { label: 'Total Duration', value: `${report.totalDuration || 0} min`, icon: '⏱️' },
    { label: 'Calories Burned', value: report.totalCaloriesBurned || 0, icon: '🔥' },
    { label: 'Meals Logged', value: report.mealsLogged || 0, icon: '🥗' },
    { label: 'Avg Daily Cal', value: report.avgDailyCalories || 0, icon: '📊' },
    { label: 'Weight Change', value: report.weightChange ? `${report.weightChange}kg` : '--', icon: '⚖️' },
  ];

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="font-display font-bold text-lg mb-4">📋 Weekly Report</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((item, i) => (
          <div key={i} className="bg-dark-900/50 rounded-xl p-3 text-center">
            <div className="text-xl mb-1">{item.icon}</div>
            <div className="font-display font-bold text-lg text-primary-400">{item.value}</div>
            <div className="text-xs text-dark-200/40">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
