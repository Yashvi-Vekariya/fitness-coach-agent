import React, { useState } from 'react';

const steps = [
  { title: 'Basic Info', fields: ['name', 'age', 'gender'] },
  { title: 'Body Stats', fields: ['weight', 'height'] },
  { title: 'Goals & Preferences', fields: ['goal', 'fitness_level', 'diet_type', 'workout_type'] },
];

export default function OnboardingFlow({ onComplete }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: '', age: '', gender: 'male', weight: '', height: '', goal: 'general_fitness', fitness_level: 'beginner', diet_type: 'non_vegetarian', workout_type: 'home' });

  const current = steps[step];

  return (
    <div className="glass rounded-2xl p-6 max-w-md mx-auto">
      <div className="flex gap-2 mb-6">
        {steps.map((s, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? 'bg-primary-500' : 'bg-dark-700'}`} />
        ))}
      </div>

      <h3 className="font-display font-bold text-xl mb-4">{current.title}</h3>

      {step === 0 && (
        <div className="space-y-3">
          <input type="text" placeholder="Your name" value={data.name} onChange={e => setData({ ...data, name: e.target.value })}
            className="w-full bg-dark-900/50 border border-dark-700/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-500/50" />
          <input type="number" placeholder="Age" value={data.age} onChange={e => setData({ ...data, age: e.target.value })}
            className="w-full bg-dark-900/50 border border-dark-700/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-500/50" />
          <div className="flex gap-2">
            {['male', 'female', 'other'].map(g => (
              <button key={g} onClick={() => setData({ ...data, gender: g })}
                className={`flex-1 py-2 rounded-xl text-sm capitalize ${data.gender === g ? 'bg-primary-600/20 border border-primary-500/30 text-primary-400' : 'glass'}`}>
                {g}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-3">
          <input type="number" placeholder="Weight (kg)" value={data.weight} onChange={e => setData({ ...data, weight: e.target.value })}
            className="w-full bg-dark-900/50 border border-dark-700/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-500/50" />
          <input type="number" placeholder="Height (cm)" value={data.height} onChange={e => setData({ ...data, height: e.target.value })}
            className="w-full bg-dark-900/50 border border-dark-700/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-500/50" />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          <select value={data.goal} onChange={e => setData({ ...data, goal: e.target.value })}
            className="w-full bg-dark-900/50 border border-dark-700/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-500/50">
            <option value="weight_loss">🔥 Weight Loss</option>
            <option value="muscle_gain">💪 Muscle Gain</option>
            <option value="flexibility">🧘 Flexibility</option>
            <option value="endurance">🏃 Endurance</option>
            <option value="general_fitness">❤️ General Fitness</option>
          </select>
          <select value={data.fitness_level} onChange={e => setData({ ...data, fitness_level: e.target.value })}
            className="w-full bg-dark-900/50 border border-dark-700/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-500/50">
            <option value="beginner">🌱 Beginner</option>
            <option value="intermediate">⚡ Intermediate</option>
            <option value="advanced">🔥 Advanced</option>
          </select>
          <select value={data.diet_type} onChange={e => setData({ ...data, diet_type: e.target.value })}
            className="w-full bg-dark-900/50 border border-dark-700/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-500/50">
            <option value="vegetarian">🥬 Vegetarian</option>
            <option value="non_vegetarian">🍗 Non-Vegetarian</option>
            <option value="vegan">🌱 Vegan</option>
            <option value="eggetarian">🥚 Eggetarian</option>
          </select>
          <div className="flex gap-2">
            {[{ v: 'home', l: '🏠 Home' }, { v: 'gym', l: '🏋️ Gym' }].map(w => (
              <button key={w.v} onClick={() => setData({ ...data, workout_type: w.v })}
                className={`flex-1 py-2 rounded-xl text-sm ${data.workout_type === w.v ? 'bg-primary-600/20 border border-primary-500/30 text-primary-400' : 'glass'}`}>
                {w.l}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2 mt-6">
        {step > 0 && <button onClick={() => setStep(step - 1)} className="flex-1 py-2.5 glass rounded-xl text-sm font-medium">Back</button>}
        <button onClick={() => step < 2 ? setStep(step + 1) : onComplete(data)}
          className="flex-1 py-2.5 bg-primary-600 hover:bg-primary-500 rounded-xl text-sm font-bold transition">
          {step < 2 ? 'Next' : '✅ Complete Setup'}
        </button>
      </div>
    </div>
  );
}
