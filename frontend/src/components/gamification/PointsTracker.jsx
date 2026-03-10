import React from 'react';

export default function PointsTracker({ points = 0, recentPoints = [] }) {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="font-display font-bold text-lg mb-2">⭐ Points</h3>
      <div className="text-4xl font-display font-bold gradient-text mb-4">{points}</div>
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-dark-200/40">
          <span>Workout Complete</span><span className="text-primary-400">+10 pts</span>
        </div>
        <div className="flex justify-between text-xs text-dark-200/40">
          <span>Weight Logged</span><span className="text-primary-400">+5 pts</span>
        </div>
        <div className="flex justify-between text-xs text-dark-200/40">
          <span>Meal Logged</span><span className="text-primary-400">+5 pts</span>
        </div>
        <div className="flex justify-between text-xs text-dark-200/40">
          <span>7-Day Streak</span><span className="text-amber-400">+50 pts</span>
        </div>
        <div className="flex justify-between text-xs text-dark-200/40">
          <span>30-Day Streak</span><span className="text-amber-400">+200 pts</span>
        </div>
      </div>
    </div>
  );
}
