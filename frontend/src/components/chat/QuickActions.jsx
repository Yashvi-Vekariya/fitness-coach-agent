import React from 'react';

const quickActions = [
  { icon: '💪', label: 'Workout Plan', message: 'Give me a personalized workout plan for today' },
  { icon: '🥗', label: 'Meal Plan', message: 'Suggest a healthy meal plan for today' },
  { icon: '📊', label: 'My Progress', message: 'Show me my progress report' },
  { icon: '📏', label: 'Calculate BMI', message: 'Calculate my BMI. My weight is 70kg and height is 170cm' },
  { icon: '🏆', label: 'My Stats', message: 'Show me my points, level, and achievements' },
  { icon: '🔥', label: 'Motivation', message: 'I need some motivation today' },
];

export default function QuickActions({ onAction }) {
  return (
    <div className="px-4 pb-2">
      <div className="flex flex-wrap gap-2 justify-center">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={() => onAction(action.message)}
            className="px-3 py-2 glass rounded-xl text-xs hover:bg-dark-800/80 hover:border-primary-500/30 transition-all flex items-center gap-1.5"
          >
            <span>{action.icon}</span>
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
