import React from 'react';

export default function Achievements({ achievements = [], unlockedCount = 0, total = 6 }) {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="font-display font-bold text-lg mb-4">🏆 Achievements ({unlockedCount}/{total})</h3>
      <div className="grid grid-cols-3 gap-3">
        {achievements.map((a, i) => (
          <div key={i} className={`rounded-xl p-3 text-center transition-all ${a.unlocked ? 'bg-primary-500/10 border border-primary-500/30' : 'bg-dark-900/50 opacity-40'}`}>
            <div className="text-2xl mb-1">{a.icon}</div>
            <div className="text-xs font-medium">{a.name}</div>
            <div className="text-[10px] text-dark-200/30 mt-0.5">{a.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
