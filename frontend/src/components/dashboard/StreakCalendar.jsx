import React from 'react';

export default function StreakCalendar({ workoutDays = [], streak = 0 }) {
  const today = new Date();
  const days = [];

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const hasWorkout = workoutDays.some(w => w.date === dateStr);

    days.push({ date, dateStr, hasWorkout, isToday: i === 0 });
  }

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-lg">🔥 Workout Streak</h3>
        <div className="text-2xl font-display font-bold text-primary-400 fire-text">{streak} days</div>
      </div>
      <div className="grid grid-cols-10 gap-1.5">
        {days.map((day, i) => (
          <div
            key={i}
            className={`w-full aspect-square rounded-md transition-all ${
              day.hasWorkout
                ? 'bg-primary-500 shadow-sm shadow-primary-500/30'
                : day.isToday
                ? 'bg-dark-700 border border-primary-500/50'
                : 'bg-dark-800/50'
            }`}
            title={`${day.dateStr}${day.hasWorkout ? ' ✅' : ''}`}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-dark-200/30">
        <span>30 days ago</span>
        <span>Today</span>
      </div>
    </div>
  );
}
