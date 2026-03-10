import React from 'react';

export default function ExerciseCard({ exercise }) {
  const levelColors = { beginner: 'text-green-400', intermediate: 'text-yellow-400', advanced: 'text-red-400' };

  return (
    <div className="glass rounded-xl p-4 hover:border-primary-500/30 transition-all">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-display font-bold text-sm">{exercise.name}</h4>
        <span className={`text-xs ${levelColors[exercise.level] || 'text-gray-400'}`}>{exercise.level}</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        <span className="text-xs px-2 py-0.5 bg-dark-800 rounded-full">{exercise.bodyPart}</span>
        <span className="text-xs px-2 py-0.5 bg-dark-800 rounded-full">{exercise.equipment}</span>
        <span className="text-xs px-2 py-0.5 bg-dark-800 rounded-full">{exercise.type === 'home' ? '🏠' : '🏋️'} {exercise.type}</span>
      </div>
      <p className="text-xs text-dark-200/50 leading-relaxed">{exercise.instructions}</p>
      <div className="mt-2 text-xs text-primary-400">Muscles: {exercise.muscles?.join(', ')}</div>
    </div>
  );
}
