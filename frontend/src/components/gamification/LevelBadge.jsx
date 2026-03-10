import React from 'react';

export default function LevelBadge({ level = { name: 'Beginner', badge: '🌱' }, points = 0, nextLevel, progressToNext = 0 }) {
  return (
    <div className="glass rounded-2xl p-6 text-center">
      <div className="text-5xl mb-2">{level.badge}</div>
      <h3 className="font-display font-bold text-xl">{level.name}</h3>
      <p className="text-sm text-dark-200/40">{points} points</p>
      <div className="w-full bg-dark-800 rounded-full h-3 mt-4 mb-2">
        <div className="bg-gradient-to-r from-primary-500 to-primary-400 h-3 rounded-full transition-all duration-500" style={{ width: `${progressToNext}%` }} />
      </div>
      {nextLevel && <p className="text-xs text-dark-200/40">{nextLevel.pointsNeeded} pts to {nextLevel.badge} {nextLevel.name}</p>}
    </div>
  );
}
