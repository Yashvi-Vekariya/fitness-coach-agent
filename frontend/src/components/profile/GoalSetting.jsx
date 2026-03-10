import React from 'react';

const goals = [
  { id: 'weight_loss', label: 'Weight Loss', icon: '🔥', desc: 'Burn fat and get lean' },
  { id: 'muscle_gain', label: 'Muscle Gain', icon: '💪', desc: 'Build muscle and strength' },
  { id: 'flexibility', label: 'Flexibility', icon: '🧘', desc: 'Improve mobility and balance' },
  { id: 'endurance', label: 'Endurance', icon: '🏃', desc: 'Boost stamina and cardio' },
  { id: 'general_fitness', label: 'General Fitness', icon: '❤️', desc: 'Overall health and wellness' },
];

export default function GoalSetting({ currentGoal, onChange }) {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="font-display font-bold text-lg mb-4">🎯 Your Fitness Goal</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {goals.map(g => (
          <button key={g.id} onClick={() => onChange(g.id)}
            className={`p-4 rounded-xl text-left transition-all ${currentGoal === g.id ? 'bg-primary-600/20 border border-primary-500/30' : 'glass hover:bg-dark-800/80'}`}>
            <div className="text-2xl mb-1">{g.icon}</div>
            <div className="font-display font-bold text-sm">{g.label}</div>
            <div className="text-xs text-dark-200/40">{g.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
