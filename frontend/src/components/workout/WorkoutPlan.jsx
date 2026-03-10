import React from 'react';

export default function WorkoutPlan({ plan }) {
  if (!plan) return null;

  const formatPlan = (text) => text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>');

  return (
    <div className="glass rounded-2xl p-6 animate-slide-up">
      <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
        💪 Your Workout Plan
      </h3>
      <div className="text-sm leading-relaxed text-dark-200/80" dangerouslySetInnerHTML={{ __html: formatPlan(plan) }} />
    </div>
  );
}
