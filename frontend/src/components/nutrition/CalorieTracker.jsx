import React from 'react';

export default function CalorieTracker({ target = 2000, consumed = 0, burned = 0 }) {
  const remaining = target - consumed + burned;
  const percentage = Math.min(Math.round((consumed / target) * 100), 100);

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="font-display font-bold text-lg mb-4">🔥 Today's Calories</h3>
      <div className="flex items-center justify-between mb-4">
        <div className="text-center">
          <div className="text-2xl font-display font-bold text-primary-400">{consumed}</div>
          <div className="text-xs text-dark-200/40">Consumed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-display font-bold text-amber-400">{burned}</div>
          <div className="text-xs text-dark-200/40">Burned</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-display font-bold ${remaining > 0 ? 'text-green-400' : 'text-red-400'}`}>{remaining}</div>
          <div className="text-xs text-dark-200/40">Remaining</div>
        </div>
      </div>
      <div className="w-full bg-dark-800 rounded-full h-3">
        <div className={`h-3 rounded-full transition-all duration-500 ${percentage > 90 ? 'bg-red-500' : 'bg-gradient-to-r from-primary-500 to-primary-400'}`} style={{ width: `${percentage}%` }} />
      </div>
      <div className="text-xs text-dark-200/30 mt-2 text-center">Target: {target} cal/day</div>
    </div>
  );
}
